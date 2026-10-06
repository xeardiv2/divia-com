import Head from 'next/head';

const services = [
  {
    title: 'Telemedicina',
    text: 'Atención rápida con profesionales matriculados, seguimiento clínico y turnos virtuales para consultas simples y continuidad de cuidado.',
    badge: 'Turnos',
  },
  {
    title: 'Internación domiciliaria',
    text: 'Gestión de órdenes, visitas programadas, seguimiento médico y apoyo en domicilio con coordinación clara y horarios pactados.',
    badge: 'Domicilio',
  },
  {
    title: 'Chat Divia4',
    text: 'Asistente clínico-guía que organiza tu consulta, orienta sobre dudas, coordina con profesionales y resguarda la información.',
    badge: 'IA + equipo',
  },
];

const guarantees = [
  'Certificados digitales con validación y trazabilidad.',
  'Protección y confidencialidad de la información clínica.',
  'Coordinación con profesionales, enfermería y gestión de estudios.',
  'Seguimiento organizado de visitas, horarios y tratamientos.',
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>DIVIA | Cuidado humano y digital</title>
        <meta
          name="description"
          content="DIVIA conecta pacientes con telemedicina, chat clínico, seguimiento domiciliario y gestión de certificados."
        />
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-cyan-500/20">
                D
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">DIVIA</p>
                <h1 className="text-lg font-semibold text-white">Hospital Evelyn</h1>
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
              <a href="#servicios" className="transition hover:text-white">
                Servicios
              </a>
              <a href="#garantia" className="transition hover:text-white">
                Garantía
              </a>
              <a href="#chat" className="transition hover:text-white">
                Divia4
              </a>
            </nav>

            <button
              type="button"
              className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/20"
            >
              Ingreso profesionales
            </button>
          </header>

          <main className="mt-10 grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <section className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-200">
                cuidado integral y humanizado
              </div>

              <div className="space-y-5">
                <h2 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                  Atención médica con acompañamiento real, claro y humano.
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  Coordinamos telemedicina, consultas, internación domiciliaria, seguimiento clínico y asistencia con
                  profesionales de confianza, todo en una sola experiencia digital y segura.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02]"
                >
                  Solicitar turno para telemedicina
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Internación domiciliaria
                </button>
              </div>

              <div className="grid gap-4 pt-4 sm:grid-cols-3">
                {['Consulta con profesional', 'Seguimiento y gestión', 'Protección sanitaria'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <aside className="rounded-[30px] border border-white/10 bg-gradient-to-b from-white to-slate-100 p-5 text-slate-900 shadow-2xl shadow-cyan-950/40">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Acceso</p>
                  <h3 className="text-2xl font-bold text-slate-900">Ingreso profesionales</h3>
                </div>
                <div className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  verificado
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu.email@dominio.com"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Ingresar
                </button>
              </form>

              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  className="w-full rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-100"
                >
                  Solicitar turno para telemedicina
                </button>
                <button
                  type="button"
                  className="w-full rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-800 transition hover:bg-indigo-100"
                >
                  Gestionar internación domiciliaria
                </button>
              </div>
            </aside>
          </main>

          <section id="servicios" className="mt-14 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-950/20"
              >
                <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  {service.badge}
                </span>
                <h3 className="mt-5 text-2xl font-bold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{service.text}</p>
              </article>
            ))}
          </section>

          <section id="chat" className="mt-14 rounded-[30px] border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">Divia4</p>
                <h3 className="mt-3 text-3xl font-black text-white">Asistente clínico para organizar tu cuidado</h3>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-200 shadow-2xl">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 font-bold text-slate-950">
                    D4
                  </div>
                  <div>
                    <p className="font-semibold text-white">Divia4</p>
                    <p className="text-xs text-slate-400">Guía clínica y coordinadora</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/5 p-3 text-slate-200">
                    Puedo ayudarte a organizar tu consulta, dudas de tratamiento, seguimiento y contacto con profesionales.
                  </div>
                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-cyan-500 p-3 font-medium text-slate-950">
                    Quiero saber si corresponde telemedicina o una visita domiciliaria.
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/5 p-3 text-slate-200">
                    Revisamos el caso, coordino la prioridad y te indico la mejor opción de atención.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="garantia" className="mt-14 rounded-[30px] border border-white/10 bg-slate-900/80 p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">Garantía y seguridad</p>
                <h3 className="mt-3 text-3xl font-black text-white">Documentación segura, seguimiento claro y cuidado responsable.</h3>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2">
                {guarantees.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-200">
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
