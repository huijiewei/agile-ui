import { Switch } from '@agile-ui/react';
import { Playground } from '../../playground/Playground';
import type { ComponentProp } from '../../playground/PlaygroundHelper';

export const SwitchShowcase = (componentProps: ComponentProp[]) => (
  <Playground
    codeTemplate={(props, children?) => `
import { Switch } from '@agile-ui/react';

const Demo = () => {
  return (
    <Switch${props}>
      ${children}
    </Switch>
  );
}
`}
    component={Switch}
    defaultProps={{ children: '开关', defaultChecked: true }}
    componentProps={componentProps}
    ignoreProps={['value', 'onChange', 'spacing', 'defaultChecked']}
  />
);
