import type { NextApiRequest, NextApiResponse } from 'next';
import { extractToken, verifyToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const token = extractToken(req.headers.authorization || null);
    const auth = token ? verifyToken(token) : null;

    if (!auth || auth.userType !== 'patient') {
      return res.status(403).json({ success: false, message: 'Solo los pacientes pueden registrar signos vitales' });
    }

    const { consultationId, temperature, bloodPressure, oxygenSaturation, heartRate, respiratoryRate } = req.body;

    if (!consultationId) {
      return res.status(400).json({ success: false, message: 'Se requiere consultationId' });
    }

    const db = (req as any).env?.DB;
    if (!db) {
      return res.status(500).json({ success: false, message: 'D1 no está configurado en este entorno' });
    }

    const patient = await db.prepare('SELECT id FROM patients WHERE user_id = ?').bind(auth.userId).first();
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Paciente no encontrado' });
    }

    const vitalId = `vs-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    await db
      .prepare(
        `INSERT INTO vital_signs (id, consultation_id, patient_id, temperature, blood_pressure, oxygen_saturation, heart_rate, respiratory_rate)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        vitalId,
        consultationId,
        patient.id,
        temperature || null,
        bloodPressure || null,
        oxygenSaturation || null,
        heartRate || null,
        respiratoryRate || null,
      )
      .run();

    return res.status(201).json({ success: true, message: 'Signos vitales registrados', vitalId });
  } catch (error) {
    console.error('Vital signs error:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
}
