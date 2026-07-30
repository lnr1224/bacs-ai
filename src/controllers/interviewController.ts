import express from 'express';
import { getQuestionsByStage } from '../config/questions';
import { createEvidence } from '../services/evidenceService';

const router = express.Router();

// GET /api/interview/questions?stage=idea
router.get('/questions', async (req, res) => {
  try {
    const stage = (req.query.stage as string) || 'idea';
    const list = getQuestionsByStage(stage as any);
    res.json(list);
  } catch (err) {
    console.error('failed to list questions', err);
    res.status(500).json({ error: 'Failed to list questions' });
  }
});

// POST /api/interview/answer
// body: { businessId, questionId, fieldKey, answer, answerType (e.g., 'i_dont_know'|'value') }
router.post('/answer', async (req, res) => {
  try {
    const { businessId, questionId, fieldKey, answer, answerType, meta } = req.body;
    if (!businessId || !fieldKey || !questionId) {
      return res.status(400).json({ error: 'businessId, questionId and fieldKey are required' });
    }

    // Determine status
    let status: any = 'Observed';
    if (answerType === 'i_dont_know') status = 'Unknown';
    if (answerType === 'missing') status = 'Missing';

    const payload = {
      businessId,
      fieldKey,
      value: answer ?? null,
      status,
      source: { type: 'interview', reference: questionId },
      confidence: status === 'Observed' ? 0.5 : 0, // placeholder; later the Diagnostic Engine will compute confidence
      requiredFor: meta?.requiredFor || [],
      priority: meta?.priority || 'Supporting',
      freshness: 'Fresh'
    };

    const ev = await createEvidence(payload);
    res.status(201).json(ev);
  } catch (err) {
    console.error('answer submission failed', err);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
});

export default router;
