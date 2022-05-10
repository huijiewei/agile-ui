import loadable from '@loadable/component';
import { MDXProvider } from '@mdx-js/react';
import { useParams } from 'react-router-dom';
import { useErrorBoundary, withErrorBoundary } from 'react-use-error-boundary';
import { Error } from '../../components/error/Error';
import { components } from '../../data/components';
import { camelCase } from '../../utils/string';

const AsyncPage = loadable((props: { page: unknown }) => import(`../../docs/${props.page}.mdx`));

const View = withErrorBoundary(() => {
  const [error] = useErrorBoundary();

  const component = camelCase(useParams().component || '');

  if (error) {
    return <Error title={'组件加载错误'}></Error>;
  }

  return (
    <MDXProvider components={components}>
      <AsyncPage page={component} />
    </MDXProvider>
  );
});

export default View;
