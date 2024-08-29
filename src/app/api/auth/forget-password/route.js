import connectMongoDB from "@/lib/mongo";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { messages } from "@/utils/messages";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import EmailTemplate from "@/components/EmailTemplate";

const resend = new Resend("re_K2UUPjA7_KGGLeNYu2TQaknTDus8TnnLJ");

export async function POST(req) {
  try {
    await connectMongoDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: messages.error.needProps }, { status: 400 });
    }

    const userFind = await User.findOne({ email });

    if (!userFind) {
      return NextResponse.json({ message: messages.error.userNotFound }, { status: 404 });
    }

    const token = jwt.sign(
      { id: userFind._id, email: userFind.email },
      process.env.JWT_SECRET || "secreto", // Usar una variable de entorno
      { expiresIn: '1h' }
    );

    const forgetUrl = `http://localhost:3000/change-password?token=${token}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "andresvertel2021@gmail.com",
      subject: "Recuperar contraseña",
      react: EmailTemplate({ buttonUrl: forgetUrl }),
    });

    return NextResponse.json({ message: messages.success.emailSent }, { status: 200 });

  } catch (error) {
    console.error('Error al enviar correo:', error);
    return NextResponse.json({ message: messages.error.serverError }, { status: 500 });
  }
}
