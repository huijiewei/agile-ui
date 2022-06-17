import { Button, Checkbox, Input, Spinner, Tooltip, Badge } from '@agile-ui/react';
import { Playground } from '../playground/Playground';
import type { ComponentProp } from '../playground/PlaygroundHelper';

const ButtonShowcase = (componentProps: ComponentProp[]) => (
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

const BadgeShowcase = (componentProps: ComponentProp[]) => (
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

const SpinnerShowcase = (componentProps: ComponentProp[]) => (
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

const InputShowcase = (componentProps: ComponentProp[]) => (
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
  />
);

const CheckboxShowcase = (componentProps: ComponentProp[]) => (
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
  />
);

const TooltipShowcase = (componentProps: ComponentProp[]) => (
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
    ignoreProps={['children']}
  />
);

const showcases = {
  Button: ButtonShowcase,
  Badge: BadgeShowcase,
  Spinner: SpinnerShowcase,
  Input: InputShowcase,
  Tooltip: TooltipShowcase,
  Checkbox: CheckboxShowcase,
};

export const MdxShowcase = ({ component, componentProps }: { component: string; componentProps: ComponentProp[] }) => {
  return showcases[component as keyof typeof showcases](componentProps);
};
