import express from 'express';
import { createNode, getNodeById, listNodesByBusiness, updateNode, searchNodes, collectionSummary } from '../services/graphService';

const router = express.Router();

// POST /api/graph/node
router.post('/node', async (req, res) => {
  try {
    const node = await createNode(req.body);
    res.status(201).json(node);
  } catch (err) {
    console.error('create node error', err);
    res.status(500).json({ error: 'Failed to create node' });
  }
});

// PUT /api/graph/node/:id
router.put('/node/:id', async (req, res) => {
  try {
    const updated = await updateNode(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    console.error('update node error', err);
    res.status(500).json({ error: 'Failed to update node' });
  }
});

// GET /api/graph/node/:id
router.get('/node/:id', async (req, res) => {
  try {
    const node = await getNodeById(req.params.id);
    if (!node) return res.status(404).json({ error: 'Not found' });
    res.json(node);
  } catch (err) {
    console.error('get node error', err);
    res.status(500).json({ error: 'Failed to get node' });
  }
});

// GET /api/graph/business/:businessId
router.get('/business/:businessId', async (req, res) => {
  try {
    const items = await listNodesByBusiness(req.params.businessId);
    res.json(items);
  } catch (err) {
    console.error('list nodes error', err);
    res.status(500).json({ error: 'Failed to list nodes' });
  }
});

// POST /api/graph/search
router.post('/search', async (req, res) => {
  try {
    const results = await searchNodes(req.body || {});
    res.json(results);
  } catch (err) {
    console.error('search nodes error', err);
    res.status(500).json({ error: 'Failed to search nodes' });
  }
});

// GET collection summary
router.get('/summary/:businessId', async (req, res) => {
  try {
    const summary = await collectionSummary(req.params.businessId);
    res.json(summary);
  } catch (err) {
    console.error('collection summary error', err);
    res.status(500).json({ error: 'Failed to compute summary' });
  }
});

export default router;
