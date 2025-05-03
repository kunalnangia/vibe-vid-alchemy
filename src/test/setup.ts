import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';

declare module 'vitest' {
  interface Assertion<T = any> extends matchers.TestingLibraryMatchers<T, void> {}
}

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Cleanup after each test case
afterEach(() => {
  cleanup();
}); 