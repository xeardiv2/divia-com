import type { NextApiRequest, NextApiResponse } from 'next';
import { generateToken, verifyPassword } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email y contraseña requeridos' });
    }

    const db = (req as any).env?.DB;
    if (!db) {
      return res.status(500).json({ success: false, message: 'D1 no está configurado en este entorno' });
    }

    const user = await db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const token = generateToken({ userId: user.id, email: user.email, userType: user.user_type });

    return res.status(200).json({
      success: true,
      message: 'Login correcto',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        userType: user.user_type,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
}
