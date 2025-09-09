
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auditoria5s';

const connectDB = async () => {
  try {
    // Conexión limpia a MongoDB sin opciones viejas
    await mongoose.connect(MONGO_URI);

    console.log('✅ Conectado a MongoDB sin problemas');
    console.log(`📍 Base de datos: ${mongoose.connection.name}`);

    // Monitoreamos la conexión por si hay problemas
    mongoose.connection.on('error', (err) => {
      console.error('❌ Error en la conexión:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ Se desconectó de MongoDB');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 Volvió a conectar a MongoDB');
    });

  } catch (err) {
    console.error('❌ No se pudo conectar a MongoDB:', err.message);
    console.error('🔧 Revisa que MongoDB esté corriendo y la URI esté bien');
    process.exit(1);
  }
};

// Cerramos la conexión cuando se apaga la app
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('🔒 Conexión cerrada correctamente');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error al cerrar:', err);
    process.exit(1);
  }
});

export default connectDB;
