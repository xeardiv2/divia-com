import type { NextApiRequest, NextApiResponse } from 'next';
import { extractToken, verifyToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const token = extractToken(req.headers.authorization || null);
    const auth = token ? verifyToken(token) : null;

    if (!auth || auth.userType !== 'professional') {
      return res.status(403).json({ success: false, message: 'Solo los profesionales pueden acceder a la lista de espera' });
    }

    const db = (req as any).env?.DB;
    if (!db) {
      return res.status(500).json({ success: false, message: 'D1 no está configurado en este entorno' });
    }

    const professional = await db.prepare('SELECT id FROM professionals WHERE user_id = ?').bind(auth.userId).first();
    if (!professional) {
      return res.status(404).json({ success: false, message: 'Perfil profesional no encontrado' });
    }

    const rows = await db
      .prepare(
        `SELECT wl.*, c.consultation_type, u.full_name, u.whatsapp
         FROM waiting_list wl
         JOIN consultations c ON wl.consultation_id = c.id
         JOIN patients p ON wl.patient_id = p.id
         JOIN users u ON p.user_id = u.id
         WHERE wl.professional_id = ?
         ORDER BY wl.position ASC`
      )
      .bind(professional.id)
      .all();

    return res.status(200).json({ success: true, data: rows.results || [] });
  } catch (error) {
    console.error('Waiting list error:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
}
