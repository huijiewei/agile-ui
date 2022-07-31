import { Input } from '@agile-ui/react';
import { Playground } from '../../playground/Playground';
import type { ComponentProp } from '../../playground/PlaygroundHelper';

export const InputShowcase = (componentProps: ComponentProp[]) => (
  <Playground
    codeTemplate={(props: string) => `
import { Input } from '@agile-ui/react';

const Demo = () => {
  return (
    <Input${props} />
  );
}
`}
    component={Input}
    defaultProps={{ placeholder: '输入框' }}
    componentProps={componentProps}
    ignoreProps={['onChange', 'onClear', 'value', 'defaultValue']}
  />
);
