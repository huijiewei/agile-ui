import { Button, Tooltip } from '@agile-ui/react';
import { Playground } from '../../playground/Playground';
import type { ComponentProp } from '../../playground/PlaygroundHelper';

export const TooltipShowcase = (componentProps: ComponentProp[]) => (
  <Playground
    codeTemplate={(props) => `
import { Tooltip } from '@agile-ui/react';

const Demo = () => {
  return (
    <Tooltip${props}>
      <Button>测试</Button>
    </Tooltip>
  );
}
`}
    component={Tooltip}
    defaultProps={{ content: '工具提示', children: <Button>测试</Button> }}
    componentProps={componentProps}
    ignoreProps={['children', 'motionPreset', 'motionProps']}
  />
);
