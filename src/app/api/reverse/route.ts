import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { operationId } = await req.json();

  const operation = await prisma.operation.findUnique({ where: { id: operationId } });

  if (!operation || operation.reversed) {
    return NextResponse.json({ error: 'Operação inválida ou já revertida' }, { status: 400 });
  }

  if (operation.type === 'DEPOSIT') {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { balance: { decrement: operation.amount } },
      }),
      prisma.operation.update({
        where: { id: operationId },
        data: { reversed: true },
      }),
    ]);
  } else if (operation.type === 'TRANSFER') {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { balance: { increment: operation.amount } },
      }),
      prisma.user.update({
        where: { id: operation.toUserId! },
        data: { balance: { decrement: operation.amount } },
      }),
      prisma.operation.update({
        where: { id: operationId },
        data: { reversed: true },
      }),
    ]);
  }

  return NextResponse.json({ message: 'Operação revertida com sucesso' });
}
