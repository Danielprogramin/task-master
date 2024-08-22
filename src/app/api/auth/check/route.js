import connectMongoDB from "@/lib/mongo";
import { messages } from "@/utils/messages";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET() {
  try {
    const headersList = headers();
    const token = headersList.get("token");

    if (!token) {
      return NextResponse.json(
        { message: messages.error.notAuthorized },
        { status: 400 }
      );
    }

    try {
      const isTokenValid = jwt.verify(token, "secreto");

      const { data } = isTokenValid;

      await connectMongoDB();
      const userFind = await User.finById(data._id);

      if (!userFind) {
        return NextResponse.json(
          { message: messages.error.userNotFound },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          isAuthorized: true,
          message: messages.error.success.isAuthorized,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        { message: messages.error.tokenNotValid },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default },
      { status: 400 }
    );
  }
}
