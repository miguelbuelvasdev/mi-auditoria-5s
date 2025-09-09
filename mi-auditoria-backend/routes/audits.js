import express from 'express';
import Audit from '../models/Audit.js';

const router = express.Router();

// GET /api/audits - Trae todas las auditorías ordenadas por fecha
router.get('/', async (req, res) => {
  try {
    const audits = await Audit.find().sort({ createdAt: -1 });
    res.json(audits);
  } catch (err) {
    console.error('Error al obtener auditorías:', err);
    res.status(500).json({ error: 'Error al obtener auditorías' });
  }
});

// POST /api/audits - Crea una nueva auditoría
router.post('/', async (req, res) => {
  try {
    const { scores, notes, average, responsable } = req.body;

    // Chequeamos que los datos estén bien
    if (!scores || !Array.isArray(scores) || scores.length === 0) {
      return res.status(400).json({ error: 'Las puntuaciones son requeridas y deben ser un array válido' });
    }

    if (typeof average !== 'number' || average < 0 || average > 5) {
      return res.status(400).json({ error: 'El promedio debe ser un número entre 0 y 5' });
    }

    // Armamos los datos para guardar
    const auditData = { scores, notes, average };
    if (responsable) {
      auditData.responsable = responsable;
    }

    const audit = new Audit(auditData);
    await audit.save();
    res.status(201).json(audit);
  } catch (err) {
    console.error('Error al crear auditoría:', err);
    res.status(400).json({ error: 'Error al crear auditoría: ' + err.message });
  }
});

// DELETE /api/audits/:id - Borra una auditoría específica
router.delete('/:id', async (req, res) => {
  try {
    const deletedAudit = await Audit.findByIdAndDelete(req.params.id);
    if (!deletedAudit) {
      return res.status(404).json({ error: 'Auditoría no encontrada' });
    }
    res.json({ success: true, message: 'Auditoría eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar auditoría:', err);
    res.status(500).json({ error: 'Error al eliminar auditoría: ' + err.message });
  }
});

export default router;
