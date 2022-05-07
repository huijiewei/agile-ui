import { Button, Spinner } from '@agile-ui/react';
import { Playground } from '../components/playground/Playground';

export const showcases = {
  Button: () => <Playground component={Button} defaultProps={{ children: '按钮' }} />,
  Spinner: () => <Playground component={Spinner} defaultProps={{ size: 'lg' }} />,
};
