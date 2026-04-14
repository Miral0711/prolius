import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { callOpenRouter } from './openrouter.js';
import { buildPrompt } from './prompts.js';
import type { AiRequest, AiResponse } from './types.js';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173' }));
app.use(express.json());

app.post('/api/ai', async (req, res) => {
  const { feature, payload } = req.body as AiRequest;

  if (!feature || !payload) {
    res.status(400).json({ error: 'Missing feature or payload' });
    return;
  }

  try {
    const { system, user } = buildPrompt(feature, payload);
    const result = await callOpenRouter(
      [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      { maxTokens: 256 },
    );

    const response: AiResponse = { feature, result };
    res.json(response);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI service error';
    console.error(`[AI] ${feature} error:`, message);
    res.status(500).json({ error: message });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', model: process.env.OPENROUTER_DEFAULT_MODEL ?? 'google/gemma-2-9b-it' });
});

app.listen(PORT, () => {
  console.log(`AI server running on http://localhost:${PORT}`);
});
