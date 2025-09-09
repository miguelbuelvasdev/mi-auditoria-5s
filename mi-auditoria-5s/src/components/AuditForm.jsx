import React, { useState, useEffect } from 'react';
import AuditSection from './AuditSection';

const sections = [
  {
    title: 'Seiri (Clasificación)',
    description: 'Eliminar lo innecesario y mantener solo lo esencial.',
    icon: '整',
    color: 'from-purple-500 to-purple-600',
    questions: [
      '¿Se eliminan materiales innecesarios del área de trabajo?',
      '¿El área está libre de objetos no requeridos para las operaciones?',
      '¿Se identifican claramente los elementos esenciales vs no esenciales?',
      '¿Existe un sistema para clasificar elementos por frecuencia de uso?'
    ]
  },
  {
    title: 'Seiton (Orden)',
    description: 'Organizar y ubicar todo de manera eficiente.',
    icon: '頓',
    color: 'from-purple-600 to-purple-700',
    questions: [
      '¿Cada herramienta y material tiene su lugar específico definido?',
      '¿Las herramientas están organizadas y son fácilmente accesibles?',
      '¿Se identifican visualmente las ubicaciones con etiquetas o marcas?',
      '¿El layout del área facilita el flujo de trabajo eficiente?'
    ]
  },
  {
    title: 'Seiso (Limpieza)',
    description: 'Mantener el área limpia y ordenada.',
    icon: '掃',
    color: 'from-purple-700 to-purple-800',
    questions: [
      '¿Se realiza limpieza periódica según cronograma establecido?',
      '¿El área está libre de suciedad, polvo y desperdicios?',
      '¿Se detectan y corrigen las fuentes de suciedad en origen?',
      '¿Los equipos y herramientas se mantienen limpios y funcionales?'
    ]
  },
  {
    title: 'Seiketsu (Estandarización)',
    description: 'Estandarizar procesos y mantener las mejoras.',
    icon: '潔',
    color: 'from-purple-800 to-indigo-600',
    questions: [
      '¿Existen estándares visuales claros y actualizados?',
      '¿Se mantienen consistentemente las condiciones óptimas?',
      '¿Se revisan y actualizan periódicamente los estándares?',
      '¿Todo el personal conoce y aplica los estándares establecidos?'
    ]
  },
  {
    title: 'Shitsuke (Disciplina)',
    description: 'Fomentar la disciplina y el cumplimiento de las normas.',
    icon: '躾',
    color: 'from-indigo-600 to-purple-600',
    questions: [
      '¿El personal sigue consistentemente los procedimientos establecidos?',
      '¿Se promueve activamente la cultura de mejora continua?',
      '¿Se reconocen y corrigen oportunamente las desviaciones?',
      '¿Existe compromiso visible del liderazgo con la metodología 5S?'
    ]
  }
];

export default function AuditForm({ onGenerateReport }) {
  const [values, setValues] = useState(sections.map(s => Array(s.questions.length).fill(1)));
  const [notes, setNotes] = useState(sections.map(s => Array(s.questions.length).fill('')));
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Calcular progreso
  useEffect(() => {
    const totalQuestions = sections.reduce((acc, section) => acc + section.questions.length, 0);
    const answeredQuestions = values.flat().filter(value => value !== null && value !== undefined).length;
    setProgress((answeredQuestions / totalQuestions) * 100);
  }, [values]);

  const handleSectionChange = (sectionIdx, qIdx, value, note) => {
    const newValues = values.map(arr => [...arr]);
    const newNotes = notes.map(arr => [...arr]);
    newValues[sectionIdx][qIdx] = value;
    newNotes[sectionIdx][qIdx] = note;
    setValues(newValues);
    setNotes(newNotes);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular procesamiento
    setTimeout(() => {
      onGenerateReport({ values, notes });
      setIsSubmitting(false);
    }, 1500);
  };

  const getSectionScore = (sectionIdx) => {
    const sectionValues = values[sectionIdx];
    const validValues = sectionValues.filter(v => v !== null && v !== undefined);
    if (validValues.length === 0) return 0;
    return (validValues.reduce((a, b) => a + b, 0) / validValues.length).toFixed(1);
  };

  const getOverallScore = () => {
    const allValues = values.flat().filter(v => v !== null && v !== undefined);
    if (allValues.length === 0) return 0;
    return (allValues.reduce((a, b) => a + b, 0) / allValues.length).toFixed(1);
  };

  const goToNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const isCurrentSectionComplete = () => {
    const sectionValues = values[currentSection];
    return sectionValues.every(value => value !== null && value !== undefined && value >= 1 && value <= 5);
  };

  const canSubmitForm = () => {
    return values.every(sectionValues =>
      sectionValues.every(value => value !== null && value !== undefined && value >= 1 && value <= 5)
    );
  };

  const goToPreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header con progreso */}
      <div className="card-premium w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
              Evaluación de Auditoría 5S
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Evalúa cada sección según los criterios establecidos
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
            {/* Progreso general */}
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-700 mb-1">
                {getOverallScore()}/5
              </div>
              <div className="text-xs sm:text-sm text-slate-600">Puntuación General</div>
            </div>
            
            {/* Barra de progreso */}
            <div className="w-full sm:w-48">
              <div className="flex justify-between text-xs sm:text-sm text-slate-600 mb-2">
                <span>Progreso</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 sm:h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación de secciones */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-lg w-full overflow-x-auto">
        <div className="flex gap-1 sm:gap-2 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center">
          {sections.map((section, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSection(idx)}
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 min-h-[44px] ${
                currentSection === idx
                  ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                currentSection === idx ? 'bg-white/20' : 'bg-purple-600 text-white'
              }`}>
                {section.icon}
              </div>
              <span className="hidden sm:inline">{section.title.split(' ')[0]}</span>
              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                getSectionScore(idx) >= 1 ? 'bg-green-500 text-white' : 'bg-slate-300 text-slate-600'
              }`}>
                {getSectionScore(idx)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Formulario de auditoría */}
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 w-full">
        {/* Secciones */}
        <div className="w-full">
          {sections.map((section, idx) => (
            <div
              key={section.title}
              className={`transition-all duration-500 w-full ${
                currentSection === idx ? 'block animate-fade-in' : 'hidden'
              }`}
            >
              <AuditSection
                title={section.title}
                description={section.description}
                icon={section.icon}
                color={section.color}
                questions={section.questions}
                values={values[idx]}
                notes={notes[idx]}
                onChange={(qIdx, value, note) => handleSectionChange(idx, qIdx, value, note)}
                sectionIndex={idx}
                currentScore={getSectionScore(idx)}
              />
            </div>
          ))}
        </div>

        {/* Navegación entre secciones */}
        <div className="flex flex-col gap-4 py-4 sm:py-6 w-full">
          {/* Indicadores de progreso */}
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            {sections.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                  idx === currentSection
                    ? 'bg-purple-600 scale-125'
                    : idx < currentSection
                    ? 'bg-green-500'
                    : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
          
          {/* Botones de navegación */}
          <div className="flex gap-3 sm:gap-4">
            <button
              type="button"
              onClick={goToPreviousSection}
              disabled={currentSection === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex-1 min-h-[48px]"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Anterior</span>
              <span className="sm:hidden">Atrás</span>
            </button>

            {currentSection < sections.length - 1 ? (
              <div className="flex-1">
                {!isCurrentSectionComplete() && (
                  <div className="text-center mb-2">
                    <p className="text-xs text-orange-600 font-medium">
                      Completa todas las preguntas para continuar
                    </p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={goToNextSection}
                  disabled={!isCurrentSectionComplete()}
                  className="btn-primary w-full min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <span className="sm:hidden">Siguiente</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ) : canSubmitForm() ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 min-h-[48px] bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="hidden sm:inline">Generando Reporte...</span>
                    <span className="sm:hidden">Generando...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="hidden sm:inline">Generar Reporte</span>
                    <span className="sm:hidden">Generar</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex-1 min-h-[48px] bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-xs sm:text-sm font-medium">Completa todas las preguntas</p>
                  <p className="text-xs text-slate-400">para generar el reporte</p>
                </div>
              </div>
            )}
          </div>
        </div>


        {/* Consejos y ayuda contextual */}
        <div className="card bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200/60 w-full">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">
                Consejos para la Sección: {sections[currentSection].title}
              </h4>
              <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                {currentSection === 0 && (
                  <>
                    <p>• Identifica elementos que no se han usado en los últimos 30 días</p>
                    <p>• Clasifica por frecuencia: diario, semanal, mensual, ocasional</p>
                    <p>• Usa etiquetas rojas para marcar elementos innecesarios</p>
                  </>
                )}
                {currentSection === 1 && (
                  <>
                    <p>• Cada herramienta debe tener una ubicación específica y marcada</p>
                    <p>• Implementa el principio "un lugar para cada cosa"</p>
                    <p>• Usa sombras, contornos o códigos de colores para identificar ubicaciones</p>
                  </>
                )}
                {currentSection === 2 && (
                  <>
                    <p>• Establece rutinas de limpieza diarias, semanales y mensuales</p>
                    <p>• Identifica y elimina las fuentes de suciedad en origen</p>
                    <p>• Mantén equipos y herramientas limpios y en buen estado</p>
                  </>
                )}
                {currentSection === 3 && (
                  <>
                    <p>• Crea estándares visuales claros y fáciles de seguir</p>
                    <p>• Documenta las mejores prácticas implementadas</p>
                    <p>• Revisa y actualiza estándares periódicamente</p>
                  </>
                )}
                {currentSection === 4 && (
                  <>
                    <p>• Fomenta el compromiso y la participación de todo el equipo</p>
                    <p>• Implementa sistemas de reconocimiento y mejora continua</p>
                    <p>• Realiza auditorías regulares y seguimiento de desviaciones</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de sección actual móvil */}
        <div className="block sm:hidden w-full">
          <div className="card text-center">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${sections[currentSection].color} rounded-xl flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-lg">{sections[currentSection].icon}</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-slate-900 text-sm">{sections[currentSection].title}</h3>
                <p className="text-xs text-slate-600">Sección {currentSection + 1} de {sections.length}</p>
              </div>
            </div>
            <div className="text-xs text-slate-600">
              {sections[currentSection].description}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
