import React, { useState, useMemo } from 'react';
import AuditHistory from '../components/AuditHistory';
import { Radar, Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js';

Chart.register(
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend, 
  BarElement, 
  CategoryScale, 
  LinearScale,
  ArcElement
);

export default function AuditHistoryPage({ audits, onDelete }) {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedChart, setSelectedChart] = useState('radar');

  // Filtrar auditorías por período
  const filteredAudits = useMemo(() => {
    if (!audits || audits.length === 0) return [];
    
    const now = new Date();
    const filterDate = new Date();
    
    switch (selectedPeriod) {
      case '7days':
        filterDate.setDate(now.getDate() - 7);
        break;
      case '30days':
        filterDate.setDate(now.getDate() - 30);
        break;
      case '90days':
        filterDate.setDate(now.getDate() - 90);
        break;
      case '1year':
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return audits;
    }
    
    return audits.filter(audit => new Date(audit.createdAt) >= filterDate);
  }, [audits, selectedPeriod]);

  // Datos calculados
  const stats = useMemo(() => {
    if (!filteredAudits || filteredAudits.length === 0) {
      return {
        labels: ['Seiri', 'Seiton', 'Seiso', 'Seiketsu', 'Shitsuke'],
        avgScores: [0, 0, 0, 0, 0],
        generalAvg: 0,
        totalAudits: 0,
        excellentAudits: 0,
        improvementTrend: 0,
        lastAuditScore: 0
      };
    }

    const labels = ['Seiri', 'Seiton', 'Seiso', 'Seiketsu', 'Shitsuke'];
    const avgScores = labels.map((_, i) => {
      return Number((filteredAudits.reduce((acc, a) => acc + (a.scores?.[i] || 0), 0) / filteredAudits.length).toFixed(2));
    });
    
    const generalAvg = Number((filteredAudits.reduce((acc, a) => acc + (a.average || 0), 0) / filteredAudits.length).toFixed(2));
    const excellentAudits = filteredAudits.filter(a => a.average >= 4.5).length;
    
    // Calcular tendencia de mejora
    const sortedAudits = [...filteredAudits].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const firstHalf = sortedAudits.slice(0, Math.floor(sortedAudits.length / 2));
    const secondHalf = sortedAudits.slice(Math.floor(sortedAudits.length / 2));
    
    const firstHalfAvg = firstHalf.length > 0 ? firstHalf.reduce((acc, a) => acc + a.average, 0) / firstHalf.length : 0;
    const secondHalfAvg = secondHalf.length > 0 ? secondHalf.reduce((acc, a) => acc + a.average, 0) / secondHalf.length : 0;
    const improvementTrend = Number((secondHalfAvg - firstHalfAvg).toFixed(2));

    return {
      labels,
      avgScores,
      generalAvg,
      totalAudits: filteredAudits.length,
      excellentAudits,
      improvementTrend,
      lastAuditScore: sortedAudits[sortedAudits.length - 1]?.average || 0
    };
  }, [filteredAudits]);

  // Configuración de gráficos
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'Inter'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f8fafc',
        bodyColor: '#f8fafc',
        borderColor: '#7c3aed',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12
      }
    }
  };

  const radarData = {
    labels: stats.labels,
    datasets: [{
      label: 'Promedio por Sección',
      data: stats.avgScores,
      backgroundColor: 'rgba(124, 58, 237, 0.1)',
      borderColor: 'rgba(124, 58, 237, 1)',
      borderWidth: 3,
      pointBackgroundColor: 'rgba(124, 58, 237, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      fill: true
    }]
  };

  const barData = {
    labels: filteredAudits.map(a => new Date(a.createdAt).toLocaleDateString('es-ES', { 
      month: 'short', 
      day: 'numeric' 
    })),
    datasets: [{
      label: 'Puntuación General',
      data: filteredAudits.map(a => a.average),
      backgroundColor: filteredAudits.map(a => {
        if (a.average >= 4.5) return 'rgba(34, 197, 94, 0.8)';
        if (a.average >= 3.5) return 'rgba(59, 130, 246, 0.8)';
        if (a.average >= 2.5) return 'rgba(245, 158, 11, 0.8)';
        return 'rgba(239, 68, 68, 0.8)';
      }),
      borderColor: filteredAudits.map(a => {
        if (a.average >= 4.5) return 'rgba(34, 197, 94, 1)';
        if (a.average >= 3.5) return 'rgba(59, 130, 246, 1)';
        if (a.average >= 2.5) return 'rgba(245, 158, 11, 1)';
        return 'rgba(239, 68, 68, 1)';
      }),
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false
    }]
  };

  const lineData = {
    labels: filteredAudits.map(a => new Date(a.createdAt).toLocaleDateString('es-ES', { 
      month: 'short', 
      day: 'numeric' 
    })),
    datasets: [{
      label: 'Tendencia General',
      data: filteredAudits.map(a => a.average),
      borderColor: 'rgba(124, 58, 237, 1)',
      backgroundColor: 'rgba(124, 58, 237, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgba(124, 58, 237, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8
    }]
  };

  const doughnutData = {
    labels: ['Excelente (4.5+)', 'Bueno (3.5-4.4)', 'Regular (2.5-3.4)', 'Deficiente (<2.5)'],
    datasets: [{
      data: [
        filteredAudits.filter(a => a.average >= 4.5).length,
        filteredAudits.filter(a => a.average >= 3.5 && a.average < 4.5).length,
        filteredAudits.filter(a => a.average >= 2.5 && a.average < 3.5).length,
        filteredAudits.filter(a => a.average < 2.5).length
      ],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(239, 68, 68, 1)'
      ],
      borderWidth: 2
    }]
  };

  if (!audits || audits.length === 0) {
    return (
      <div className="min-h-screen-safe w-full center-flex px-4 sm:px-6 lg:px-8">
        <div className="card-premium text-center py-12 sm:py-16 max-w-2xl mx-auto w-full">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">No hay datos para mostrar</h3>
          <p className="text-slate-600 mb-8 text-sm sm:text-base">
            Realiza algunas auditorías para ver estadísticas y análisis detallados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen-safe px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-6 sm:space-y-8 lg:space-y-12">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
          Análisis y Estadísticas
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          Dashboard completo de rendimiento de auditorías 5S
        </p>
      </div>

      {/* Controles de período */}
      <div className="card w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Período de Análisis</h3>
            <p className="text-xs sm:text-sm text-slate-600">Selecciona el rango de tiempo para el análisis</p>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {[
              { value: 'all', label: 'Todo el tiempo' },
              { value: '7days', label: 'Últimos 7 días' },
              { value: '30days', label: 'Últimos 30 días' },
              { value: '90days', label: 'Últimos 90 días' },
              { value: '1year', label: 'Último año' }
            ].map(period => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 flex-1 sm:flex-none ${
                  selectedPeriod === period.value
                    ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
            </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="card text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-700 mb-1">{stats.totalAudits}</div>
          <div className="text-xs sm:text-sm text-slate-600">Total Auditorías</div>
        </div>

        <div className="card text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{stats.generalAvg}</div>
          <div className="text-xs sm:text-sm text-slate-600">Promedio General</div>
        </div>

        <div className="card text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">{stats.excellentAudits}</div>
          <div className="text-xs sm:text-sm text-slate-600">Auditorías Excelentes</div>
        </div>

        <div className="card text-center">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stats.improvementTrend >= 0 ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stats.improvementTrend >= 0 ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
            </svg>
          </div>
          <div className={`text-2xl sm:text-3xl font-bold mb-1 ${stats.improvementTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stats.improvementTrend >= 0 ? '+' : ''}{stats.improvementTrend}
          </div>
          <div className="text-xs sm:text-sm text-slate-600">Tendencia</div>
        </div>
      </div>

      {/* Selector de gráficos */}
      <div className="card w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">Visualización de Datos</h3>
            <p className="text-xs sm:text-sm text-slate-600">Selecciona el tipo de gráfico para analizar los datos</p>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {[
              { 
                value: 'radar', 
                label: 'Radar', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              { 
                value: 'bar', 
                label: 'Barras', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                )
              },
              { 
                value: 'line', 
                label: 'Línea', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                )
              },
              { 
                value: 'doughnut', 
                label: 'Distribución', 
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                )
              }
            ].map(chart => (
              <button
                key={chart.value}
                onClick={() => setSelectedChart(chart.value)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 flex-1 sm:flex-none ${
                  selectedChart === chart.value
                    ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700'
                }`}
              >
                {chart.icon}
                <span>{chart.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Gráfico principal seleccionado */}
        <div className="card-premium w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">
                {selectedChart === 'radar' && 'Análisis por Sección 5S'}
                {selectedChart === 'bar' && 'Puntuaciones por Auditoría'}
                {selectedChart === 'line' && 'Tendencia Temporal'}
                {selectedChart === 'doughnut' && 'Distribución de Calificaciones'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {selectedChart === 'radar' && 'Promedio de puntuación por cada principio 5S'}
                {selectedChart === 'bar' && 'Comparación de puntuaciones generales'}
                {selectedChart === 'line' && 'Evolución del rendimiento en el tiempo'}
                {selectedChart === 'doughnut' && 'Proporción de auditorías por nivel de calidad'}
              </p>
            </div>
          </div>
          <div className="h-64 sm:h-80">
            {selectedChart === 'radar' && <Radar data={radarData} options={chartOptions} />}
            {selectedChart === 'bar' && <Bar data={barData} options={chartOptions} />}
            {selectedChart === 'line' && <Line data={lineData} options={chartOptions} />}
            {selectedChart === 'doughnut' && <Doughnut data={doughnutData} options={chartOptions} />}
          </div>
        </div>

        {/* Gráfico secundario - Siempre radar de promedios */}
        <div className="card-premium w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">Radar de Promedios 5S</h3>
              <p className="text-xs sm:text-sm text-slate-600">Vista general del rendimiento por sección</p>
            </div>
          </div>
          <div className="h-64 sm:h-80">
            <Radar data={radarData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Análisis detallado por sección */}
      <div className="card-premium w-full">
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">Análisis Detallado por Sección</h3>
          <p className="text-slate-600 text-sm sm:text-base">Rendimiento individual de cada principio 5S</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {stats.labels.map((label, idx) => {
            const score = stats.avgScores[idx];
            const getScoreColor = (score) => {
              if (score >= 4.5) return 'from-green-500 to-green-600';
              if (score >= 3.5) return 'from-blue-500 to-blue-600';
              if (score >= 2.5) return 'from-yellow-500 to-yellow-600';
              if (score >= 1.5) return 'from-orange-500 to-orange-600';
              return 'from-red-500 to-red-600';
            };

            const getScoreLabel = (score) => {
              if (score >= 4.5) return 'Excelente';
              if (score >= 3.5) return 'Bueno';
              if (score >= 2.5) return 'Regular';
              if (score >= 1.5) return 'Deficiente';
              return 'Muy Deficiente';
            };

            const icons = ['整', '頓', '掃', '潔', '躾'];

            return (
              <div key={idx} className="text-center p-4 sm:p-6 bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 w-full">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${getScoreColor(score)} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <span className="text-white font-bold text-lg sm:text-xl">{icons[idx]}</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">{label}</h4>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">{score}</div>
                <div className="text-xs sm:text-sm text-slate-600 mb-3">{getScoreLabel(score)}</div>
                
                {/* Barra de progreso */}
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                                        className={`h-2 rounded-full bg-gradient-to-r ${getScoreColor(score)} transition-all duration-500`}
                    style={{ width: `${(score / 5) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recomendaciones basadas en datos */}
      <div className="card bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200/60 w-full">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">Recomendaciones Inteligentes</h3>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              {stats.avgScores.map((score, idx) => {
                if (score < 3.5) {
                  return (
                    <div key={idx} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="break-words">
                        <strong>{stats.labels[idx]}:</strong> Requiere atención inmediata (Puntuación: {score})
                      </span>
                    </div>
                  );
                }
                return null;
              }).filter(Boolean)}
              
              {stats.improvementTrend < 0 && (
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="break-words">
                    <strong>Tendencia negativa:</strong> Implementar plan de acción correctiva
                  </span>
                </div>
              )}
              
              {stats.excellentAudits / stats.totalAudits < 0.3 && (
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="break-words">
                    <strong>Oportunidad de mejora:</strong> Solo {Math.round((stats.excellentAudits / stats.totalAudits) * 100)}% de auditorías son excelentes
                  </span>
                </div>
              )}
              
              {stats.improvementTrend > 0.5 && (
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="break-words">
                    <strong>¡Excelente progreso!</strong> Mantener las buenas prácticas implementadas
                  </span>
                </div>
              )}

              {/* Mensaje por defecto si no hay recomendaciones específicas */}
              {stats.avgScores.every(score => score >= 3.5) && 
               stats.improvementTrend >= 0 && 
               stats.excellentAudits / stats.totalAudits >= 0.3 && 
               stats.improvementTrend <= 0.5 && (
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="break-words">
                    <strong>Buen rendimiento general:</strong> Continúa con las prácticas actuales y busca oportunidades de mejora continua
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Historial de auditorías */}
      <div className="w-full">
        <AuditHistory audits={filteredAudits} loading={false} onDelete={onDelete} />
      </div>
    </div>
  );
}
