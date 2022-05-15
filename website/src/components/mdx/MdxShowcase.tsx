import { Button, Spinner } from '@agile-ui/react';
import { Playground } from '../playground/Playground';
import { Prop } from './MdxPropsTable';

export const showcases = {
  Button: (componentProps: Prop[]) => (
    <Playground component={Button} defaultProps={{ children: '按钮' }} componentProps={componentProps} />
  ),
  Spinner: (componentProps: Prop[]) => (
    <Playground component={Spinner} defaultProps={{ size: 'lg' }} componentProps={componentProps} />
  ),
};

export const MdxShowcase = ({ component, componentProps }: { component: string; componentProps: Prop[] }) => {
  return showcases[component as keyof typeof showcases](componentProps);
};
