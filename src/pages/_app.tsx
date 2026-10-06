'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';

type UserType = 'professional' | 'patient';

type Profession = 'medico' | 'enfermero' | 'psicologo';

export default function RegisterForm() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>('patient');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    whatsapp: '',
    profession: 'medico' as Profession,
    matricula: '',
    specialization: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (form.password !== form.confirmPassword) {
        toast.error('Las contraseñas no coinciden');
        return;
      }

      if (userType === 'professional' && !form.matricula) {
        toast.error('La matrícula es obligatoria para profesionales');
        return;
      }

      const payload: any = {
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        userType,
        phone: form.phone,
        whatsapp: form.whatsapp,
      };

      if (userType === 'professional') {
        payload.profession = form.profession;
        payload.matricula = form.matricula;
        payload.specialization = form.specialization;
      }

      const response = await axios.post('/api/auth/register', payload);

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success('Registro exitoso');

        if (userType === 'professional') {
          router.push('/dashboard/professional');
        } else {
          router.push('/dashboard/patient');
        }
      } else {
        toast.error(response.data.message || 'Error en el registro');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de usuario</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="radio" checked={userType === 'patient'} onChange={() => setUserType('patient')} />
            Paciente
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="radio" checked={userType === 'professional'} onChange={() => setUserType('professional')} />
            Profesional
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar contraseña</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp</label>
          <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" />
        </div>
      </div>

      {userType === 'professional' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Profesión</label>
            <select name="profession" value={form.profession} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none">
              <option value="medico">Médico</option>
              <option value="enfermero">Enfermero</option>
              <option value="psicologo">Psicólogo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Matrícula</label>
            <input name="matricula" value={form.matricula} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="22789" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Especialización</label>
            <input name="specialization" value={form.specialization} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Medicina general / Enfermería / Psicología" />
          </div>
        </div>
      )}

      <button type="submit" disabled={loading} className="w-full rounded-lg bg-cyan-600 px-4 py-2.5 text-white font-semibold hover:bg-cyan-700 transition disabled:opacity-50">
        {loading ? 'Registrando...' : 'Crear cuenta'}
      </button>
    </form>
  );
}
