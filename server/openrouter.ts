/**
 * Reusable OpenRouter AI service.
 * All calls go through here — API key never leaves the server.
 */

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export async function callOpenRouter(
  messages: ChatMessage[],
  options: OpenRouterOptions = {},
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY is not set');

  const model = options.model ?? process.env.OPENROUTER_DEFAULT_MODEL ?? 'google/gemma-2-9b-it';

  const res = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://fleet-management-app',
      'X-Title': 'Fleet AI Service',
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: options.maxTokens ?? 256,
      temperature: options.temperature ?? 0.3,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  const data = (await res.json()) as {
    choices: Array<{ message: { content: string } }>;
  };

  return data.choices[0]?.message?.content?.trim() ?? '';
}
