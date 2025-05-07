import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req);

  if (!userId) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const transfers = await prisma.operation.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        type: true,
        amount: true,
        reversed: true,
        createdAt: true,
        toUserId: true,
        toUser: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(transfers);
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
