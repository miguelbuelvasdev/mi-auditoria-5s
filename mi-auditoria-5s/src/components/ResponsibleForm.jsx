import React, { useState } from 'react';

export default function ResponsibleForm({ onSubmit }) {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    cargo: '',
    area: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleBlur = e => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, form[name]);
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    
    switch (fieldName) {
      case 'nombre':
        if (!value.trim()) {
          newErrors.nombre = 'El nombre es requerido';
        } else if (value.trim().length < 2) {
          newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
        } else {
          delete newErrors.nombre;
        }
        break;
      
      case 'apellido':
        if (!value.trim()) {
          newErrors.apellido = 'El apellido es requerido';
        } else if (value.trim().length < 2) {
          newErrors.apellido = 'El apellido debe tener al menos 2 caracteres';
        } else {
          delete newErrors.apellido;
        }
        break;
      
      case 'documento':
        if (!value.trim()) {
          newErrors.documento = 'El documento es requerido';
        } else if (!/^\d{7,12}$/.test(value.trim())) {
          newErrors.documento = 'El documento debe tener entre 7 y 12 dígitos';
        } else {
          delete newErrors.documento;
        }
        break;
      
      case 'cargo':
        if (!value.trim()) {
          newErrors.cargo = 'El cargo es requerido';
        } else if (value.trim().length < 3) {
          newErrors.cargo = 'El cargo debe tener al menos 3 caracteres';
        } else {
          delete newErrors.cargo;
        }
        break;
      
      case 'area':
        if (!value.trim()) {
          newErrors.area = 'El área es requerida';
        } else if (value.trim().length < 3) {
          newErrors.area = 'El área debe tener al menos 3 caracteres';
        } else {
          delete newErrors.area;
        }
        break;
      
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'El email no es válido';
        } else {
          delete newErrors.email;
        }
        break;
      
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const fieldsToValidate = ['nombre', 'apellido', 'documento', 'cargo', 'area'];
    let isValid = true;
    
    fieldsToValidate.forEach(field => {
      if (!validateField(field, form[field])) {
        isValid = false;
      }
    });
    
    // Validar email si está presente
    if (form.email) {
      if (!validateField('email', form.email)) {
        isValid = false;
      }
    }
    
    return isValid;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    const allTouched = {};
    Object.keys(form).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simular delay de procesamiento
    setTimeout(() => {
      onSubmit(form);
      setIsSubmitting(false);
    }, 800);
  };

  const getFieldIcon = (fieldName) => {
    const icons = {
      nombre: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      apellido: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      documento: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
      cargo: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
        </svg>
      ),
      area: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      email: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    };
    return icons[fieldName];
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-white rounded-2xl sm:rounded-3xl transform rotate-1 scale-105 opacity-60" />
      
      <form onSubmit={handleSubmit} className="relative card-premium animate-slide-up w-full">
        {/* Header del formulario */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
            Datos del Responsable
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Completa la información del responsable de la auditoría
          </p>
        </div>

        {/* Grid de campos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Nombre */}
          <div className="form-group">
            <label className="block text-sm sm:text-base font-semibold text-slate-700 mb-2 flex items-center space-x-2">
              {getFieldIcon('nombre')}
              <span>Nombre *</span>
            </label>
            <input 
              name="nombre" 
              value={form.nombre} 
              onChange={handleChange}
              onBlur={handleBlur}
              required 
              placeholder="Ingresa tu nombre"
              className={`input-field-enhanced ${
                errors.nombre && touched.nombre
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30' 
                  : form.nombre && !errors.nombre
                  ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50/30'
                  : 'border-slate-300 focus:border-purple-500 hover:border-slate-400'
              }`}
            />
            {errors.nombre && touched.nombre && (
              <p className="text-xs sm:text-sm text-red-600 mt-1 flex items-center space-x-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errors.nombre}</span>
              </p>
            )}
          </div>

          {/* Apellido */}
          <div className="form-group">
            <label className="block text-sm sm:text-base font-semibold text-slate-700 mb-2 flex items-center space-x-2">
              {getFieldIcon('apellido')}
              <span>Apellido *</span>
            </label>
            <input 
              name="apellido" 
              value={form.apellido} 
              onChange={handleChange}
              onBlur={handleBlur}
              required 
              placeholder="Ingresa tu apellido"
              className={`input-field-enhanced ${
                errors.apellido && touched.apellido
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30' 
                  : form.apellido && !errors.apellido
                  ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50/30'
                  : 'border-slate-300 focus:border-purple-500 hover:border-slate-400'
              }`}
            />
            {errors.apellido && touched.apellido && (
              <p className="text-xs sm:text-sm text-red-600 mt-1 flex items-center space-x-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errors.apellido}</span>
              </p>
            )}
          </div>

          {/* Documento */}
          <div className="form-group">
            <label className="block text-sm sm:text-base font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                            {getFieldIcon('documento')}
              <span>Documento *</span>
            </label>
            <input 
              name="documento" 
              value={form.documento} 
              onChange={handleChange}
              onBlur={handleBlur}
              required 
              placeholder="Número de documento"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className={`input-field-enhanced ${
                errors.documento && touched.documento
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30' 
                  : form.documento && !errors.documento
                  ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50/30'
                  : 'border-slate-300 focus:border-purple-500 hover:border-slate-400'
              }`}
            />
            {errors.documento && touched.documento && (
              <p className="text-xs sm:text-sm text-red-600 mt-1 flex items-center space-x-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errors.documento}</span>
              </p>
            )}
          </div>

          {/* Cargo */}
          <div className="form-group">
            <label className="block text-sm sm:text-base font-semibold text-slate-700 mb-2 flex items-center space-x-2">
              {getFieldIcon('cargo')}
              <span>Cargo *</span>
            </label>
            <input 
              name="cargo" 
              value={form.cargo} 
              onChange={handleChange}
              onBlur={handleBlur}
              required 
              placeholder="Tu cargo o posición"
              className={`input-field-enhanced ${
                errors.cargo && touched.cargo
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30' 
                  : form.cargo && !errors.cargo
                  ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50/30'
                  : 'border-slate-300 focus:border-purple-500 hover:border-slate-400'
              }`}
            />
            {errors.cargo && touched.cargo && (
              <p className="text-xs sm:text-sm text-red-600 mt-1 flex items-center space-x-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errors.cargo}</span>
              </p>
            )}
          </div>

          {/* Área */}
          <div className="form-group lg:col-span-2">
            <label className="block text-sm sm:text-base font-semibold text-slate-700 mb-2 flex items-center space-x-2">
              {getFieldIcon('area')}
              <span>Área o Departamento *</span>
            </label>
            <input 
              name="area" 
              value={form.area} 
              onChange={handleChange}
              onBlur={handleBlur}
              required 
              placeholder="Área o departamento de trabajo"
              className={`input-field-enhanced ${
                errors.area && touched.area
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30' 
                  : form.area && !errors.area
                  ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50/30'
                  : 'border-slate-300 focus:border-purple-500 hover:border-slate-400'
              }`}
            />
            {errors.area && touched.area && (
              <p className="text-xs sm:text-sm text-red-600 mt-1 flex items-center space-x-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errors.area}</span>
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-group lg:col-span-2">
            <label className="block text-sm sm:text-base font-semibold text-slate-700 mb-2 flex items-center space-x-2">
              {getFieldIcon('email')}
              <span>Email</span>
              <span className="text-xs text-slate-500 font-normal">(opcional)</span>
            </label>
            <input 
              name="email" 
              value={form.email} 
              onChange={handleChange}
              onBlur={handleBlur}
              type="email" 
              placeholder="correo@empresa.com"
              className={`input-field-enhanced ${
                errors.email && touched.email
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30' 
                  : form.email && !errors.email && form.email.length > 0
                  ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50/30'
                  : 'border-slate-300 focus:border-purple-500 hover:border-slate-400'
              }`}
            />
            {errors.email && touched.email && (
              <p className="text-xs sm:text-sm text-red-600 mt-1 flex items-center space-x-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errors.email}</span>
              </p>
            )}
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Se utilizará para enviar reportes y notificaciones
            </p>
          </div>
        </div>

        {/* Botón de envío */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <button 
            type="submit" 
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className="btn-primary min-w-[200px] sm:min-w-[250px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Procesando...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>Continuar con la Auditoría</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            )}
          </button>
        </div>

        {/* Indicador de progreso del formulario */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-xs sm:text-sm text-slate-600 mb-2">
            <span>Progreso del formulario</span>
            <span>{Math.round((Object.values(form).filter(v => v.trim()).length / 6) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500 rounded-full"
              style={{ width: `${(Object.values(form).filter(v => v.trim()).length / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Nota informativa */}
        <div className="p-4 sm:p-6 bg-purple-50/50 border border-purple-200/60 rounded-xl sm:rounded-2xl">
          <div className="flex items-start space-x-3">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-xs sm:text-sm text-purple-800 min-w-0 flex-1">
              <p className="font-medium mb-1">Información importante:</p>
              <p className="break-words">Los datos ingresados se utilizarán para identificar al responsable de la auditoría y generar los reportes correspondientes. Toda la información es confidencial y se maneja según las políticas de privacidad de la empresa.</p>
            </div>
          </div>
        </div>

        {/* Campos requeridos */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            Los campos marcados con <span className="text-red-500 font-semibold">*</span> son obligatorios
          </p>
        </div>
      </form>

      {/* Estilos adicionales */}
      <style jsx>{`
        /* Prevenir zoom en inputs en iOS */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          input[type="text"],
          input[type="email"] {
            font-size: 16px !important;
          }
        }
        
        /* Mejoras para campos de formulario */
        .form-group input:focus {
          transform: translateY(-1px);
        }
        
        .form-group input:invalid:not(:placeholder-shown) {
          border-color: rgb(239 68 68);
        }
        
        /* Animaciones de validación */
        .form-group input:valid:not(:placeholder-shown) {
          border-color: rgb(34 197 94);
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .form-group {
            margin-bottom: 1rem;
          }
        }
        
        /* Accesibilidad */
        @media (prefers-reduced-motion: reduce) {
          .form-group input {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
