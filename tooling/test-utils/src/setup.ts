import matchers from '@testing-library/jest-dom/matchers';
import { expect, afterEach } from 'vitest';
import { toHaveNoViolations } from './a11y/axe';
import { cleanup } from '@testing-library/react';

expect.extend(matchers);
expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup();
});
