import type { NextApiRequest, NextApiResponse } from 'next';
import { extractToken, verifyToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const token = extractToken(req.headers.authorization || null);
    if (!token) {
      return res.status(401).json({ success: false, message: 'No autorizado' });
    }

    const auth = verifyToken(token);
    if (!auth) {
      return res.status(401).json({ success: false, message: 'Token inválido' });
    }

    return res.status(200).json({ success: true, user: auth });
  } catch (error) {
    console.error('Auth session error:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
}
