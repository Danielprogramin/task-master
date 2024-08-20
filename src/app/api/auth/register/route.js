import connectMongoDB from "@/lib/mongo";
import { NextResponse } from 'next/server';
import { messages } from "@/utils/messages";
import User from "@/models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await connectMongoDB();

    const body = await req.json();
    const { name, email, password, confirmpassword } = body;

    // Validar que los campos no estén vacíos
    if (!name || !email || !password || !confirmpassword) {
      return NextResponse.json({ message: messages.error.missingFields }, { status: 400 });
    }

    // Validar longitud del nombre
    if (name.length < 2 || name.length > 50) {
      return NextResponse.json({ message: "El nombre debe tener entre 2 y 50 caracteres" }, { status: 400 });
    }

    // Validar que el email sea válido
    if (!isValidEmail(email)) {
      return NextResponse.json({ message: messages.error.invalidEmail }, { status: 400 });
    }

    // Validar que las contraseñas coincidan y sean fuertes
    if (password !== confirmpassword) {
      return NextResponse.json({ message: messages.error.invalidPassword }, { status: 400 });
    }
    if (!isStrongPassword(password)) {
      return NextResponse.json({ message: "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales" }, { status: 400 });
    }

    const userFind = await User.findOne({ email });

    if (userFind) {
      return NextResponse.json({ message: messages.error.emailAlreadyRegistered }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      name: sanitize(name),
      email: sanitize(email),
      password: hashedPassword,
    });

    await newUser.save();

    const { password: userPass, ...rest } = newUser._doc;

    const token = jwt.sign({ id: newUser._id }, 'secreto', {
      expiresIn: 86400,
    });

    const response = NextResponse.json({
      user: rest,
      message: messages.success.userCreated
    }, {
      status: 201
    });

    response.cookies.set("auth_cookie", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
      httpOnly: true
    });

    return response;
  } catch (error) {
    console.error('Error registrando usuario:', error);
    if (error.name === 'MongoError') {
      return NextResponse.json({ message: 'Error de base de datos' }, { status: 500 });
    }
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isStrongPassword(password) {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  return re.test(password);
}

function sanitize(input) {
  // Implementa tu lógica de sanitización aquí
  return input.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m]
  });
}
