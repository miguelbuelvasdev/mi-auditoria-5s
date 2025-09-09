import React from 'react';

export default function Header() {
  return (
    <header className="relative mb-12 sm:mb-16 lg:mb-20 text-center overflow-hidden w-full">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-purple-500/10 to-purple-600/5 rounded-2xl sm:rounded-3xl blur-3xl transform -rotate-1" />
      
      {/* Contenido principal */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Badge superior */}
        <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-200/60 rounded-full text-xs sm:text-sm font-semibold text-purple-700 mb-4 sm:mb-6 shadow-sm animate-fade-in">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Sistema de Gestión de Calidad</span>
        </div>

        {/* Título principal */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-6 animate-slide-up">
          <span className="block text-slate-900 mb-2">
            Herramienta de
          </span>
          <span className="block bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
            Auditoría 5S
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 animate-slide-up animate-delay-200 px-4">
          Audita, analiza y mejora tus procesos con la metodología 5S para alcanzar la 
          <span className="text-purple-700 font-semibold"> excelencia operacional</span>
        </p>

        {/* Características destacadas - Principios 5S */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 animate-slide-up animate-delay-300 mb-8 sm:mb-12">
          {[
            { icon: '整', name: 'Seiri', description: 'Clasificación' },
            { icon: '頓', name: 'Seiton', description: 'Orden' },
            { icon: '掃', name: 'Seiso', description: 'Limpieza' },
            { icon: '潔', name: 'Seiketsu', description: 'Estandarización' },
            { icon: '躾', name: 'Shitsuke', description: 'Disciplina' }
          ].map((principle, index) => (
            <div 
              key={principle.name}
              className="flex flex-col items-center space-y-2 px-3 sm:px-4 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group min-w-[80px] sm:min-w-[100px]"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm sm:text-base lg:text-lg">{principle.icon}</span>
              </div>
              <div className="text-center">
                <div className="text-xs sm:text-sm font-semibold text-slate-700">{principle.name}</div>
                <div className="text-xs text-slate-500 hidden sm:block">{principle.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Estadísticas o métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-2xl mx-auto animate-slide-up animate-delay-500">
          <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-700 mb-1">5</div>
            <div className="text-xs sm:text-sm text-slate-600 font-medium">Principios</div>
          </div>
          
          <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-1">100%</div>
            <div className="text-xs sm:text-sm text-slate-600 font-medium">Eficiencia</div>
          </div>
          
          <div className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 sm:col-span-1 col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-1">∞</div>
            <div className="text-xs sm:text-sm text-slate-600 font-medium">Mejora Continua</div>
          </div>
        </div>

        {/* Beneficios clave */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">¿Por qué usar nuestra herramienta?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Análisis Detallado',
                description: 'Reportes completos con gráficos y métricas'
              },
              {
                icon: (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Ahorro de Tiempo',
                description: 'Proceso de auditoría simplificado y eficiente'
              },
              {
                icon: (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Seguimiento Continuo',
                description: 'Historial completo de todas las auditorías'
              },
              {
                icon: (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Recomendaciones',
                description: 'Sugerencias inteligentes para mejoras'
              }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="text-center p-4 sm:p-6 bg-white/40 backdrop-blur-sm rounded-xl border border-slate-200/60 hover:bg-white/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3 border border-purple-200/60">
                  {benefit.icon}
                </div>
                <h4 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">{benefit.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action sutil */}
        <div className="mt-8 sm:mt-12 lg:mt-16 p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/60 rounded-xl sm:rounded-2xl max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">¿Listo para comenzar?</h4>
              <p className="text-xs sm:text-sm text-slate-600">Completa los datos del responsable para iniciar tu primera auditoría 5S</p>
            </div>
            <div className="flex items-center space-x-2 text-purple-700">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-xs sm:text-sm font-medium">Continúa abajo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute top-8 sm:top-10 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-purple-400/10 rounded-full blur-xl animate-float" />
      <div className="absolute top-16 sm:top-20 right-8 sm:right-16 w-12 h-12 sm:w-16 sm:h-16 bg-purple-500/10 rounded-full blur-xl animate-float animate-delay-1000" />
      <div className="absolute bottom-8 sm:bottom-10 left-1/4 w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/10 rounded-full blur-xl animate-float animate-delay-500" />
      <div className="absolute bottom-16 sm:bottom-20 right-1/3 w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500/10 rounded-full blur-xl animate-float animate-delay-700" />

      {/* Gradiente de transición */}
      <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />

      {/* Estilos para animaciones */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-delay-500 {
          animation-delay: 500ms;
        }
        
        .animate-delay-700 {
          animation-delay: 700ms;
        }
        
        .animate-delay-1000 {
          animation-delay: 1000ms;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        }
        
        /* Mejoras de accesibilidad */
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-bounce {
            animation: none;
          }
        }
        
        /* Optimizaciones para pantallas pequeñas */
        @media (max-width: 375px) {
          .text-3xl {
            font-size: 1.75rem;
            line-height: 2rem;
          }
        }
        
        /* Optimizaciones para pantallas muy grandes */
        @media (min-width: 1920px) {
          .xl\\:text-7xl {
            font-size: 5rem;
            line-height: 1;
          }
        }
      `}</style>
    </header>
  );
}
