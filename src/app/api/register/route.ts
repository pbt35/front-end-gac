import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { registerSchema } from '@/schemas/authSchema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.format() }, { status: 400 });
    }

    const { name, email, password } = validated.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email já cadastrado' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

     await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
