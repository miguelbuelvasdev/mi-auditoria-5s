
import mongoose from 'mongoose';

// Esquema para las auditorías del sistema 5S
const AuditSchema = new mongoose.Schema({
  // Las 5 puntuaciones de cada sección (Seiri, Seiton, Seiso, Seiketsu, Shitsuke)
  scores: {
    type: [Number],
    required: [true, 'Las puntuaciones son requeridas'],
    validate: {
      validator: function(scores) {
        return scores.length === 5 && scores.every(score => score >= 1 && score <= 5);
      },
      message: 'Debe haber exactamente 5 puntuaciones, cada una entre 1 y 5'
    }
  },
  // Notas opcionales para cada sección del 5S
  notes: {
    type: [[String]],
    default: [[], [], [], [], []]
  },
  // Quién hizo la auditoría
  responsable: {
    nombre: {
      type: String,
      required: [true, 'El nombre del responsable es requerido'],
      trim: true,
      maxlength: [100, 'El nombre no puede exceder 100 caracteres']
    },
    apellido: {
      type: String,
      trim: true,
      maxlength: [100, 'El apellido no puede exceder 100 caracteres']
    },
    documento: {
      type: String,
      trim: true,
      maxlength: [50, 'El documento no puede exceder 50 caracteres']
    },
    cargo: {
      type: String,
      required: [true, 'El cargo es requerido'],
      trim: true,
      maxlength: [100, 'El cargo no puede exceder 100 caracteres']
    },
    area: {
      type: String,
      trim: true,
      maxlength: [100, 'El área no puede exceder 100 caracteres']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: function(email) {
          return !email || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: 'Formato de email inválido'
      },
      maxlength: [100, 'El email no puede exceder 100 caracteres']
    }
  },
  // Promedio general de toda la auditoría
  average: {
    type: Number,
    required: [true, 'El promedio es requerido'],
    min: [1, 'El promedio mínimo es 1'],
    max: [5, 'El promedio máximo es 5'],
    validate: {
      validator: function(average) {
        return Number.isFinite(average) && average >= 1 && average <= 5;
      },
      message: 'El promedio debe ser un número válido entre 1 y 5'
    }
  },
  // Fechas automáticas de creación y actualización
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, // Maneja automáticamente las fechas
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Actualizamos la fecha cuando se guarda
AuditSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Campo virtual para el nombre completo
AuditSchema.virtual('responsable.nombreCompleto').get(function() {
  if (this.responsable && this.responsable.nombre) {
    return `${this.responsable.nombre} ${this.responsable.apellido || ''}`.trim();
  }
  return '';
});

// Método helper para recalcular el promedio si hace falta
AuditSchema.methods.calculateAverage = function() {
  if (this.scores && this.scores.length > 0) {
    const sum = this.scores.reduce((acc, score) => acc + score, 0);
    this.average = Number((sum / this.scores.length).toFixed(2));
  }
  return this.average;
};

// Índices para que las consultas vayan más rápido
AuditSchema.index({ createdAt: -1 });
AuditSchema.index({ 'responsable.nombre': 1 });
AuditSchema.index({ average: -1 });

const Audit = mongoose.model('Audit', AuditSchema);
export default Audit;
