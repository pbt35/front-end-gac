import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req);

  if (!userId) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        balance: true,
        _count: {
          select: {
            operations: true, 
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      id: userId,
      name: user.name,
      email: user.email,
      balance: user.balance,
      transferCount: user._count.operations,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
