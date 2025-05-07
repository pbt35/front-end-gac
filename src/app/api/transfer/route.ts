import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const senderId = getUserIdFromRequest(req);
  if (!senderId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { recipientEmail, amount } = await req.json();

  if (amount <= 0) return NextResponse.json({ error: 'Valor inválido' }, { status: 400 });

  const sender = await prisma.user.findUnique({ where: { id: senderId } });
  const recipient = await prisma.user.findUnique({ where: { email: recipientEmail } });

  if (!sender || !recipient) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
  }

  if (sender.balance < amount) {
    return NextResponse.json({ error: 'Saldo insuficiente' }, { status: 400 });
  }

  const [, operation] = await prisma.$transaction([
    prisma.user.update({
      where: { id: senderId },
      data: { balance: sender.balance - amount },
    }),
    prisma.user.update({
      where: { id: recipient.id },
      data: { balance: recipient.balance + amount },
    }),
    prisma.operation.create({
      data: {
        type: 'TRANSFER',
        amount,
        userId: senderId,
        toUserId: recipient.id,
      },
    }),
  ]);

  return NextResponse.json({ message: 'Transferência concluída', operation });
}
