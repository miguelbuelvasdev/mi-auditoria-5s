import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import AuditForm from './components/AuditForm';
import ResponsibleForm from './components/ResponsibleForm';
import AuditHistoryPage from './pages/AuditHistoryPage';
import { getAudits, createAudit, deleteAudit } from './services/auditService';
import './App.css'; // Aquí van los estilos globales y Tailwind

import Report from './components/Report';

export default function App() {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('auditoria'); // Para saber si estamos en auditoría o en el historial
  const [responsable, setResponsable] = useState(null);
  const [currentAudit, setCurrentAudit] = useState(null); // Para mostrar el reporte generado

  useEffect(() => {
    async function fetchAudits() {
      try {
        const data = await getAudits();
        setAudits(data);
      } catch (err) {
        // TODO: manejar errores específicos más tarde
      } finally {
        setLoading(false);
      }
    }
    fetchAudits();
  }, []);

  const handleGenerateReport = async ({ values, notes }) => {
    // Sacamos el promedio de cada sección del 5S
    const sectionScores = values.map(arr => {
      const sum = arr.reduce((a, b) => a + b, 0);
      return Number((sum / arr.length).toFixed(2));
    });
    try {
      // Promedio general de toda la auditoría
      const average = Number((sectionScores.reduce((a, b) => a + b, 0) / sectionScores.length).toFixed(2));
      const newAudit = await createAudit({ scores: sectionScores, notes, average, responsable });
      setAudits(prev => [newAudit, ...prev]);
      // Mostrar el reporte generado
      setCurrentAudit({ scores: sectionScores, average });
    } catch (err) {
      // TODO: manejar errores específicos más tarde
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAudit(id);
      setAudits(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      // TODO: manejar errores específicos más tarde
    }
  };

  const goToHistory = () => {
    setCurrentAudit(null);
    setPage('historial');
  };

  return (
    <div className="min-h-screen-safe w-full bg-gradient-to-br from-slate-50 via-white to-purple-50/30 relative overflow-x-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-purple-800/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-purple-400/10 rounded-full blur-3xl -translate-y-24 sm:-translate-y-48 translate-x-24 sm:translate-x-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-purple-600/10 rounded-full blur-3xl translate-y-24 sm:translate-y-48 -translate-x-24 sm:-translate-x-48 pointer-events-none" />

      {/* Barra de navegación principal */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4 lg:py-6">
            {/* Logo y título de la app */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm sm:text-lg">5S</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gradient">
                  Auditoría 5S
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">
                  Sistema de Gestión de Calidad
                </p>
              </div>
            </div>

            {/* Botones para cambiar entre secciones */}
            <div className="flex bg-slate-100/80 backdrop-blur-sm p-1 rounded-lg sm:rounded-xl border border-slate-200/60 shadow-sm">
              <button
                onClick={() => setPage('auditoria')}
                className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-md sm:rounded-lg transition-all duration-300 ${
                  page === 'auditoria'
                    ? 'text-purple-700 bg-white shadow-sm border border-purple-200/60 transform scale-[1.02]'
                    : 'text-slate-600 hover:text-purple-700 hover:bg-white/60'
                }`}
              >
                <span className="hidden sm:inline">Nueva Auditoría</span>
                <span className="sm:hidden">Auditoría</span>
              </button>
              <button
                onClick={() => setPage('historial')}
                className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-md sm:rounded-lg transition-all duration-300 ${
                  page === 'historial'
                    ? 'text-purple-700 bg-white shadow-sm border border-purple-200/60 transform scale-[1.02]'
                    : 'text-slate-600 hover:text-purple-700 hover:bg-white/60'
                }`}
              >
                Historial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal de la aplicación */}
      <main className="relative z-10 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Spinner de carga mientras se obtienen los datos */}
          {loading && (
            <div className="center-flex min-h-[50vh] sm:min-h-[400px]">
              <div className="text-center space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
                <p className="text-slate-600 font-medium text-sm sm:text-base">Cargando auditorías...</p>
              </div>
            </div>
          )}

          {/* Vista del reporte generado */}
          {!loading && currentAudit && (
            <div className="space-y-6 sm:space-y-8 lg:space-y-12 animate-fade-in">
              <div className="w-full max-w-4xl mx-auto">
                <Report scores={currentAudit.scores} />
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={goToHistory}
                    className="btn-primary"
                  >
                    Ver Historial Completo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Vista principal de auditoría */}
          {!loading && !currentAudit && page === 'auditoria' && (
            <div className="space-y-6 sm:space-y-8 lg:space-y-12 animate-fade-in">
              {!responsable ? (
                <>
                  <Header />
                  <div className="w-full max-w-4xl mx-auto animate-slide-up">
                    <ResponsibleForm onSubmit={setResponsable} />
                  </div>
                </>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {/* Mostramos la info del responsable actual */}
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                            Responsable de la Auditoría
                          </h3>
                          <p className="text-purple-700 font-medium text-sm sm:text-base truncate">
                            {responsable.nombre}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600 truncate">
                            {responsable.cargo} • {responsable.area}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setResponsable(null)}
                        className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-purple-700 hover:text-purple-800 bg-white hover:bg-purple-50 border border-purple-200 hover:border-purple-300 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
                      >
                        Cambiar Responsable
                      </button>
                    </div>
                  </div>

                  <AuditForm onGenerateReport={handleGenerateReport} />
                </div>
              )}
            </div>
          )}

          {/* Vista del historial de auditorías */}
          {!loading && !currentAudit && page === 'historial' && (
            <div className="animate-fade-in">
              <AuditHistoryPage audits={audits} onDelete={handleDelete} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
