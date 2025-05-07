import { verifyToken } from './jwt';
import { NextRequest } from 'next/server';

export function getUserIdFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token) as { id: string };
    return decoded.id;
  } catch (err) {
    console.error(err)
    return null;
  }
}
