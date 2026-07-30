import express from 'express';
import graphRouter from './src/controllers/graphController';
import bacsRouter from './src/controllers/bacsController';

const app = express();
app.use(express.json());

// Phase 3: Business Evidence Graph (file-backed JSON)
app.use('/api/graph', graphRouter);

// Phase 4: BACS Diagnostic Engine (MVP)
app.use('/api/bacs', bacsRouter);

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
