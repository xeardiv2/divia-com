import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="flex items-center justify-between py-4">
          <div className="text-2xl font-bold text-cyan-400">DIVIA</div>
          <nav className="flex gap-4 text-sm text-slate-300">
            <Link href="/login" className="hover:text-white">Ingresar</Link>
            <Link href="/login" className="rounded-full border border-cyan-500 px-4 py-2 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950">Registrarse</Link>
          </nav>
        </header>

        <section className="grid gap-10 pt-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
              Telemedicina moderna • D1 • Stream live
            </p>
            <h1 className="text-5xl font-black leading-tight tracking-tight">
              Consultas seguras para <span className="text-cyan-400">médicos, enfermeros y psicólogos</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Sistema para atención profesional, lista de espera, videollamada en vivo y registro de signos vitales con una experiencia simple y clara.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/login" className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400">
                Iniciar sesión
              </Link>
              <Link href="/login" className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white hover:border-cyan-400 hover:text-cyan-300">
                Soy profesional
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6 shadow-2xl ring-1 ring-slate-800">
            <div className="grid gap-4">
              <div className="rounded-2xl bg-slate-800 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Disponible</div>
                <div className="mt-3 text-2xl font-bold text-emerald-400">24 profesionales activos</div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-800 p-4">
                  <div className="text-sm text-slate-400">Lista de espera</div>
                  <div className="mt-2 text-3xl font-bold text-cyan-400">12</div>
                </div>
                <div className="rounded-2xl bg-slate-800 p-4">
                  <div className="text-sm text-slate-400">Videollamadas</div>
                  <div className="mt-2 text-3xl font-bold text-fuchsia-400">Live</div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Teleenfermería</span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-emerald-300">Activo</span>
                </div>
                <div className="mt-3 text-sm text-slate-400">Soporte para historial clínico, signos vitales y seguimiento.</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
