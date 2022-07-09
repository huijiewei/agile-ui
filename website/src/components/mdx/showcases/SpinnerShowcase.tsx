import { Spinner } from '@agile-ui/react';
import { Playground } from '../../playground/Playground';
import type { ComponentProp } from '../../playground/PlaygroundHelper';

export const SpinnerShowcase = (componentProps: ComponentProp[]) => (
  <Playground
    codeTemplate={(props: string) => `
import { Spinner } from '@agile-ui/react';

const Demo = () => {
  return (
    <Spinner${props} />
  );
}
`}
    component={Spinner}
    componentProps={componentProps}
  />
);
