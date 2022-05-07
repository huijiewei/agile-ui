import loadable from '@loadable/component';
import { MDXProvider } from '@mdx-js/react';
import { useParams } from 'react-router-dom';
import { components } from '../../data/components';
import { showcases } from '../../data/showcases';
import { camelCase } from '../../utils/string';

const AsyncPage = loadable((props: { page: unknown }) => import(`../../docs/${props.page}.mdx`));

const View = () => {
  const component = camelCase(useParams().component || '');
  const Showcase = showcases[component as keyof typeof showcases];

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

export default View;
