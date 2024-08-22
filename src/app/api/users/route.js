import connectMongoDB from "@/lib/mongo";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        await connectMongoDB();
        const users = await User.find();

        return NextResponse.json({users} , {status: 200});
    } catch (error) {
        return NextResponse.json(
          { message: messages.error.default },
          { status: 400 }
        );
      }
}