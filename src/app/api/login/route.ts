import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { loginSchema } from '@/schemas/authSchema';
import { generateToken } from '@/lib/jwt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.format() }, { status: 400 });
    }

    const { email, password } = validated.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    const token = generateToken({ id: user.id });

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        balance: user.balance,
      },
    });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}
