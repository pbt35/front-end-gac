import { prisma } from '@/lib/prisma';
import { Operation } from '@prisma/client';

export async function getTransactionById(id: string): Promise<Operation | null> {
  return await prisma.operation.findUnique({
    where: { id },
  });
}

export async function reverseTransaction(transaction: Operation) {
  if (transaction.reversed) {
    throw new Error('Transação já foi revertida');
  }

  const sender = await prisma.user.findUnique({ where: { id: transaction.userId } });
  const recipient = transaction.toUserId
    ? await prisma.user.findUnique({ where: { id: transaction.toUserId } })
    : null;

  if (!sender || !recipient) {
    throw new Error('Usuários envolvidos não encontrados');
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: sender.id },
      data: { balance: { increment: transaction.amount } },
    }),
    prisma.user.update({
      where: { id: recipient.id },
      data: { balance: { decrement: transaction.amount } },
    }),
    prisma.operation.update({
      where: { id: transaction.id },
      data: { reversed: true },
    }),
  ]);
}
