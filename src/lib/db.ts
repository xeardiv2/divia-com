export class Database {
  constructor(private db: D1Database) {}

  async getUserByEmail(email: string) {
    return this.db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
  }

  async getUserById(id: string) {
    return this.db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first();
  }

  async createUser(
    id: string,
    email: string,
    passwordHash: string,
    userType: 'professional' | 'patient',
    fullName: string,
    whatsapp?: string,
    phone?: string,
  ) {
    return this.db
      .prepare(
        `INSERT INTO users (id, email, password_hash, user_type, full_name, whatsapp, phone)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(id, email, passwordHash, userType, fullName, whatsapp || null, phone || null)
      .run();
  }

  async createProfessional(
    id: string,
    userId: string,
    profession: 'medico' | 'enfermero' | 'psicologo',
    matricula: string,
    specialization?: string,
    consultationFee?: number,
  ) {
    return this.db
      .prepare(
        `INSERT INTO professionals (id, user_id, profession, matricula, specialization, consultation_fee)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .bind(id, userId, profession, matricula, specialization || null, consultationFee || 0)
      .run();
  }

  async createPatient(id: string, userId: string) {
    return this.db.prepare('INSERT INTO patients (id, user_id) VALUES (?, ?)').bind(id, userId).run();
  }

  async getProfessionalByMatricula(matricula: string) {
    return this.db
      .prepare(
        `SELECT p.*, u.* FROM professionals p
         JOIN users u ON p.user_id = u.id
         WHERE p.matricula = ?`
      )
      .bind(matricula)
      .first();
  }

  async getWaitingList(professionalId: string) {
    const result = await this.db
      .prepare(
        `SELECT wl.*, c.consultation_type, u.full_name, u.whatsapp
         FROM waiting_list wl
         JOIN consultations c ON wl.consultation_id = c.id
         JOIN patients p ON wl.patient_id = p.id
         JOIN users u ON p.user_id = u.id
         WHERE wl.professional_id = ?
         ORDER BY wl.position ASC`
      )
      .bind(professionalId)
      .all();

    return result.results || [];
  }

  async createConsultation(
    id: string,
    patientId: string,
    professionalId: string,
    consultationType: 'teleconsulta' | 'teleenfermeria' | 'telepsicologia',
  ) {
    return this.db
      .prepare(
        `INSERT INTO consultations (id, patient_id, professional_id, consultation_type, status)
         VALUES (?, ?, ?, ?, 'waiting')`
      )
      .bind(id, patientId, professionalId, consultationType)
      .run();
  }

  async updateProfessionalStatus(professionalId: string, status: 'online' | 'offline' | 'in_consultation') {
    return this.db
      .prepare('UPDATE professionals SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(status, professionalId)
      .run();
  }
}

export function initializeDatabase(db: D1Database): Database {
  return new Database(db);
}
