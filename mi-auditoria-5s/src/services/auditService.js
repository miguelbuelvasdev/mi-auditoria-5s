const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/audits`;

// Función helper para procesar respuestas de la API
async function handleApiResponse(response) {
  if (!response.ok) {
    let errorMessage = `Error ${response.status}: ${response.statusText}`;

    try {
      const errorData = await response.json();
      if (errorData.error) {
        errorMessage = errorData.error;
      }
    } catch (e) {
      // Si no se puede parsear el JSON, usar el mensaje por defecto
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

// Función helper para manejar errores de conexión
function handleNetworkError(error) {
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    throw new Error('Error de conexión. Verifica tu conexión a internet o que el servidor esté funcionando.');
  }
  throw error;
}

export async function getAudits() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error al obtener auditorías:', error);
    handleNetworkError(error);
  }
}

export async function createAudit(data) {
  try {
    // Validación básica en el frontend
    if (!data.scores || !Array.isArray(data.scores) || data.scores.length !== 5) {
      throw new Error('Las puntuaciones deben ser un array de 5 elementos');
    }
    
    if (!data.average || typeof data.average !== 'number') {
      throw new Error('El promedio es requerido y debe ser un número');
    }
    
    if (!data.responsable || !data.responsable.nombre || !data.responsable.cargo) {
      throw new Error('La información del responsable (nombre y cargo) es requerida');
    }
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error al crear auditoría:', error);
    handleNetworkError(error);
  }
}

export async function deleteAudit(id) {
  try {
    if (!id) {
      throw new Error('ID de auditoría requerido');
    }
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error al eliminar auditoría:', error);
    handleNetworkError(error);
  }
}

// Función para verificar el estado del servidor
export async function checkServerHealth() {
  try {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await fetch(`${baseURL}/api/health`, {
      method: 'GET',
      timeout: 5000, // 5 segundos de timeout
    });

    return response.ok;
  } catch (error) {
    console.warn('Servidor no disponible:', error);
    return false;
  }
}
