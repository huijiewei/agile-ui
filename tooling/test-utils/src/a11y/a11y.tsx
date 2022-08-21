import { expect } from 'vitest';
import { axe, AxeConfigureOptions } from './axe';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { isValidElement, ReactElement } from 'react';

export const testA11y = async (
  ui: ReactElement | HTMLElement,
  options: RenderOptions & { axeOptions?: AxeConfigureOptions } = {}
) => {
  const { axeOptions, ...rest } = options;
  const container = isValidElement(ui) ? render(ui, rest).container : ui;
  const results = await axe(container, axeOptions);
  expect(results).toHaveNoViolations();
};
