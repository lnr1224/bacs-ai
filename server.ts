import evidenceRouter from './src/controllers/evidenceController';
+// mount evidence routes early in the pipeline (Phase 1: Evidence Layer)
+app.use('/api/evidence', evidenceRouter);
