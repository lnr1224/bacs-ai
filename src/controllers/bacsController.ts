import express from 'express';
import { computeBacsReport } from '../services/diagnosticEngine';

const router = express.Router();

// GET /api/bacs/report/:businessId
router.get('/report/:businessId', async (req, res) => {
  try {
    const report = await computeBacsReport(req.params.businessId);
    res.json(report);
  } catch (err) {
    console.error('failed to compute bacs report', err);
    res.status(500).json({ error: 'Failed to compute BACS report' });
  }
});

export default router;
