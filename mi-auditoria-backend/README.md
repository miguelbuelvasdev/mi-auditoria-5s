# Mi Auditoría Backend

API REST para el sistema de auditorías 5S construido con Node.js, Express y MongoDB.

## 🚀 Características

- API REST completa para gestión de auditorías 5S
- Conexión a MongoDB Atlas
- Validación de datos robusta
- Manejo de errores centralizado
- Configuración CORS para frontend
- Variables de entorno seguras

## 📋 Requisitos

- Node.js v18+
- MongoDB Atlas account
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repo-backend>
cd mi-auditoria-backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea el archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. Configura las variables de entorno en `.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/auditoria5s
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor se ejecutará en `http://localhost:5000`

## 📚 API Endpoints

### Health Check
- `GET /api/health` - Verificar estado del servidor

### Auditorías
- `GET /api/audits` - Obtener todas las auditorías
- `POST /api/audits` - Crear nueva auditoría
- `DELETE /api/audits/:id` - Eliminar auditoría específica

### Ejemplo de Request POST
```json
{
  "scores": [4, 3, 5, 4, 3],
  "notes": [["Nota 1"], ["Nota 2"], [], [], []],
  "average": 3.8,
  "responsable": {
    "nombre": "Juan Pérez",
    "apellido": "García",
    "documento": "12345678",
    "cargo": "Supervisor",
    "area": "Producción",
    "email": "juan.perez@empresa.com"
  }
}
```

## 🔧 Configuración CORS

El backend está configurado para aceptar requests desde:
- Desarrollo: `http://localhost:5173` (Vite)
- Producción: URL de Vercel (configurar en `FRONTEND_URL`)

## 📁 Estructura del Proyecto

```
mi-auditoria-backend/
├── server.js          # Punto de entrada
├── db.js             # Conexión MongoDB
├── models/
│   └── Audit.js      # Schema de auditorías
├── routes/
│   └── audits.js     # Rutas de la API
├── package.json
├── .env.example
└── README.md
```

## 🚀 Deployment en Railway

1. Conecta tu repositorio a Railway
2. Configura las variables de entorno en Railway:
   - `PORT`: 5000
   - `MONGO_URI`: Tu conexión MongoDB Atlas
   - `NODE_ENV`: production
   - `FRONTEND_URL`: URL de tu frontend en Vercel

3. Railway detectará automáticamente el `package.json` y ejecutará `npm start`

## 🔒 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | 5000 |
| `MONGO_URI` | URL de MongoDB Atlas | mongodb+srv://... |
| `NODE_ENV` | Ambiente | development/production |
| `FRONTEND_URL` | URL del frontend | https://mi-app.vercel.app |

## 📝 Notas

- Asegúrate de que MongoDB Atlas permita conexiones desde Railway
- Configura las reglas de CORS correctamente para producción
- Mantén las variables de entorno seguras y no las subas al repositorio

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request
