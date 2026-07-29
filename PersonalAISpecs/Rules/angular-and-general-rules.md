# Code Standards and Constraints

This file defines the strict rules that the AI must follow.

## Angular Guidelines

- **Angular Version**: Work with Angular 21 (or the modern version configured in package.json).
- **Control Flow**: ALWAYS use the modern built-in control flow syntax (`@if`, `@else if`, `@else`, `@for`, `@switch`, `@case`) introduced in Angular 17.
- **Avoid Legacy Directives**: NEVER use legacy directives such as `*ngIf`, `*ngFor`, or `*ngSwitch` (e.g. do not use ngif).
- **Signals Over Observables**: Favor Angular Signals (`signal`, `computed`, `effect`, `linkedSignal`, `resource`) for state management and reactivity over traditional Properties and Observables (RxJS) wherever possible.
- **Standalone**: Use standalone components, directives, and pipes as the default architecture.

## Communication and Code Constraints

- **Dash Constraint**: NEVER use the en-dash character (U+2013) or em-dash character (U+2014) in any code, comments, responses, or outputs. Use only the standard ASCII hyphen character (`-`).
- **Conciseness**: Do not narrate obvious code lines in comments. Avoid redundant comments.
