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
    const token = headersList.get('token');

    if (!token) {
      return NextResponse.json(
        { message: messages.error.notAuthorized },
        { status: 400 }
      );
    }

    try {
      const isTokenValid = jwt.verify(token, "secreto");

      const { data } = isTokenValid;

      const userFind = await User.findById(data.userId);

      if (!userFind) {
        return NextResponse.json(
          { message: messages.error.userNotFound },
          { status: 400 }
        );
      }

      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { message: messages.error.iscorrectPassword },
          { status: 400 }
        );
      }

      const hasheadPassword = await bcrypt.hash(newPassword, 10);

      userFind.password = hasheadPassword;

      await userFind.save();

      return NextResponse.json(
        { message: messages.success.passwordChanged },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: messages.error.tokenNotValid},
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default},
      { status: 400 }
    );
  }
}
