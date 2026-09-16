import { TestBed } from '@angular/core/testing';
import { isFirebaseConfigReady } from './firebase-config';
import {
  FirebaseConfigError,
  mapResumeAiError,
  ResumeAiService,
} from './resume-ai.service';

describe('ResumeAiService', () => {
  let service: ResumeAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumeAiService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should have a real Firebase web config', () => {
    expect(isFirebaseConfigReady()).toBe(true);
  });

  it('should map missing config and permission errors for the UI', () => {
    expect(mapResumeAiError(new FirebaseConfigError('Paste your config'))).toBe(
      'Paste your config',
    );
    expect(mapResumeAiError(new Error('PERMISSION_DENIED'))).toContain('init ailogic');
    expect(mapResumeAiError(new Error('network down'))).toContain(
      'Could not reach Firebase AI Logic',
    );
  });
});
