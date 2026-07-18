import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GemmaGenAiDemo');
  protected readonly name = signal('');
  protected readonly loading = signal(false);

  async randomNameWithGemma() {
    this.loading.set(true);
    this.name.set('');
    try {
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gemma4',
          prompt: 'Reply with one random first name only, no other text.',
          stream: false,
        }),
      });
      const data = await res.json();
      if (data.error?.includes('not found')) {
        this.name.set('gemma4 not ready yet — finish: ollama pull gemma4');
      } else {
        this.name.set(data.response?.trim() ?? data.error ?? 'Failed to generate name');
      }
    } catch {
      this.name.set('Cannot reach Ollama — is it running?');
    } finally {
      this.loading.set(false);
    }
  }
}
