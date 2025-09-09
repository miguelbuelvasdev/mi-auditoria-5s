# Mi Auditoría 5S

Sistema completo de auditorías 5S con frontend y backend separados. Permite crear, gestionar y visualizar auditorías de manera eficiente con una interfaz moderna y responsiva.

## 🚀 Características

- **Frontend React**: Interfaz intuitiva y responsiva con Tailwind CSS
- **Backend Node.js**: API RESTful con Express y MongoDB
- **Gestión de auditorías**: Crear, visualizar y eliminar auditorías 5S
- **Sistema de responsables**: Asignar responsables a cada auditoría
- **Historial completo**: Visualizar todas las auditorías realizadas con gráficos
- **Gráficos interactivos**: Visualización de resultados con Chart.js

## 📁 Estructura del Proyecto

```
project-5s/
├── mi-auditoria-5s/          # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── mi-auditoria-backend/     # Backend (Node.js + Express)
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── ...
├── .gitignore               # Git ignore para el proyecto completo
├── README.md                # Este archivo
└── LICENSE                  # Licencia MIT
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Framework de JavaScript para interfaces de usuario
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de CSS utilitario
- **Chart.js & React-Chartjs-2** - Librerías para gráficos

### Backend
- **Node.js** - Entorno de ejecución JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB Atlas** - Base de datos NoSQL en la nube
- **Mongoose** - ODM para MongoDB

## 📋 Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Cuenta de MongoDB Atlas

## 🔧 Instalación y Configuración

### 1. Clona el repositorio
```bash
git clone https://github.com/miguelbuelvasdev/mi-auditoria-5s.git
cd mi-auditoria-5s
```

### 2. Configura el Backend
```bash
cd mi-auditoria-backend
npm install
cp .env.example .env
# Edita .env con tus credenciales de MongoDB
npm run dev
```

### 3. Configura el Frontend
```bash
cd ../mi-auditoria-5s
npm install
cp .env.example .env.local
# Configura VITE_API_URL apuntando al backend
npm run dev
```

## 🚀 Uso

1. **Asegúrate de que el backend esté corriendo** en `http://localhost:5000`
2. **Inicia el frontend** en `http://localhost:5173`
3. **Accede a la aplicación** y comienza a crear auditorías

### Funcionalidades principales:
- **Nueva Auditoría**: Selecciona un responsable y completa el formulario
- **Historial**: Visualiza todas las auditorías con resultados
- **Eliminar Auditorías**: Gestiona las auditorías existentes

## 🔧 Configuración de API

El frontend se conecta al backend. Configura en `mi-auditoria-5s/.env.local`:
```env
VITE_API_URL=http://localhost:5000  # Desarrollo
VITE_API_URL=https://tu-backend.railway.app  # Producción
```

## 🚀 Deployment

### Frontend (Vercel)
1. Conecta `mi-auditoria-5s` a Vercel
2. Configura `VITE_API_URL` con la URL del backend

### Backend (Railway)
1. Conecta `mi-auditoria-backend` a Railway
2. Configura variables de entorno:
   - `MONGO_URI`: Tu conexión MongoDB Atlas
   - `FRONTEND_URL`: URL del frontend en Vercel

## 📡 Endpoints de API

- `GET /api/health` - Verificar estado del backend
- `GET /api/audits` - Obtener todas las auditorías
- `POST /api/audits` - Crear nueva auditoría
- `DELETE /api/audits/:id` - Eliminar auditoría específica

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

Enlaces relacionados:
- [Frontend Repository](https://github.com/miguelbuelvasdev/mi-auditoria-5s)
- [Backend Repository](https://github.com/miguelbuelvasdev/mi-auditoria-backend)
