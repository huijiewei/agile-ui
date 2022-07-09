import { ProgressBar } from '@agile-ui/react';
import { Playground } from '../../playground/Playground';
import type { ComponentProp } from '../../playground/PlaygroundHelper';

export const ProgressBarShowcase = (componentProps: ComponentProp[]) => (
  <Playground
    codeTemplate={(props: string) => `
import { ProgressBar } from '@agile-ui/react';

const Demo = () => {
  return (
    <ProgressBar${props} />
  );
}
`}
    component={ProgressBar}
    defaultProps={{ value: 50 }}
    componentProps={componentProps}
  />
);
