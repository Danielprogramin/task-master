import connectMongoDB from "@/lib/mongo";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { messages } from "@/utils/messages";
import User from "@/models/User";
import jwt from "jsonwebtoken";

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
      "secreto",
      { expiresIn: '1h' }
    );

    const forgetUrl = `https://localhost:3000/change-password?token=${token}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "andresvertel2021@gmail.com",
      subject: "Recuperar contraseña",
      html: `
        <h1>Recuperación de contraseña</h1>
        <p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
        <a href="${forgetUrl}">Cambiar contraseña</a>
        <p>Este enlace expirará en 1 hora.</p>
      `
    });

    return NextResponse.json({ message: messages.success.emailSent }, { status: 200 });

  } catch (error) {
    console.error('Error al enviar correo:', error);
    return NextResponse.json({ message: messages.error.serverError }, { status: 500 });
  }
}
