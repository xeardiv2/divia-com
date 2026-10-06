export default function ProfessionalDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-cyan-600">Panel profesional</div>
            <h1 className="mt-2 text-3xl font-black text-slate-900">DIVIA Profesional</h1>
          </div>
          <button className="rounded-xl bg-cyan-600 px-4 py-2 text-white font-semibold">Disponible</button>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="text-sm text-slate-500">Consultas activas</div>
            <div className="mt-3 text-4xl font-black text-slate-900">08</div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="text-sm text-slate-500">Lista de espera</div>
            <div className="mt-3 text-4xl font-black text-slate-900">12</div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="text-sm text-slate-500">Videollamadas</div>
            <div className="mt-3 text-4xl font-black text-slate-900">Live</div>
          </div>
        </div>
      </div>
    </main>
  );
}
