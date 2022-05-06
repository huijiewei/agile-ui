import { Box, Button, Spinner } from '@agile-ui/react';
import loadable from '@loadable/component';
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from 'mdx/types';
import { useParams } from 'react-router-dom';
import { Playground } from '../../components/playground/Playground';

const AsyncPage = loadable((props: { page: unknown }) => import(`../../docs/${props.page}.mdx`));

const camelCase = (str: string) =>
  str
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join('');

const components: MDXComponents = {
  Box: (props) => <Box {...props} />,
  Button: (props) => <Button {...props} />,
  Spinner: (props) => <Spinner {...props} />,
};

const Showcases = {
  Button: () => <Playground component={Button} defaultProps={{ children: '按钮' }} />,
  Spinner: () => <Playground component={Spinner} defaultProps={{ size: 'lg' }} />,
};

export const View = () => {
  const component = camelCase(useParams().component || '');
  const Showcase = Showcases[component as keyof typeof Showcases];

  return (
    <MDXProvider components={components}>
      <>
        <h5 className={'font-bold text-lg'}>{component}</h5>
        <Showcase />
        <AsyncPage page={component} />
      </>
    </MDXProvider>
  );
};
