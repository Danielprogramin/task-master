import { NextResponse } from "next/server";
import { messages } from "@/utils/messages";
import { headers } from "next/headers";
import connectMongoDB from "@/lib/mongo";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectMongoDB();

    const body = await req.json();
    const { newPassword, confirmPassword } = body;

    if (!newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: messages.error.needProps },
        { status: 400 }
      );
    }

    const headersList = headers();
    const token = headersList.get("token");

    if (!token) {
      return NextResponse.json(
        { message: messages.error.notAuthorized },
        { status: 401 } // Cambiado a 401
      );
    }

    try {
      // Verificación del token usando la misma clave secreta que en la generación
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "secreto");

      const userId = decodedToken.id; // Si firmaste el token con { id: user._id }

      const userFind = await User.findById(userId);

      if (!userFind) {
        return NextResponse.json(
          { message: messages.error.userNotFound },
          { status: 404 }
        );
      }

      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { message: messages.error.iscorrectPassword },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      userFind.password = hashedPassword;

      await userFind.save();

      return NextResponse.json(
        { message: messages.success.passwordChanged },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: messages.error.tokenNotValid },
        { status: 401 } // Cambiado a 401
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default },
      { status: 500 }
    );
  }
}
