import { Radio } from '@agile-ui/react';
import { Playground } from '../../playground/Playground';
import type { ComponentProp } from '../../playground/PlaygroundHelper';

export const RadioShowcase = (componentProps: ComponentProp[]) => (
  <Playground
    codeTemplate={(props, children?) => `
import { Radio } from '@agile-ui/react';

const Demo = () => {
  return (
    <Radio${props}>
      ${children}
    </Radio>
  );
}
`}
    component={Radio}
    defaultProps={{ children: '单选框' }}
    componentProps={componentProps}
    ignoreProps={['value', 'onChange']}
  />
);
