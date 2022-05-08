import loadable from '@loadable/component';
import { MDXProvider } from '@mdx-js/react';
import { useParams } from 'react-router-dom';
import { components } from '../../data/components';
import { camelCase } from '../../utils/string';

const AsyncPage = loadable((props: { page: unknown }) => import(`../../docs/${props.page}.mdx`));

const View = () => {
  const component = camelCase(useParams().component || '');

  return (
    <MDXProvider components={components}>
      <AsyncPage page={component} />
    </MDXProvider>
  );
};

export default View;
