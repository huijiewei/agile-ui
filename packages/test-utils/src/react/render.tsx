import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

export const testRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) => {
  return render(ui, options);
};
