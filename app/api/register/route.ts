import bcryptjs from "bcryptjs"
import { registerSchema } from "@/app/schema/registerSchema";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const result = registerSchema.safeParse(body);
    if (!result.success) {
        return new NextResponse("Invalid Data", { status: 400 })
    }
    const { name, email, password } = result.data;

    const hashedPassword = await bcryptjs.hash(password, 12);

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (existingUser) return new NextResponse("User already exist", { status: 400 })

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    })

    return NextResponse.json(user);
}