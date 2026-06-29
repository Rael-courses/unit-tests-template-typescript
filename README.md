# Unit Tests Template – TypeScript

## Overview

This template is set up to use TypeScript with Jest for unit testing. It features path alias configuration, VSCode debugging support, dependency injection via TSyringe, and comprehensive testing with Jest.

## Key Features

- **Path Alias**: Clean imports using `@/` prefix (e.g., `import { MyClass } from '@/services/MyClass'`)
- **VSCode Debugging Configuration**: Pre-configured debug settings for application and tests
- **Dependency Injection via TSyringe**: Lightweight DI container with decorator support
- **Jest for Testing**: Comprehensive testing framework with mocking and coverage support

## 🤖 TP — Le TDD au-delà du code (prompt-TDD)

Deux TP montrent que le **TDD est une démarche**, pas une syntaxe : on l'applique ici à un
**system prompt** de chatbot, évalué par un **LLM juge** (l'agent de code de l'élève — aucune
clé API requise). Chaque TP fournit un **visualiseur HTML** vert/rouge à ouvrir dans Chrome et
un **pont Jest** (`npm test`).

1. **[Chef Léo — LLM as a judge](tests/tp-tdd-prompt-llm-judge/README.md)** : les tests sont
   **fournis**, l'élève **raffine** le system prompt (persona, périmètre, sécurité, secret de la
   maison) jusqu'au vert. *Découverte du concept.*
2. **[Zéphyr SAV — vrai TDD sur un backlog de PO](tests/tp-tdd-prompt-po/README.md)** : l'élève
   **écrit chaque test** à partir des user stories d'un Product Owner, le voit rouge, puis fait
   évoluer le prompt. *Discipline test-first.*

## Installation

1. Install dependencies:
   ```
   npm install
   ```

## Running Tests

1. Run all tests:
   ```
   npm test
   ```
2. Run coverage:
   ```
   npm run coverage
   ```

## Development

1. Start the application:
   ```
   npm start
   ```
2. Run in development mode with hot reload:
   ```
   npm run dev
   ```

## Debugging

Use VSCode's built-in debugging features:

- **F5** to start debugging the application
- Use "Debug Jest Tests" configuration to debug your tests
- Set breakpoints directly in your TypeScript code

## Adding Tests

1. Create .test.ts or .spec.ts files alongside your existing code.
2. Write your test cases using the Jest framework.
3. Use dependency injection for better testability.
