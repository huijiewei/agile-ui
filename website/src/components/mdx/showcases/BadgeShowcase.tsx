import { Badge } from '@agile-ui/react';
import { Playground } from '../../playground/Playground';
import type { ComponentProp } from '../../playground/PlaygroundHelper';

export const BadgeShowcase = (componentProps: ComponentProp[]) => (
  <Playground
    codeTemplate={(props, children?) => `
import { Badge } from '@agile-ui/react';

const Demo = () => {
  return (
    <Badge${props}>
      ${children}
    </Badge>
  );
}
`}
    component={Badge}
    defaultProps={{ children: '徽标' }}
    componentProps={componentProps}
  />
);
