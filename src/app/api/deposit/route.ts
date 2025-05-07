import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { amount } = await req.json();

  if (amount <= 0) return NextResponse.json({ error: 'Valor inválido' }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });

  const newBalance = user.balance + amount;

  await prisma.user.update({
    where: { id: userId },
    data: { balance: newBalance },
  });

  const operation = await prisma.operation.create({
    data: {
      type: 'DEPOSIT',
      amount,
      userId,
    },
  });

  return NextResponse.json({ message: 'Depósito realizado', operation });
}
