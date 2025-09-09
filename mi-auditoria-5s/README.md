# Mi Auditoría 5S - Frontend

Frontend de React para el sistema de auditorías 5S. Esta aplicación permite crear, gestionar y visualizar auditorías de manera eficiente con una interfaz moderna y responsiva.

## 🚀 Características

- **Interfaz intuitiva**: Diseño moderno y responsivo con Tailwind CSS
- **Gestión de auditorías**: Crear, visualizar y eliminar auditorías 5S
- **Sistema de responsables**: Asignar responsables a cada auditoría
- **Historial completo**: Visualizar todas las auditorías realizadas con gráficos
- **API RESTful**: Conexión con backend separado
- **Gráficos interactivos**: Visualización de resultados con Chart.js

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework de JavaScript para interfaces de usuario
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de CSS utilitario
- **Chart.js & React-Chartjs-2** - Librerías para gráficos

## 📋 Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Backend API corriendo (ver [mi-auditoria-backend](https://github.com/miguelbuelvasdev/mi-auditoria-backend))

## 🔧 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/miguelbuelvasdev/mi-auditoria-frontend.git
   cd mi-auditoria-frontend
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**

   Crea un archivo `.env.local` basado en `.env.example`:
   ```env
   # Para desarrollo local
   VITE_API_URL=http://localhost:5000

   # Para producción (Railway)
   # VITE_API_URL=https://mi-backend-app.railway.app
   ```

## 🚀 Uso

1. **Asegúrate de que el backend esté corriendo**
   ```bash
   # En el directorio del backend
   cd ../mi-auditoria-backend
   npm run dev
   ```

2. **Inicia el frontend**
   ```bash
   npm run dev
   ```

3. **Accede a la aplicación**

   Abre tu navegador y ve a `http://localhost:5173`

### Funcionalidades principales:

- **Nueva Auditoría**: Selecciona un responsable y completa el formulario de auditoría
- **Historial**: Visualiza todas las auditorías realizadas con sus resultados
- **Eliminar Auditorías**: Gestiona las auditorías existentes

## 📁 Estructura del Proyecto

```
mi-auditoria-frontend/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/         # Componentes React
│   │   ├── AuditForm.jsx
│   │   ├── AuditSection.jsx
│   │   ├── Header.jsx
│   │   └── ...
│   ├── pages/              # Páginas principales
│   ├── services/           # Servicios de API
│   └── assets/             # Recursos estáticos
├── .env.local             # Variables de entorno (local)
├── .env.example           # Ejemplo de variables de entorno
└── package.json
```

## 🧪 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo de Vite
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la aplicación construida
- `npm run lint` - Ejecuta ESLint para verificar el código

## 🔧 Configuración de API

El frontend se conecta a un backend separado. Configura la URL de la API en `.env.local`:

```env
VITE_API_URL=http://localhost:5000  # Desarrollo
VITE_API_URL=https://mi-backend.railway.app  # Producción
```

## 🚀 Deployment en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel:
   - `VITE_API_URL`: URL de tu backend en Railway

3. Vercel detectará automáticamente el `package.json` y construirá la aplicación

## 📡 Endpoints de API utilizados

- `GET /api/health` - Verifica el estado del backend
- `GET /api/audits` - Obtiene todas las auditorías
- `POST /api/audits` - Crea una nueva auditoría
- `DELETE /api/audits/:id` - Elimina una auditoría específica

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📧 Contacto

Miguel Buelvas - contacto@miguelbuelvasdev.com

Proyecto Backend: [mi-auditoria-backend](https://github.com/miguelbuelvasdev/mi-auditoria-backend)

