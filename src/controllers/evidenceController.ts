@@
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
+
+// POST /api/evidence/:id/confirm  -- Confirm Imported evidence to Verified
+router.post('/:id/confirm', async (req, res) => {
+  try {
+    const id = req.params.id;
+    // set status to Verified and confidence to 1
+    const ev = await updateEvidence(id, { status: 'Verified', confidence: 1 });
+    if (!ev) return res.status(404).json({ error: 'Not found' });
+    res.json(ev);
+  } catch (err) {
+    console.error('confirm evidence error', err);
+    res.status(500).json({ error: 'Failed to confirm evidence' });
+  }
+});
