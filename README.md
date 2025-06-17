# Unit Tests Template – TypeScript

## Overview

This template is set up to use TypeScript with Jest for unit testing. It features path alias configuration, VSCode debugging support, dependency injection via TSyringe, and comprehensive testing with Jest.

## Key Features

- **Path Alias**: Clean imports using `@/` prefix (e.g., `import { MyClass } from '@/services/MyClass'`)
- **VSCode Debugging Configuration**: Pre-configured debug settings for application and tests
- **Dependency Injection via TSyringe**: Lightweight DI container with decorator support
- **Jest for Testing**: Comprehensive testing framework with mocking and coverage support

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
