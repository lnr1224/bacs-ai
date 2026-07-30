@@
-import evidenceRouter from './src/controllers/evidenceController';
-app.use('/api/evidence', evidenceRouter);
+import evidenceRouter from './src/controllers/evidenceController';
+// Phase 1: Evidence Layer mounted first — all other systems depend on this
+app.use('/api/evidence', evidenceRouter);
