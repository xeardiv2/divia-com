import type { NextApiRequest, NextApiResponse } from 'next';
import { generateToken, hashPassword, verifyPassword } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email, password, fullName, userType, whatsapp, phone, profession, matricula, specialization } = req.body;

    if (!email || !password || !fullName || !userType) {
      return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
    }

    if (userType === 'professional' && (!profession || !matricula)) {
      return res.status(400).json({ success: false, message: 'Los profesionales deben completar profesión y matrícula' });
    }

    const db = (req as any).env?.DB;
    if (!db) {
      return res.status(500).json({ success: false, message: 'D1 no está configurado en este entorno' });
    }

    const existing = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
    if (existing) {
      return res.status(409).json({ success: false, message: 'El correo ya está registrado' });
    }

    const passwordHash = await hashPassword(password);
    const userId = `user-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    await db
      .prepare(
        `INSERT INTO users (id, email, password_hash, user_type, full_name, whatsapp, phone)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(userId, email, passwordHash, userType, fullName, whatsapp || null, phone || null)
      .run();

    if (userType === 'professional') {
      const professionalId = `prof-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      await db
        .prepare(
          `INSERT INTO professionals (id, user_id, profession, matricula, specialization, license_verified)
           VALUES (?, ?, ?, ?, ?, 0)`
        )
        .bind(professionalId, userId, profession, matricula, specialization || null)
        .run();
    } else {
      const patientId = `patient-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      await db.prepare('INSERT INTO patients (id, user_id) VALUES (?, ?)').bind(patientId, userId).run();
    }

    const token = generateToken({ userId, email, userType });

    return res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      token,
      user: { id: userId, email, fullName, userType },
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
}
