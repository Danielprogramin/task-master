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
        const { email, password } = body;

        const userFind = await User.findOne({ email });

        // Validar que el usuario exista    
        if (!userFind) {
            return NextResponse.json({ message: messages.error.userNotFound }, { status: 404 });
        }
        // Validar que los campos no estén vacíos
        if (!email || !password) {
            return NextResponse.json({ message: messages.error.needProps }, { status: 400 });
        }
        

        const isCorrect = await bcrypt.compare(password, userFind.password);

        // Validar que la contraseña sea correcta
        if (!isCorrect) {
            return NextResponse.json({ message: messages.error.iscorrectPassword }, { status: 400 });
        }

        // Actualizar la última fecha de inicio de sesión
        userFind.lastLogin = new Date();
        await userFind.save();

        const { password: userPass, ...rest } = userFind.toObject();

        const token = jwt.sign({ id: userFind._id }, "secreto", {
          expiresIn: '1d', // 1 día
        });

        const response = NextResponse.json({
            userLogged: rest,
            message: messages.success.userLogged
          }, {
            status: 200 // Cambié a 200 porque es un login exitoso, no una creación
          });
      
        response.cookies.set("auth_cookie", token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400,
            path: "/",
            httpOnly: true
        });
      
        return response;
    }
    catch (error) {
        console.error('Error en el login:', error);
        return NextResponse.json({ message: messages.error.serverError }, { status: 500 });
    }
}
