import { Router } from 'itty-router';

interface Env {
  DB: D1Database;
  SESSIONS: KVNamespace;
  CACHE: KVNamespace;
  STREAM_ACCOUNT_ID: string;
  STREAM_API_TOKEN: string;
}

const router = Router();

// Health check
router.get('/api/health', () => {
  return new Response(JSON.stringify({ status: 'ok' }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

// Consultation endpoints
router.post('/api/consultations/create', async (req: Request, env: Env) => {
  try {
    const body = await req.json();
    const { patient_id, doctor_id, nurse_id, scheduled_at } = body;

    const consultation_id = crypto.randomUUID();
    
    const stmt = env.DB.prepare(
      `INSERT INTO consultations (id, patient_id, doctor_id, nurse_id, scheduled_at, status) 
       VALUES (?, ?, ?, ?, ?, 'scheduled')`
    );
    
    await stmt.bind(consultation_id, patient_id, doctor_id, nurse_id, scheduled_at).run();

    return new Response(JSON.stringify({ id: consultation_id }), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Get consultation details
router.get('/api/consultations/:id', async (req: Request, env: Env) => {
  const { id } = req.params;
  
  const stmt = env.DB.prepare(
    `SELECT * FROM consultations WHERE id = ?`
  );
  
  const result = await stmt.bind(id).first();
  
  if (!result) {
    return new Response(JSON.stringify({ error: 'Consultation not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
});

// Create Cloudflare Stream live input for consultation
router.post('/api/stream/create-live-input', async (req: Request, env: Env) => {
  try {
    const body = await req.json();
    const { consultation_id } = body;

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.STREAM_ACCOUNT_ID}/live_inputs`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.STREAM_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meta: {
            name: `consultation-${consultation_id}`,
          },
          recording: {
            mode: 'automatic',
            timeoutSeconds: 0,
          },
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    return new Response(JSON.stringify(data.result), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Voice recognition and transcription webhook
router.post('/api/speech/transcribe', async (req: Request, env: Env) => {
  try {
    const body = await req.json();
    const { consultation_id, audio_data, voice_id } = body;

    // Here you would integrate with Deepgram, AssemblyAI, or similar
    // For now, we'll create a placeholder

    const stmt = env.DB.prepare(
      `UPDATE consultations SET notes = ? WHERE id = ?`
    );
    
    await stmt.bind(`Transcription processed for voice ${voice_id}`, consultation_id).run();

    return new Response(JSON.stringify({ 
      status: 'transcribed',
      consultation_id 
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Save anamnesis data
router.post('/api/anamnesis/save', async (req: Request, env: Env) => {
  try {
    const body = await req.json();
    const { 
      consultation_id, 
      chief_complaint, 
      symptoms, 
      signs, 
      vital_signs 
    } = body;

    const anamnesis_id = crypto.randomUUID();
    
    const stmt = env.DB.prepare(
      `INSERT INTO anamnesis 
       (id, consultation_id, chief_complaint, symptoms_json, signs_json, vital_signs_json) 
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    
    await stmt.bind(
      anamnesis_id,
      consultation_id,
      chief_complaint,
      JSON.stringify(symptoms),
      JSON.stringify(signs),
      JSON.stringify(vital_signs)
    ).run();

    return new Response(JSON.stringify({ id: anamnesis_id }), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Generate digital prescription
router.post('/api/prescriptions/create', async (req: Request, env: Env) => {
  try {
    const body = await req.json();
    const {
      consultation_id,
      doctor_id,
      patient_id,
      medication_name,
      dosage,
      frequency,
      duration,
      instructions,
    } = body;

    const prescription_id = crypto.randomUUID();
    const qr_code = `QR_${prescription_id}`; // Generate actual QR code
    
    const stmt = env.DB.prepare(
      `INSERT INTO prescriptions 
       (id, consultation_id, doctor_id, patient_id, medication_name, dosage, frequency, duration, instructions, qr_code) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    
    await stmt.bind(
      prescription_id,
      consultation_id,
      doctor_id,
      patient_id,
      medication_name,
      dosage,
      frequency,
      duration,
      instructions,
      qr_code
    ).run();

    return new Response(JSON.stringify({ 
      id: prescription_id,
      qr_code 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// Alert for critical symptoms
router.post('/api/alerts/create', async (req: Request, env: Env) => {
  try {
    const body = await req.json();
    const {
      patient_id,
      consultation_id,
      alert_type,
      severity,
      message,
    } = body;

    const alert_id = crypto.randomUUID();
    
    const stmt = env.DB.prepare(
      `INSERT INTO alerts 
       (id, patient_id, consultation_id, alert_type, severity, message) 
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    
    await stmt.bind(
      alert_id,
      patient_id,
      consultation_id,
      alert_type,
      severity,
      message
    ).run();

    // Trigger notification (WhatsApp, etc.)
    // await sendWhatsAppAlert(patient_id, message);

    return new Response(JSON.stringify({ 
      id: alert_id,
      status: 'created' 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

// 404 handler
router.all('*', () => {
  return new Response(JSON.stringify({ error: 'Not Found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' },
  });
});

export default router;
