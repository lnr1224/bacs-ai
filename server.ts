@@
-import evidenceRouter from './src/controllers/evidenceController';
-// Phase 1: Evidence Layer mounted first — all other systems depend on this
-app.use('/api/evidence', evidenceRouter);
+import evidenceRouter from './src/controllers/evidenceController';
+// Phase 1: Evidence Layer mounted first — all other systems depend on this
+app.use('/api/evidence', evidenceRouter);
+
+import interviewRouter from './src/controllers/interviewController';
+// Phase 2: Interview Engine — accepts guided answers and writes structured Evidence
+app.use('/api/interview', interviewRouter);
