import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

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

const professionalTabs = [
  { id: 'espera', label: 'Lista de espera' },
  { id: 'preentrenamiento', label: 'Auditoría de IA' },
  { id: 'biblioteca', label: 'Biblioteca académica' },
] as const;

export default function HomePage() {
  const [professionalTab, setProfessionalTab] = useState<(typeof professionalTabs)[number]['id']>('espera');

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
              <a href="#profesionales" className="transition hover:text-white">
                Profesionales
              </a>
              <a href="#pacientes" className="transition hover:text-white">
                Pacientes
              </a>
              <a href="#garantia" className="transition hover:text-white">
                Garantía
              </a>
              <a href="#chat" className="transition hover:text-white">
                Divia4
              </a>
            </nav>

            <Link
              href="/login"
              className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/20"
            >
              Ingreso profesionales
            </Link>
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
                <Link
                  href="/login"
                  className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02]"
                >
                  Ingresar o registrarme
                </Link>
                <a
                  href="#pacientes"
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Ver atención para pacientes
                </a>
              </div>

              <div className="grid gap-4 pt-4 sm:grid-cols-3">
                {['Consulta con profesional', 'Seguimiento y gestión', 'Protección sanitaria'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <aside id="acceso" className="rounded-[30px] border border-white/10 bg-gradient-to-b from-white to-slate-100 p-5 text-slate-900 shadow-2xl shadow-cyan-950/40">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Acceso</p>
                  <h3 className="text-2xl font-bold text-slate-900">Acceso unificado</h3>
                </div>
                <div className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  seguro
                </div>
              </div>

              <p className="text-sm leading-6 text-slate-600">
                Ingresá a tu cuenta o creá una nueva para continuar con una atención segura.
              </p>
              <div className="mt-5 space-y-3">
                <Link
                  href="/login"
                  className="block w-full rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/login"
                  className="block w-full rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-center text-sm font-semibold text-cyan-800 transition hover:bg-cyan-100"
                >
                  Crear una cuenta
                </Link>
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

          <section id="profesionales" className="mt-14 scroll-mt-8 rounded-[30px] border border-white/10 bg-white p-6 text-slate-900 shadow-2xl shadow-slate-950/20 sm:p-8">
            <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700">Vista previa profesional</p>
                <h3 className="mt-3 text-3xl font-black text-slate-900">Un espacio de trabajo para cada consulta</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Revisá la lista de espera, la sala de teleconsulta y las herramientas de apoyo desde un mismo panel.
                </p>
              </div>
              <Link
                href="/login"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-cyan-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800"
              >
                Acceder al panel
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Secciones del panel profesional">
              {professionalTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={professionalTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setProfessionalTab(tab.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    professionalTab === tab.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {professionalTab === 'espera' && (
              <div id="panel-espera" role="tabpanel" aria-labelledby="tab-espera" className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h4 className="font-bold text-slate-900">Pacientes en espera</h4>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-cyan-100 bg-cyan-50 p-4">
                      <div>
                        <p className="text-sm font-semibold text-cyan-950">Telemedicina online</p>
                        <p className="mt-1 text-xs text-slate-600">Consulta virtual · En espera</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-cyan-800">01</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
                      <div>
                        <p className="text-sm font-semibold text-amber-950">Atención presencial</p>
                        <p className="mt-1 text-xs text-slate-600">Derivación local · SAMCo</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-800">02</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h4 className="font-bold text-slate-900">Sala de teleconsulta e historia clínica</h4>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Vista previa</span>
                  </div>
                  <div className="mt-4 flex min-h-36 items-center justify-center rounded-xl bg-slate-950 p-6 text-center text-sm text-slate-300">
                    La sala de videollamada aparecerá aquí al iniciar una consulta.
                  </div>
                  <div className="mt-4 rounded-xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-800">Historia clínica</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Espacio para registrar anamnesis, diagnóstico y plan de seguimiento durante la consulta.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {professionalTab === 'preentrenamiento' && (
              <div id="panel-preentrenamiento" role="tabpanel" aria-labelledby="tab-preentrenamiento" className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Revisión profesional</p>
                <h4 className="mt-2 text-xl font-bold text-slate-900">Auditoría y mejora de herramientas de IA</h4>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                  Un espacio de revisión para analizar conversaciones y proponer correcciones terminológicas antes de aplicarlas.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold text-slate-800">Término detectado</p>
                    <p className="mt-2 text-sm text-slate-500">Los ejemplos y cambios requieren revisión profesional.</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold text-slate-800">Corrección sugerida</p>
                    <p className="mt-2 text-sm text-slate-500">Las sugerencias no se aplican automáticamente.</p>
                  </div>
                </div>
              </div>
            )}

            {professionalTab === 'biblioteca' && (
              <div id="panel-biblioteca" role="tabpanel" aria-labelledby="tab-biblioteca" className="mt-5">
                <h4 className="font-bold text-slate-900">Biblioteca académica</h4>
                <p className="mt-2 text-sm text-slate-600">Material de referencia organizado por área profesional.</p>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {[
                    ['Medicina', 'Carrera, especialidades y residencias'],
                    ['Enfermería y kinesiología', 'Grado y tecnicaturas'],
                    ['Psicología', 'Apoyo y salud mental'],
                  ].map(([title, description]) => (
                    <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <h5 className="font-semibold text-slate-900">{title}</h5>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section id="pacientes" className="mt-14 scroll-mt-8 rounded-[30px] border border-white/10 bg-gradient-to-br from-cyan-950 via-slate-900 to-indigo-950 p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Vista previa para pacientes</p>
                <h3 className="mt-3 text-3xl font-black text-white">Acompañamiento también mientras esperás</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Consultá el estado de tu atención y prepará tus preguntas para el equipo profesional.
                </p>
                <Link
                  href="/login"
                  className="mt-6 inline-flex rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Ingresar como paciente
                </Link>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white p-5 text-slate-900 shadow-2xl">
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Sala de espera virtual</p>
                    <h4 className="mt-1 font-bold text-slate-900">Tu atención</h4>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    En espera
                  </span>
                </div>
                <div className="mt-4 rounded-2xl bg-cyan-50 p-4">
                  <p className="font-semibold text-cyan-950">Estamos preparando tu consulta</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Un profesional te atenderá cuando sea tu turno. Si necesitás ayuda, contactá al equipo de atención.
                  </p>
                </div>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">D4</div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Divia4</p>
                      <p className="text-xs text-slate-500">Orientación inicial</p>
                    </div>
                  </div>
                  <p className="mt-3 rounded-xl bg-white p-3 text-sm leading-6 text-slate-600">
                    Hola. Podés preparar tus dudas para conversar con el profesional durante la consulta.
                  </p>
                  <p className="mt-3 text-xs text-slate-500">
                    Esta vista previa no envía mensajes ni reemplaza la orientación de un profesional.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
