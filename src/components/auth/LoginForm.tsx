import type { NextApiRequest, NextApiResponse } from 'next';
import { extractToken, verifyToken } from '@/lib/auth';
import { initializeStreamService } from '@/lib/cloudflare-stream';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const token = extractToken(req.headers.authorization || null);
    const auth = token ? verifyToken(token) : null;

    if (!auth || auth.userType !== 'professional') {
      return res.status(403).json({ success: false, message: 'Solo los profesionales pueden crear la sesión' });
    }

    const { consultationId, description } = req.body;
    if (!consultationId) {
      return res.status(400).json({ success: false, message: 'Se requiere consultationId' });
    }

    const db = (req as any).env?.DB;
    if (!db) {
      return res.status(500).json({ success: false, message: 'D1 no está configurado en este entorno' });
    }

    const streamService = initializeStreamService((req as any).env?.CLOUDFLARE_ACCOUNT_ID, (req as any).env?.CLOUDFLARE_API_TOKEN);
    if (!streamService) {
      return res.status(500).json({ success: false, message: 'Cloudflare Stream no está configurado' });
    }

    const streamId = await streamService.createLiveInput(consultationId, description || 'Teleconsulta');
    if (!streamId) {
      return res.status(500).json({ success: false, message: 'No se pudo crear el stream de videollamada' });
    }

    await db
      .prepare(
        `UPDATE consultations
         SET cloudflare_stream_id = ?, cloudflare_stream_url = ?, status = 'in_progress', updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`
      )
      .bind(streamId, streamService.getStreamEmbedUrl(streamId), consultationId)
      .run();

    return res.status(201).json({
      success: true,
      message: 'Videollamada creada correctamente',
      streamId,
      embedUrl: streamService.getStreamEmbedUrl(streamId),
    });
  } catch (error) {
    console.error('Stream create error:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
}
