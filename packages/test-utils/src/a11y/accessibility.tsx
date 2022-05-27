import { render, RenderOptions } from '@testing-library/react';
import { isValidElement, ReactElement } from 'react';
import { axe, JestAxeConfigureOptions, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

export const testA11y = async (
  ui: ReactElement | HTMLElement,
  options: RenderOptions & { axeOptions?: JestAxeConfigureOptions } = {}
) => {
  const { axeOptions, ...rest } = options;
  const container = isValidElement(ui) ? render(ui, rest).container : ui;
  const results = await axe(container, axeOptions);
  expect(results).toHaveNoViolations();
};
