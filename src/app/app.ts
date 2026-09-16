import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { mapResumeAiError, ResumeAiService } from './resume-ai.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly resumeAi = inject(ResumeAiService);

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

    try {
      this.improvedText.set(await this.resumeAi.improveWording(textToImprove));
    } catch (err) {
      this.improvedText.set(mapResumeAiError(err));
    } finally {
      this.loading.set(false);
    }
  }
}
