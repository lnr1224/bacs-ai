@@
 import interviewRouter from './src/controllers/interviewController';
 // Phase 2: Interview Engine — accepts guided answers and writes structured Evidence
 app.use('/api/interview', interviewRouter);
+
+import graphRouter from './src/controllers/graphController';
+// Phase 3: Business Evidence Graph (file-backed JSON)
+app.use('/api/graph', graphRouter);
