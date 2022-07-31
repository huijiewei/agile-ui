import { NumberInput } from '@agile-ui/react';
import { Playground } from '../../playground/Playground';
import type { ComponentProp } from '../../playground/PlaygroundHelper';

export const NumberInputShowcase = (componentProps: ComponentProp[]) => (
  <Playground
    codeTemplate={(props: string) => `
import { NumberInput } from '@agile-ui/react';

const Demo = () => {
  return (
    <NumberInput${props} />
  );
}
`}
    component={NumberInput}
    defaultProps={{ placeholder: '数字输入框', defaultValue: undefined }}
    componentProps={componentProps}
    ignoreProps={['onChange', 'format', 'parse', 'value', 'defaultValue']}
  />
);
