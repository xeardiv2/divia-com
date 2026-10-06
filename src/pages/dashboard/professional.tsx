import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

export default function LoginPage() {
  const [view, setView] = useState<'login' | 'register'>('login');

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 p-10 text-white">
            <div className="text-3xl font-black">DIVIA</div>
            <h1 className="mt-8 text-4xl font-black leading-tight">Tu plataforma de atención profesional</h1>
            <p className="mt-5 text-cyan-50/90">
              Acceso seguro para pacientes y profesionales con integraciones de D1 y video en vivo.
            </p>

            <div className="mt-10 space-y-4 text-sm text-cyan-50/90">
              <div>• Médicos, enfermeros y psicólogos</div>
              <div>• Matrículas profesionales</div>
              <div>• Lista de espera y teleconsulta</div>
              <div>• Signos vitales y seguimiento</div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-8 flex rounded-full bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setView('login')}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${view === 'login' ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                onClick={() => setView('register')}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${view === 'register' ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}
              >
                Registrarse
              </button>
            </div>

            {view === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </main>
  );
}
