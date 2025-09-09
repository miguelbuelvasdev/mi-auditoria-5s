import React, { useState } from 'react';

const scoreLabels = {
  1: { label: 'Muy Deficiente', color: 'from-red-500 to-red-600', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  2: { label: 'Deficiente', color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  3: { label: 'Regular', color: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  4: { label: 'Bueno', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  5: { label: 'Excelente', color: 'from-green-500 to-green-600', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }
};

export default function AuditSection({ 
  title, 
  description, 
  icon, 
  color, 
  questions, 
  values, 
  notes, 
  onChange, 
  sectionIndex,
  currentScore 
}) {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const getQuestionProgress = () => {
    const answered = values.filter(v => v !== null && v !== undefined).length;
    return (answered / questions.length) * 100;
  };

  const getScoreColor = (score) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 3.5) return 'text-blue-600';
    if (score >= 2.5) return 'text-yellow-600';
    if (score >= 1.5) return 'text-orange-600';
    return 'text-red-600';
  };

  const toggleExpanded = (questionIndex) => {
    setExpandedQuestion(expandedQuestion === questionIndex ? null : questionIndex);
  };

  return (
    <section className="card-premium animate-slide-up relative overflow-hidden w-full">
      {/* Background decorativo */}
      <div className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br ${color} opacity-5 rounded-full blur-2xl transform translate-x-8 sm:translate-x-16 -translate-y-8 sm:-translate-y-16`} />
      
      {/* Header de la sección */}
      <div className="relative z-10 mb-6 sm:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
              <span className="text-white font-bold text-lg sm:text-2xl">{icon}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-1 break-words">{title}</h2>
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg break-words">{description}</p>
            </div>
          </div>
          
          {/* Score y progreso */}
          <div className="flex items-center space-x-4 sm:space-x-6 justify-center lg:justify-end">
            <div className="text-center">
              <div className={`text-2xl sm:text-3xl font-bold ${getScoreColor(currentScore)} mb-1`}>
                {currentScore}/5
              </div>
              <div className="text-xs sm:text-sm text-slate-500">Puntuación</div>
            </div>
            
            <div className="w-20 sm:w-24">
              <div className="text-xs sm:text-sm text-slate-600 mb-2 text-center">
                {Math.round(getQuestionProgress())}%
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 sm:h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500 rounded-full"
                  style={{ width: `${getQuestionProgress()}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preguntas */}
      <div className="space-y-4 sm:space-y-6">
        {questions.map((question, idx) => {
          const currentValue = values[idx];
          const currentNote = notes[idx];
          const isExpanded = expandedQuestion === idx;
          const scoreInfo = scoreLabels[currentValue] || scoreLabels[3];

          return (
            <div 
              key={idx} 
              className={`relative p-4 sm:p-6 border-2 rounded-xl sm:rounded-2xl transition-all duration-300 w-full ${
                isExpanded 
                  ? 'border-purple-300 bg-purple-50/30 shadow-lg' 
                  : 'border-slate-200 bg-white/50 hover:border-purple-200 hover:bg-purple-50/20'
              }`}
            >
              {/* Número de pregunta */}
              <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs sm:text-sm">{idx + 1}</span>
              </div>

              {/* Pregunta */}
              <div className="mb-4 sm:mb-6">
                <button
                  type="button"
                  onClick={() => toggleExpanded(idx)}
                  className="w-full text-left pr-8 sm:pr-10"
                >
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-slate-900 mb-2 leading-relaxed hover:text-purple-700 transition-colors duration-200 break-words">
                    {question}
                  </h3>
                </button>
                
                {/* Indicador de expansión */}
                <button
                  type="button"
                  onClick={() => toggleExpanded(idx)}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-slate-400 hover:text-purple-600 transition-colors duration-200 touch-target"
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
              </div>

              {/* Slider y puntuación */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={currentValue}
                      onChange={e => onChange(idx, Number(e.target.value), currentNote)}
                      className="w-full h-2 sm:h-3 rounded-lg appearance-none bg-slate-200 focus:outline-none focus:ring-4 focus:ring-purple-500/20 cursor-pointer slider-purple"
                    />
                    
                    {/* Labels del slider */}
                    <div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
                    </div>
                  </div>
                  
                  {/* Score badge */}
                  <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 ${scoreInfo.bg} ${scoreInfo.text} ${scoreInfo.border} min-w-[100px] sm:min-w-[120px] text-center shadow-sm flex-shrink-0`}>
                    <div className="font-bold text-base sm:text-lg">{currentValue}</div>
                    <div className="text-xs font-medium">{scoreInfo.label}</div>
                  </div>
                </div>

                {/* Área de notas expandible */}
                <div className={`transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'max-h-48 sm:max-h-60 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pt-4 border-t border-slate-200">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Observaciones y comentarios</span>
                    </label>
                    <textarea
                      rows={3}
                      value={currentNote}
                      onChange={e => onChange(idx, currentValue, e.target.value)}
                      placeholder="Describe hallazgos, oportunidades de mejora, acciones correctivas sugeridas..."
                      className="textarea-field-enhanced resize-none text-xs sm:text-sm"
                      maxLength={500}
                    />
                    
                    {/* Contador de caracteres y tip */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 gap-2 text-xs text-slate-500">
                      <span className="break-words">Tip: Sé específico en tus observaciones para generar mejores reportes</span>
                      <span className="flex-shrink-0">{currentNote.length}/500</span>
                    </div>
                  </div>
                </div>

                {/* Quick notes cuando no está expandido */}
                {!isExpanded && currentNote && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1.586l-4 4z" />
                      </svg>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 break-words">{currentNote}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>



      {/* Estilos para el slider personalizado */}
      <style jsx>{`
        .slider-purple::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(124 58 237), rgb(109 40 217));
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(124, 58, 237, 0.3);
          border: 2px solid white;
          transition: all 0.2s ease;
        }
        
        .slider-purple::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(124, 58, 237, 0.4);
        }
        
        .slider-purple::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(124 58 237), rgb(109 40 217));
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(124, 58, 237, 0.3);
          border: 2px solid white;
          transition: all 0.2s ease;
        }
        
        .slider-purple::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(124, 58, 237, 0.4);
        }
        
        @media (min-width: 640px) {
          .slider-purple::-webkit-slider-thumb {
            width: 24px;
            height: 24px;
          }
          
          .slider-purple::-moz-range-thumb {
            width: 24px;
            height: 24px;
          }
        }
        
        /* Estilos para line-clamp */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Touch target para móviles */
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
      `}</style>
    </section>
  );
}
