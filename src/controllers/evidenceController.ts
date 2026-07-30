import express from 'express';
import { createEvidence, getEvidenceById, listEvidenceByBusiness, updateEvidence, searchEvidence } from '../services/evidenceService';

const router = express.Router();

// Create new evidence
router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    const ev = await createEvidence(payload);
    res.status(201).json(ev);
  } catch (err) {
    console.error('create evidence error', err);
    res.status(500).json({ error: 'Failed to create evidence' });
  }
});

// Update evidence
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const ev = await updateEvidence(id, req.body);
    if (!ev) return res.status(404).json({ error: 'Not found' });
    res.json(ev);
  } catch (err) {
    console.error('update evidence error', err);
    res.status(500).json({ error: 'Failed to update evidence' });
  }
});

// Get evidence by id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const ev = await getEvidenceById(id);
    if (!ev) return res.status(404).json({ error: 'Not found' });
    res.json(ev);
  } catch (err) {
    console.error('get evidence error', err);
    res.status(500).json({ error: 'Failed to get evidence' });
  }
});

// List evidence for a business
router.get('/business/:businessId', async (req, res) => {
  try {
    const businessId = req.params.businessId;
    const items = await listEvidenceByBusiness(businessId);
    res.json(items);
  } catch (err) {
    console.error('list evidence error', err);
    res.status(500).json({ error: 'Failed to list evidence' });
  }
});

// Search evidence
router.post('/search', async (req, res) => {
  try {
    const filter = req.body || {};
    const items = await searchEvidence(filter);
    res.json(items);
  } catch (err) {
    console.error('search evidence error', err);
    res.status(500).json({ error: 'Failed to search evidence' });
  }
});

export default router;
