import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GemmaPoweredResumeBuilder');
  protected readonly originalText = signal('');
  protected readonly improvedText = signal('');
  protected readonly loading = signal(false);

  async improveResumeWording() {
    const textToImprove = this.originalText().trim();
    if (!textToImprove) {
      return;
    }

    this.loading.set(true);
    this.improvedText.set('');

    const promptText = `You are an expert resume writer and career coach specializing in the software development and tech industry. Your task is to rewrite the original resume bullet point or experience block to be highly professional, polished, and impactful, optimized for what tech recruiters and hiring managers look for.

CRITICAL INSTRUCTIONS FOR FACTUAL ACCURACY:
- You must strictly adhere to the truth. Do NOT alter, exaggerate, or invent any facts, experiences, achievements, metrics, or technologies.
- Do NOT make up any numbers, percentages, team sizes, or specific project outcomes that are not already present in the original text.
- Your sole job is to put the candidate's best foot forward by improving grammar, utilizing strong action verbs, highlighting professional impact, and polishing the presentation.

Formatting Rules:
- Return only the improved text.
- Do not include any introductory remarks, conversational filler, explanations, markdown quotes, or metadata.

Original wording: "${textToImprove}"`;

    try {
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gemma4',
          prompt: promptText,
          stream: false,
        }),
      });
      const data = await res.json();
      if (data.error?.includes('not found')) {
        this.improvedText.set('gemma4 not ready yet - finish: ollama pull gemma4');
      } else {
        this.improvedText.set(data.response?.trim() ?? data.error ?? 'Failed to generate suggestion');
      }
    } catch {
      this.improvedText.set('Cannot reach Ollama - is it running?');
    } finally {
      this.loading.set(false);
    }
  }
}
