CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK(user_type IN ('professional', 'patient')),
  full_name TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  avatar_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS professionals (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  profession TEXT NOT NULL CHECK(profession IN ('medico', 'enfermero', 'psicologo')),
  matricula TEXT UNIQUE NOT NULL,
  license_verified BOOLEAN DEFAULT 0,
  specialization TEXT,
  biography TEXT,
  consultation_fee REAL DEFAULT 0,
  is_available BOOLEAN DEFAULT 1,
  status TEXT DEFAULT 'offline' CHECK(status IN ('online', 'offline', 'in_consultation')),
  rating REAL DEFAULT 0,
  total_consultations INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS patients (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  date_of_birth TEXT,
  gender TEXT CHECK(gender IN ('M', 'F', 'O', 'N/A')),
  medical_history TEXT,
  allergies TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS consultations (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  professional_id TEXT NOT NULL,
  consultation_type TEXT NOT NULL CHECK(consultation_type IN ('teleconsulta', 'teleenfermeria', 'telepsicologia')),
  status TEXT DEFAULT 'waiting' CHECK(status IN ('waiting', 'in_progress', 'completed', 'cancelled')),
  scheduled_at DATETIME,
  started_at DATETIME,
  ended_at DATETIME,
  cloudflare_stream_id TEXT,
  cloudflare_stream_url TEXT,
  notes TEXT,
  diagnosis TEXT,
  recommendations TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (professional_id) REFERENCES professionals(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS waiting_list (
  id TEXT PRIMARY KEY,
  consultation_id TEXT NOT NULL UNIQUE,
  patient_id TEXT NOT NULL,
  professional_id TEXT NOT NULL,
  consultation_type TEXT NOT NULL,
  position INTEGER,
  estimated_wait_time INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (consultation_id) REFERENCES consultations(id) ON DELETE CASCADE,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (professional_id) REFERENCES professionals(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vital_signs (
  id TEXT PRIMARY KEY,
  consultation_id TEXT NOT NULL,
  patient_id TEXT NOT NULL,
  temperature REAL,
  blood_pressure TEXT,
  oxygen_saturation REAL,
  heart_rate INTEGER,
  respiratory_rate INTEGER,
  notes TEXT,
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (consultation_id) REFERENCES consultations(id) ON DELETE CASCADE,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS consultation_summaries (
  id TEXT PRIMARY KEY,
  consultation_id TEXT NOT NULL UNIQUE,
  professional_id TEXT NOT NULL,
  patient_present BOOLEAN,
  chief_complaint TEXT,
  assessment TEXT,
  plan TEXT,
  medications TEXT,
  follow_up_date TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (consultation_id) REFERENCES consultations(id) ON DELETE CASCADE,
  FOREIGN KEY (professional_id) REFERENCES professionals(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  professional_id TEXT,
  action TEXT NOT NULL,
  details TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (professional_id) REFERENCES professionals(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_professionals_matricula ON professionals(matricula);
CREATE INDEX IF NOT EXISTS idx_professionals_status ON professionals(status);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
