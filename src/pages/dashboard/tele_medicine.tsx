'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Prescription {
  id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  instructions: string;
  qr_code: string;
}

export default function DoctorDashboard() {
  const [patients, setPatients] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('consultations');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [prescriptionForm, setPrescriptionForm] = useState({
    medication_name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
  });
  const [loading, setLoading] = useState(true);
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/patients', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setPatients(await response.json());
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignatureStart = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!signatureCanvasRef.current) return;
    setIsDrawing(true);
    const rect = signatureCanvasRef.current.getBoundingClientRect();
    const ctx = signatureCanvasRef.current.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const handleSignatureMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !signatureCanvasRef.current) return;
    const rect = signatureCanvasRef.current.getBoundingClientRect();
    const ctx = signatureCanvasRef.current.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 2;
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    }
  };

  const handleSignatureEnd = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    if (signatureCanvasRef.current) {
      const ctx = signatureCanvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, signatureCanvasRef.current.width, signatureCanvasRef.current.height);
      }
    }
  };

  const handleCreatePrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/prescriptions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          consultation_id: 'consult-001', // Should come from context
          doctor_id: 'user-002',
          patient_id: selectedPatient.dni,
          ...prescriptionForm,
          digital_signature_blob: signatureCanvasRef.current?.toDataURL()
        })
      });

      if (response.ok) {
        alert('Prescripción creada exitosamente');
        setPrescriptionForm({
          medication_name: '',
          dosage: '',
          frequency: '',
          duration: '',
          instructions: '',
        });
        clearSignature();
      }
    } catch (error) {
      console.error('Error creating prescription:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-emerald-900">Médico - DIVIA</h1>
            <p className="text-gray-600 mt-2">Panel de Consultas y Prescripciones Electrónicas</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Cerrar Sesión
          </motion.button>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto mb-6 flex gap-4 flex-wrap">
        {[
          { id: 'consultations', label: '📋 Consultas', icon: '👨‍⚕️' },
          { id: 'prescriptions', label: '💊 Prescripciones', icon: '📝' },
          { id: 'certificates', label: '📜 Certificados', icon: '✅' }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.icon} {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="inline-block text-4xl"
            >
              ⏳
            </motion.div>
            <p className="text-gray-600 mt-4">Cargando datos...</p>
          </div>
        ) : (
          <>
            {/* Prescriptions Tab */}
            {activeTab === 'prescriptions' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Prescription Form */}
                <div className="lg:col-span-2">
                  <motion.div
                    className="bg-white rounded-xl shadow-lg p-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Nueva Prescripción Electrónica</h2>

                    <form onSubmit={handleCreatePrescription} className="space-y-6">
                      {/* Patient Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Paciente</label>
                        <select
                          value={selectedPatient?.dni || ''}
                          onChange={(e) => {
                            const patient = patients.find(p => p.dni === e.target.value);
                            setSelectedPatient(patient);
                          }}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                          required
                        >
                          <option value="">Seleccionar paciente...</option>
                          {patients.map(p => (
                            <option key={p.dni} value={p.dni}>
                              {p.full_name} (DNI: {p.dni})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Medication Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Medicamento</label>
                          <input
                            type="text"
                            value={prescriptionForm.medication_name}
                            onChange={(e) => setPrescriptionForm({ ...prescriptionForm, medication_name: e.target.value })}
                            placeholder="Nombre del medicamento"
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Dosis</label>
                          <input
                            type="text"
                            value={prescriptionForm.dosage}
                            onChange={(e) => setPrescriptionForm({ ...prescriptionForm, dosage: e.target.value })}
                            placeholder="Ej: 500mg"
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Frecuencia</label>
                          <input
                            type="text"
                            value={prescriptionForm.frequency}
                            onChange={(e) => setPrescriptionForm({ ...prescriptionForm, frequency: e.target.value })}
                            placeholder="Ej: 3 veces al día"
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Duración</label>
                          <input
                            type="text"
                            value={prescriptionForm.duration}
                            onChange={(e) => setPrescriptionForm({ ...prescriptionForm, duration: e.target.value })}
                            placeholder="Ej: 10 días"
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Instrucciones</label>
                        <textarea
                          value={prescriptionForm.instructions}
                          onChange={(e) => setPrescriptionForm({ ...prescriptionForm, instructions: e.target.value })}
                          placeholder="Indicaciones especiales..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                          required
                        />
                      </div>

                      {/* Digital Signature */}
                      <div className="border-2 border-gray-200 rounded-lg p-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Firma Digital (Médico)</label>
                        <canvas
                          ref={signatureCanvasRef}
                          width={400}
                          height={150}
                          onMouseDown={handleSignatureStart}
                          onMouseMove={handleSignatureMove}
                          onMouseUp={handleSignatureEnd}
                          onMouseLeave={handleSignatureEnd}
                          className="border-2 border-dashed border-gray-300 rounded bg-white cursor-crosshair w-full"
                        />
                        <div className="flex gap-2 mt-3">
                          <button
                            type="button"
                            onClick={clearSignature}
                            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition font-semibold"
                          >
                            Limpiar
                          </button>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition"
                      >
                        ✅ Generar Prescripción Electrónica
                      </motion.button>
                    </form>
                  </motion.div>
                </div>

                {/* Patient Info Sidebar */}
                {selectedPatient && (
                  <motion.div
                    className="bg-white rounded-xl shadow-lg p-6"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Información del Paciente</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-gray-600">Nombre</p>
                        <p className="font-semibold text-gray-900">{selectedPatient.full_name}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">DNI</p>
                        <p className="font-semibold text-gray-900">{selectedPatient.dni}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Obra Social</p>
                        <p className="font-semibold text-gray-900">{selectedPatient.obra_social}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Teléfono</p>
                        <p className="font-semibold text-gray-900">{selectedPatient.phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Alergias</p>
                        <p className="font-semibold text-red-600">{selectedPatient.allergies || 'Ninguna registrada'}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
