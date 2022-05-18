import { Edit, Github } from '@icon-park/react';
import { Component } from 'contentlayer/generated';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Image500 from '../../assets/images/500.png';
import { Error } from '../../components/error/Error';
import { components, getMdxComponent } from '../../components/mdx/MdxComponent';
import { MdxTableContent } from '../../components/mdx/MdxTableContent';
import { camelCase } from '../../utils/string';

const View = () => {
  const component = camelCase(useParams().component || '');

  const [error, setError] = useState<boolean>();
  const [componentDoc, setComponentDoc] = useState<Component>();

  useEffect(() => {
    import(
      /* webpackChunkName: 'docs_[index]' */ `contentlayer/generated/Component/components__${component}.mdx.json`,
      {
        assert: { type: 'json' },
      }
    )
      .then((doc) => {
        setError(false);
        setComponentDoc(doc.default);
      })
      .catch(() => {
        setError(true);
        setComponentDoc(undefined);
      });
  }, [component]);

  const MdxComponent = useMemo(() => {
    if (!componentDoc) {
      return null;
    }

    return getMdxComponent(componentDoc.body.code, {
      componentProps: componentDoc.props,
    });
  }, [componentDoc]);

  if (error) {
    return (
      <Error title={'组件文档不存在'}>
        <img className={'w-[320px] items-center'} src={Image500} alt={'组件文档不存在'}></img>
      </Error>
    );
  }

  if (MdxComponent == null) {
    return null;
  }

  return (
    <div className={'relative max-w-[52rem]'}>
      <article className={'mdx-content flex flex-col gap-5'}>
        <div className={'flex flex-col gap-5'}>
          <div className={'flex flex-row items-center justify-between'}>
            <h1 className={'text-xl font-bold'}>{componentDoc?.title}</h1>
            {componentDoc?.sourceLink ? (
              <a
                className={'inline-flex flex-row items-center'}
                target={'_blank'}
                href={componentDoc?.sourceLink}
                rel="noreferrer"
              >
                <Github className={'mr-1'} />
                查看源代码
              </a>
            ) : (
              <div />
            )}
          </div>
          <p className={''}>{componentDoc?.description}</p>
        </div>
        <MdxComponent components={components} />
        <p>
          <a
            className={'inline-flex flex-row items-center'}
            target={'_blank'}
            href={componentDoc?.docsLink}
            rel="noreferrer"
          >
            <Edit className={'mr-1'} />
            编辑这个页面
          </a>
        </p>
      </article>
      <div
        className={'fixed top-20 bottom-0 right-[max(0px,calc(50%-40rem))] z-20 hidden w-40 laptop:z-50 laptop:block'}
      >
        <MdxTableContent headings={componentDoc?.headings} />
      </div>
    </div>
  );
};

export default View;
