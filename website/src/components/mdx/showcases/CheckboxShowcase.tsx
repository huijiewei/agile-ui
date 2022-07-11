import { Checkbox } from '@agile-ui/react';
import { Playground } from '../../playground/Playground';
import type { ComponentProp } from '../../playground/PlaygroundHelper';

export const CheckboxShowcase = (componentProps: ComponentProp[]) => (
  <Playground
    codeTemplate={(props, children?) => `
import { Checkbox } from '@agile-ui/react';

const Demo = () => {
  return (
    <Checkbox${props}>
      ${children}
    </Checkbox>
  );
}
`}
    component={Checkbox}
    defaultProps={{ children: '复选框' }}
    componentProps={componentProps}
    ignoreProps={['icon', 'value', 'onChange']}
  />
);
