import { Button, Input, Spinner } from '@agile-ui/react';
import { Playground } from '../playground/Playground';
import { ComponentProp, PropValue } from '../playground/PlaygroundHelper';

const ButtonShowcase = (componentProps: ComponentProp[]) => (
  <Playground
    codeTemplate={(props: string, children?: PropValue) => `
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

const showcases = {
  Button: ButtonShowcase,
  Spinner: SpinnerShowcase,
  Input: InputShowcase,
};

export const MdxShowcase = ({ component, componentProps }: { component: string; componentProps: ComponentProp[] }) => {
  return showcases[component as keyof typeof showcases](componentProps);
};
