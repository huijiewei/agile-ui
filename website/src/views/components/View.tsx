import { useParams } from 'react-router-dom';
import { useErrorBoundary, withErrorBoundary } from 'react-use-error-boundary';
import Image500 from '../../assets/images/500.png';
import { Error } from '../../components/error/Error';
import { useMDX } from '../../components/mdx/MdxComponent';
import { camelCase } from '../../utils/string';

const View = withErrorBoundary(() => {
  const [error, resetError] = useErrorBoundary();

  const component = camelCase(useParams().component || '');

  const mdx = useMDX(component);

  if (error) {
    return (
      <Error onBack={resetError} title={'组件加载错误'}>
        <img className={'w-[320px] items-center'} src={Image500} alt={'组件加载错误'}></img>
      </Error>
    );
  }

  return <section className={'flex flex-col gap-5'}>{mdx}</section>;
});

export default View;
