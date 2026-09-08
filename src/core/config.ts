import { resolve } from 'node:path';

export type Lang = 'uz' | 'ru' | 'en';

export type Config = {
  dbPath: string;
  tz: string;
  city: string;
  currency: string;
  lang: Lang;
  offline: boolean;
  llm: 'rules' | 'anthropic';
  llmModel: string;
  anthropicKey: string;
  extraFeeds: string[];
  telegram: { token: string; chatId: string };
  outDir: string;
};

const env = (k: string, d = ''): string => process.env[k]?.trim() || d;

export function loadConfig(): Config {
  return {
    dbPath: resolve(env('NEMO_DB', './data/nemo.db')),
    tz: env('NEMO_TZ', 'Asia/Tashkent'),
    city: env('NEMO_CITY', 'Tashkent'),
    currency: env('NEMO_CURRENCY', 'UZS'),
    lang: env('NEMO_LANG', 'uz') as Lang,
    offline: env('NEMO_OFFLINE') === '1',
    llm: env('NEMO_LLM', 'rules') === 'anthropic' ? 'anthropic' : 'rules',
    llmModel: env('NEMO_LLM_MODEL', 'claude-opus-5'),
    anthropicKey: env('ANTHROPIC_API_KEY'),
    extraFeeds: env('NEMO_NEWS_FEEDS').split(',').map((s) => s.trim()).filter(Boolean),
    telegram: { token: env('TELEGRAM_BOT_TOKEN'), chatId: env('TELEGRAM_CHAT_ID') },
    outDir: resolve(env('NEMO_OUT', './out')),
  };
}

/** .env faylini oddiy o'qish (bog'liqliksiz). */
export async function loadDotEnv(file = '.env'): Promise<void> {
  const { readFile } = await import('node:fs/promises');
  let text: string;
  try {
    text = await readFile(file, 'utf8');
  } catch {
    return;
  }
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    const quoted = (val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"));
    if (quoted) val = val.slice(1, -1);
    if (process.env[key] === undefined) process.env[key] = val;
  }
}
