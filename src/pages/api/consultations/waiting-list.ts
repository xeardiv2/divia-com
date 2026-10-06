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

    const db = (req as any).env?.DB;
    const user = db ? await db.prepare('SELECT * FROM users WHERE id = ?').bind(auth.userId).first() : null;

    return res.status(200).json({
      success: true,
      user: user ? {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        userType: user.user_type,
      } : null,
    });
  } catch (error) {
    console.error('Session check error:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
}
