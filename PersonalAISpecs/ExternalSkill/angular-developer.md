# Angular Developer Guideline Skill

Official guidelines and best practices compiled from the Angular Team's official Agent Skills (https://angular.dev/ai/agent-skills).

## Core Directives

1. **Analyze Version**: Always determine the project's Angular version before providing guidance, as features and best practices evolve significantly between versions. Check the dependencies in package.json for @angular/core.
2. **Use CLI Scaffolding**: When generating components, services, directives, pipes, or routes, use the Angular CLI for scaffolding to ensure consistency.
3. **Verify Build**: After generating code, run "ng build" to ensure there are no build errors. Analyze and fix any compilation or linter errors before completing.

## Reactivity and State Management

- **Favor Signals**: Use Angular Signals (signal, computed, effect) as the default reactivity model.
- **Advanced Reactivity**: Utilize modern APIs like linkedSignal and resource for state transitions and async data fetching.
- **Signals Over Observables**: Avoid traditional properties or Observables (RxJS) for component local state. Use signals instead.

## Modern Template Syntax

- **Avoid ngif**: DO NOT use legacy directives such as *ngIf, *ngFor, or *ngSwitch.
- **Built-in Control Flow**: Use the modern @if, @else if, @else, @for, @switch, and @case blocks.

## Forms (Angular v21+)

- **Signal Forms**: Use the new Signal Forms API from "@angular/forms/signals".
- **No Legacy Form API**: DO NOT import FormControl, FormGroup, FormArray, or FormBuilder from "@angular/forms".
- **Accessing State**: You must CALL a field as a function to access its state signals (such as field.valid(), field.touched(), field.dirty()).
