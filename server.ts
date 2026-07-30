import express from 'express';
import path from 'path';
import graphRouter from './src/controllers/graphController';
import bacsRouter from './src/controllers/bacsController';

const app = express();
const distPath = path.join(process.cwd(), 'dist');

app.use(express.json());
app.use(express.static(distPath));

// Phase 3: Business Evidence Graph (file-backed JSON)
app.use('/api/graph', graphRouter);

// Phase 4: BACS Diagnostic Engine (MVP)
app.use('/api/bacs', bacsRouter);

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  return res.sendFile(path.join(distPath, 'index.html'));
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
