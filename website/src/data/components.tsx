import { Box, Button, Spinner } from '@agile-ui/react';
import { MDXComponents } from 'mdx/types';

export const components: MDXComponents = {
  Box: (props) => <Box {...props} />,
  Button: (props) => <Button {...props} />,
  Spinner: (props) => <Spinner {...props} />,
};
