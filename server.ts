@@
 import graphRouter from './src/controllers/graphController';
 // Phase 3: Business Evidence Graph (file-backed JSON)
 app.use('/api/graph', graphRouter);
+
+import bacsRouter from './src/controllers/bacsController';
+// Phase 4: BACS Diagnostic Engine (MVP)
+app.use('/api/bacs', bacsRouter);
