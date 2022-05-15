import { allComponents } from 'contentlayer/generated';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Image500 from '../../assets/images/500.png';
import { Error } from '../../components/error/Error';
import { components, getMdxComponent } from '../../components/mdx/MdxComponent';
import { camelCase } from '../../utils/string';

const View = () => {
  const component = camelCase(useParams().component || '');

  const componentDoc = allComponents.find((post) => post.slug === component);

  const MdxComponent = useMemo(() => {
    if (!componentDoc) {
      return null;
    }

    return getMdxComponent(componentDoc.body.code, {
      componentProps: componentDoc.props,
    });
  }, [componentDoc]);

  if (MdxComponent === null) {
    return (
      <Error title={'组件文档不存在'}>
        <img className={'w-[320px] items-center'} src={Image500} alt={'组件文档不存在'}></img>
      </Error>
    );
  }

  return (
    <article className={'flex flex-col gap-5'}>
      <div className={'flex flex-col gap-5'}>
        <div className={'flex flex-row items-center justify-between'}>
          <h1 className={'text-xl font-bold'}>{componentDoc?.title}</h1>
          {componentDoc?.sourceLink ? (
            <a target={'_blank'} href={componentDoc?.sourceLink} rel="noreferrer">
              View source on GitHub
            </a>
          ) : (
            <div />
          )}
        </div>
        <p className={''}>{componentDoc?.description}</p>
      </div>
      <MdxComponent components={components} />
      <p>
        <a className={'link'} target={'_blank'} href={componentDoc?.docsLink} rel="noreferrer">
          编辑这个页面
        </a>
      </p>
    </article>
  );
};

export default View;
