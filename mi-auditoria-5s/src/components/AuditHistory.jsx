import React, { useState } from 'react';

const getScoreColor = (score) => {
  if (score >= 4.5) return {
    bg: 'from-green-500 to-green-600',
    text: 'text-green-700',
    border: 'border-green-200',
    bgLight: 'bg-green-50'
  };
  if (score >= 3.5) return {
    bg: 'from-blue-500 to-blue-600',
    text: 'text-blue-700',
    border: 'border-blue-200',
    bgLight: 'bg-blue-50'
  };
  if (score >= 2.5) return {
    bg: 'from-yellow-500 to-yellow-600',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    bgLight: 'bg-yellow-50'
  };
  if (score >= 1.5) return {
    bg: 'from-orange-500 to-orange-600',
    text: 'text-orange-700',
    border: 'border-orange-200',
    bgLight: 'bg-orange-50'
  };
  return {
    bg: 'from-red-500 to-red-600',
    text: 'text-red-700',
    border: 'border-red-200',
    bgLight: 'bg-red-50'
  };
};

const getScoreLabel = (score) => {
  if (score >= 4.5) return 'Excelente';
  if (score >= 3.5) return 'Bueno';
  if (score >= 2.5) return 'Regular';
  if (score >= 1.5) return 'Deficiente';
  return 'Muy Deficiente';
};

export default function AuditHistory({ audits, loading, onDelete }) {
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const [expandedAudit, setExpandedAudit] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar y ordenar auditorías
  const filteredAndSortedAudits = audits
    .filter(audit => {
      // Filtro por búsqueda
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesResponsible = audit.responsable?.nombre?.toLowerCase().includes(searchLower) ||
                                 audit.responsable?.apellido?.toLowerCase().includes(searchLower) ||
                                 audit.responsable?.area?.toLowerCase().includes(searchLower);
        const matchesDate = new Date(audit.createdAt).toLocaleDateString().includes(searchTerm);
        if (!matchesResponsible && !matchesDate) return false;
      }

      // Filtro por calificación
      if (filterBy === 'all') return true;
      if (filterBy === 'excellent') return audit.average >= 4.5;
      if (filterBy === 'good') return audit.average >= 3.5 && audit.average < 4.5;
      if (filterBy === 'regular') return audit.average >= 2.5 && audit.average < 3.5;
      if (filterBy === 'poor') return audit.average < 2.5;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'score') return b.average - a.average;
      if (sortBy === 'responsible') return a.responsable?.nombre?.localeCompare(b.responsable?.nombre || '') || 0;
      return 0;
    });

  const handleDelete = (auditId) => {
    onDelete(auditId);
    setDeleteConfirm(null);
  };

  const sectionNames = ['Seiri', 'Seiton', 'Seiso', 'Seiketsu', 'Shitsuke'];

  return (
    <section className="w-full space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
          Historial de Auditorías
        </h2>
        <p className="text-base sm:text-lg text-slate-600">
          Revisa y analiza todas las auditorías realizadas
        </p>
      </div>

      {/* Estadísticas rápidas */}
      {!loading && audits.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="card text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-700 mb-1">{audits.length}</div>
            <div className="text-xs sm:text-sm text-slate-600">Total Auditorías</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
              {audits.filter(a => a.average >= 4.5).length}
            </div>
            <div className="text-xs sm:text-sm text-slate-600">Excelentes</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
              {audits.length > 0 ? (audits.reduce((acc, audit) => acc + audit.average, 0) / audits.length).toFixed(1) : '0.0'}
            </div>
            <div className="text-xs sm:text-sm text-slate-600">Promedio General</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">
              {audits.filter(a => new Date(a.createdAt) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
            </div>
            <div className="text-xs sm:text-sm text-slate-600">Últimos 30 días</div>
          </div>
        </div>
      )}

      {/* Controles de filtrado, búsqueda y ordenamiento */}
      {!loading && audits.length > 0 && (
        <div className="card w-full">
          <div className="space-y-4 sm:space-y-6">
            {/* Barra de búsqueda */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar por responsable, área o fecha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border border-slate-300 rounded-lg sm:rounded-xl shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filtros y ordenamiento */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {/* Ordenar por */}
                <div className="w-full sm:w-auto">
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Ordenar por:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  >
                    <option value="date">Fecha</option>
                    <option value="score">Puntuación</option>
                    <option value="responsible">Responsable</option>
                  </select>
                </div>

                {/* Filtrar por */}
                <div className="w-full sm:w-auto">
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Filtrar por:</label>
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  >
                    <option value="all">Todas</option>
                    <option value="excellent">Excelentes (4.5+)</option>
                    <option value="good">Buenas (3.5-4.4)</option>
                    <option value="regular">Regulares (2.5-3.4)</option>
                    <option value="poor">Deficientes (&lt;2.5)</option>
                  </select>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-600 w-full sm:w-auto text-left sm:text-right">
                Mostrando {filteredAndSortedAudits.length} de {audits.length} auditorías
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      {loading ? (
        <div className="center-flex min-h-[50vh] sm:min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-600 font-medium text-sm sm:text-base">Cargando historial de auditorías...</p>
          </div>
        </div>
      ) : audits.length === 0 ? (
        <div className="card-premium text-center py-12 sm:py-16 w-full">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">No hay auditorías registradas</h3>
          <p className="text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
            Comienza realizando tu primera auditoría 5S para ver el historial aquí
          </p>
          <button className="btn-primary">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nueva Auditoría
          </button>
        </div>
            ) : filteredAndSortedAudits.length === 0 ? (
        <div className="card text-center py-12 sm:py-16 w-full">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">No se encontraron auditorías</h3>
          <p className="text-slate-600 mb-6 text-sm sm:text-base">
            Intenta ajustar los filtros de búsqueda o crear una nueva auditoría
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterBy('all');
            }}
            className="btn-secondary"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6 w-full">
          {filteredAndSortedAudits.map((audit, index) => {
            const scoreInfo = getScoreColor(audit.average);
            const isExpanded = expandedAudit === audit._id;
            
            return (
              <div 
                key={audit._id} 
                className={`card hover:shadow-xl transition-all duration-300 w-full ${
                  isExpanded ? 'ring-2 ring-purple-500/20 shadow-xl' : ''
                }`}
              >
                {/* Header de la auditoría */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    {/* Número de auditoría */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-white font-bold text-sm sm:text-base">#{audits.length - index}</span>
                    </div>
                    
                    {/* Información básica */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                        <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                          Auditoría 5S
                        </h3>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${scoreInfo.bgLight} ${scoreInfo.text} ${scoreInfo.border} border w-fit`}>
                          {getScoreLabel(audit.average)}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 112 0v1m-2 0h4m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                          <span className="break-words">{new Date(audit.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</span>
                        </div>
                        {audit.responsable && (
                          <div className="flex items-center space-x-1">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="break-words">{audit.responsable.nombre} {audit.responsable.apellido}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Puntuación y acciones */}
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-center">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br ${scoreInfo.bg} shadow-lg`}>
                        <span className="text-white font-bold text-lg sm:text-xl">{audit.average}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Puntuación</div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setExpandedAudit(isExpanded ? null : audit._id)}
                        className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 touch-target"
                        title={isExpanded ? "Contraer detalles" : "Ver detalles"}
                      >
                        <svg 
                          className={`w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <button
                        onClick={() => setDeleteConfirm(audit._id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 touch-target"
                        title="Eliminar auditoría"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Detalles expandibles */}
                <div className={`transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="border-t border-slate-200 pt-4 sm:pt-6 space-y-4 sm:space-y-6">
                    {/* Información del responsable */}
                    {audit.responsable && (
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/60 rounded-xl p-4 sm:p-6">
                        <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2 text-sm sm:text-base">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Responsable de la Auditoría</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                          <div>
                            <span className="text-slate-500">Nombre:</span>
                            <p className="font-medium text-slate-900 break-words">{audit.responsable.nombre} {audit.responsable.apellido}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Cargo:</span>
                            <p className="font-medium text-slate-900 break-words">{audit.responsable.cargo}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Área:</span>
                            <p className="font-medium text-slate-900 break-words">{audit.responsable.area}</p>
                          </div>
                          {audit.responsable.documento && (
                            <div>
                              <span className="text-slate-500">Documento:</span>
                              <p className="font-medium text-slate-900">{audit.responsable.documento}</p>
                            </div>
                          )}
                          {audit.responsable.email && (
                            <div className="sm:col-span-2">
                              <span className="text-slate-500">Email:</span>
                              <p className="font-medium text-slate-900 break-all">{audit.responsable.email}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Puntuaciones por sección */}
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-4 flex items-center space-x-2 text-sm sm:text-base">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span>Puntuaciones por Sección</span>
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                        {audit.scores?.map((score, idx) => {
                          const sectionScoreInfo = getScoreColor(score);
                          return (
                            <div key={idx} className="text-center p-3 sm:p-4 bg-white border border-slate-200 rounded-lg sm:rounded-xl shadow-sm">
                              <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center bg-gradient-to-br ${sectionScoreInfo.bg} mx-auto mb-2 shadow-lg`}>
                                <span className="text-white font-bold text-sm sm:text-base">{['整', '頓', '掃', '潔', '躾'][idx]}</span>
                              </div>
                              <div className="text-base sm:text-lg font-bold text-slate-900">{score}</div>
                              <div className="text-xs text-slate-600">{sectionNames[idx]}</div>
                              <div className={`text-xs font-medium mt-1 ${sectionScoreInfo.text}`}>
                                {getScoreLabel(score)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Notas y observaciones */}
                    {audit.notes && audit.notes.some(sectionNotes => sectionNotes.some(note => note.trim())) && (
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-4 flex items-center space-x-2 text-sm sm:text-base">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Observaciones y Comentarios</span>
                        </h4>
                        <div className="space-y-3 sm:space-y-4">
                          {audit.notes.map((sectionNotes, sectionIdx) => {
                            const hasNotes = sectionNotes.some(note => note.trim());
                            if (!hasNotes) return null;
                            
                            return (
                              <div key={sectionIdx} className="bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                                <h5 className="font-medium text-slate-900 mb-3 flex items-center space-x-2 text-sm sm:text-base">
                                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">{['整', '頓', '掃', '潔', '躾'][sectionIdx]}</span>
                                  </div>
                                  <span>{sectionNames[sectionIdx]}</span>
                                </h5>
                                <div className="space-y-2">
                                  {sectionNotes.map((note, noteIdx) => {
                                    if (!note.trim()) return null;
                                    return (
                                      <div key={noteIdx} className="flex items-start space-x-2">
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-purple-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                                          <span className="text-purple-600 text-xs font-bold">{noteIdx + 1}</span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed break-words">{note}</p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Acciones adicionales */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4 border-t border-slate-200">
                      <button className="btn-secondary text-xs sm:text-sm">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Descargar PDF
                      </button>
                      <button className="btn-secondary text-xs sm:text-sm">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        Compartir
                      </button>
                      <button className="btn-secondary text-xs sm:text-sm">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        Crear Plan de Acción
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full p-4 sm:p-6 animate-scale-in">
            <div className="text-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Confirmar Eliminación</h3>
              <p className="text-slate-600 text-sm sm:text-base">
                ¿Estás seguro de que deseas eliminar esta auditoría? Esta acción no se puede deshacer.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-secondary flex-1 order-2 sm:order-1"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] order-1 sm:order-2"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Estilos adicionales */}
      <style jsx>{`
        /* Touch targets para móviles */
        .touch-target {
          min-width: 44px;
          min-height: 44px;
        }
        
        @media (max-width: 640px) {
          .touch-target {
            min-width: 48px;
            min-height: 48px;
          }
        }
        
        /* Mejoras de scroll */
        .overflow-hidden {
          overflow: hidden;
        }
        
        /* Transiciones suaves */
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Mejoras de accesibilidad */
        @media (prefers-reduced-motion: reduce) {
          .transition-all,
          .animate-spin,
          .animate-fade-in,
          .animate-scale-in {
            transition: none;
            animation: none;
          }
        }
        
        /* Optimizaciones para pantallas pequeñas */
        @media (max-width: 375px) {
          .text-xs {
            font-size: 0.7rem;
          }
          
          .p-3 {
            padding: 0.5rem;
          }
          
          .gap-3 {
            gap: 0.5rem;
          }
        }
        
        /* Mejoras para pantallas grandes */
        @media (min-width: 1920px) {
          .max-w-md {
            max-width: 32rem;
          }
        }
        
        /* Mejoras de contraste */
        @media (prefers-contrast: high) {
          .border-slate-200 {
            border-color: rgb(100 116 139);
          }
          
          .text-slate-600 {
            color: rgb(51 65 85);
          }
        }
      `}</style>
    </section>
  );
}
