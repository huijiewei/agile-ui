import { Box, Button, Spinner, Stack } from '@agile-ui/react';
import { MDXComponents } from 'mdx/types';
import { MdxCode } from '../components/mdx/MdxCode';
import { MdxPre } from '../components/mdx/MdxPre';
import { MdxPropsTable } from '../components/mdx/MdxPropsTable';
import { Playground } from '../components/playground/Playground';

export const components: MDXComponents = {
  Playground: (props) => <Playground {...props} />,
  Box: (props) => <Box {...props} />,
  Button: (props) => <Button {...props} />,
  Spinner: (props) => <Spinner {...props} />,
  Stack: (props) => <Stack {...props} />,
  h1: (props) => <Box className={'text-xl font-bold'} as="h1" {...props} />,
  h2: (props) => <Box className={'text-lg font-bold'} as="h2" {...props} />,
  h3: (props) => <Box className={'text-lg font-bold'} as="h3" {...props} />,
  h4: (props) => <Box className={'text-xl font-bold'} as="h4" {...props} />,
  h5: (props) => <Box className={'text-xl font-bold'} as="h5" {...props} />,
  h6: (props) => <Box className={'text-xl font-bold'} as="h6" {...props} />,
  code: (props) => <MdxCode {...props} />,
  pre: (props) => <MdxPre {...props} />,
  PropsTable: (props) => <MdxPropsTable {...props} />,
};
