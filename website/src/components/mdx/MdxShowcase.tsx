import { Button, Spinner } from '@agile-ui/react';
import { Playground, PropValue } from '../playground/Playground';
import { Prop } from './MdxPropsTable';

const ButtonShowcase = (componentProps: Prop[]) => (
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

const SpinnerShowcase = (componentProps: Prop[]) => (
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
    defaultProps={{ size: 'lg' }}
    componentProps={componentProps}
  />
);

const showcases = {
  Button: ButtonShowcase,
  Spinner: SpinnerShowcase,
};

export const MdxShowcase = ({ component, componentProps }: { component: string; componentProps: Prop[] }) => {
  return showcases[component as keyof typeof showcases](componentProps);
};
