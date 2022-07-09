import { Button } from '@agile-ui/react';
import { Playground } from '../../playground/Playground';
import type { ComponentProp } from '../../playground/PlaygroundHelper';

export const ButtonShowcase = (componentProps: ComponentProp[]) => (
  <Playground
    codeTemplate={(props, children?) => `
import { Button } from '@agile-ui/react';

const Demo = () => {
  return (
    <Button${props}>
      ${children}
    </Button>
  );
}
`}
    component={Button}
    defaultProps={{ children: '按钮' }}
    componentProps={componentProps}
    ignoreProps={['spinner']}
  />
);
