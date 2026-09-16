import { Injectable } from '@angular/core';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
  type GenerativeModel,
} from 'firebase/ai';
import { firebaseConfig, isFirebaseConfigReady } from './firebase-config';

export const RESUME_WRITER_INSTRUCTIONS = `You are an expert resume writer and career coach specializing in the software development and tech industry. Your task is to rewrite the original resume bullet point or experience block to be highly professional, polished, and impactful, optimized for what tech recruiters and hiring managers look for.

CRITICAL INSTRUCTIONS FOR FACTUAL ACCURACY:
- You must strictly adhere to the truth. Do NOT alter, exaggerate, or invent any facts, experiences, achievements, metrics, or technologies.
- Do NOT make up any numbers, percentages, team sizes, or specific project outcomes that are not already present in the original text.
- Your sole job is to put the candidate's best foot forward by improving grammar, utilizing strong action verbs, highlighting professional impact, and polishing the presentation.

Formatting Rules:
- Return only the improved text.
- Do not include any introductory remarks, conversational filler, explanations, markdown quotes, or metadata.`;

export class FirebaseConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FirebaseConfigError';
  }
}

@Injectable({ providedIn: 'root' })
export class ResumeAiService {
  private model: GenerativeModel | undefined;

  async improveWording(originalText: string): Promise<string> {
    const model = this.getModel();
    const result = await model.generateContent(originalText);
    const text = result.response.text().trim();
    if (!text) {
      throw new Error('Failed to generate suggestion');
    }
    return text;
  }

  private getModel(): GenerativeModel {
    if (this.model) {
      return this.model;
    }

    if (!isFirebaseConfigReady()) {
      throw new FirebaseConfigError(
        'Firebase config is not set. Paste your web app config into src/app/firebase-config.ts.',
      );
    }

    const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
    const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });
    this.model = getGenerativeModel(ai, {
      model: 'gemini-flash-latest',
      systemInstruction: RESUME_WRITER_INSTRUCTIONS,
    });
    return this.model;
  }
}

export function mapResumeAiError(err: unknown): string {
  if (err instanceof FirebaseConfigError) {
    return err.message;
  }

  const message = err instanceof Error ? err.message : String(err);
  const normalized = message.toLowerCase();

  if (
    normalized.includes('permission_denied') ||
    normalized.includes('permission-denied') ||
    normalized.includes('403')
  ) {
    return 'Firebase AI Logic is not enabled. From this repo run: npx -y firebase-tools@latest init ailogic';
  }

  if (normalized.includes('api key') || normalized.includes('invalid-api-key')) {
    return 'Firebase config looks invalid. Check src/app/firebase-config.ts.';
  }

  if (message === 'Failed to generate suggestion') {
    return message;
  }

  return 'Could not reach Firebase AI Logic. Check your project setup and network.';
}
