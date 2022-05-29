import { sleep, to } from '@agile-ui/utils';
import { Edit, Github } from '@icon-park/react';
import type { Component } from 'contentlayer/generated';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { tw, tx } from 'twind';
import Image500 from '../../assets/images/500.png';
import { Error } from '../../components/error/Error';
import { Loader } from '../../components/loader/Loader';
import { components, getMdxComponent } from '../../components/mdx/MdxComponent';
import { MdxTableContent } from '../../components/mdx/MdxTableContent';
import { camelCase } from '../../utils/string';

const ViewError = () => {
  return (
    <>
      <Helmet title={'文档不存在'}></Helmet>
      <Error title={`组件文档不存在`}>
        <img className={'w-[320px] items-center'} src={Image500} alt={`组件文档不存在`}></img>
      </Error>
    </>
  );
};

const ViewComponent = ({ componentDoc }: { componentDoc: Component | null }) => {
  const MdxComponent = useMemo(() => {
    if (!componentDoc) {
      return null;
    }

    return getMdxComponent(componentDoc.body.code, {
      componentProps: componentDoc.props,
    });
  }, [componentDoc]);

  return componentDoc ? (
    <>
      <Helmet title={componentDoc?.title}></Helmet>
      <div className={'relative max-w-[52rem]'}>
        <article
          className={tx(
            'flex flex-col gap-5',
            '&>h2:scroll-mt-[6rem] &>h3:scroll-mt-6 &>h4:scroll-mt-6',
            '&>h2>a:(opacity-0 text-green-600 ml-2 transition-opacity) &>h3>a:(opacity-0 text-green-600 ml-2 transition-opacity) &>h4>a:(opacity-0 text-green-600 ml-2 transition-opacity)',
            '&>h2:hover:&>a:opacity-100 &>h3:hover&>a:opacity-100 &>h4:hover&>a:group-hover:opacity-100',
            '&>h2>a:before:content-["#"] &>h3>a:before:content-["#"] &>h4>a:before:content-["#"]'
          )}
        >
          <div className={tw('flex flex-row items-center justify-between')}>
            <h1 className={tw('text-xl font-bold')}>{componentDoc?.title}</h1>
            {componentDoc?.sourceLink ? (
              <a
                className={tw('inline-flex flex-row items-center')}
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
          {MdxComponent && <MdxComponent components={components} />}
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
          className={'laptop:z-50 laptop:block fixed top-20 bottom-0 right-[max(0px,calc(50%-40rem))] z-20 hidden w-40'}
        >
          <MdxTableContent headings={componentDoc?.headings} />
        </div>
      </div>
    </>
  ) : (
    <Loader className={'h-72'} />
  );
};

const View = () => {
  const component = camelCase(useParams().component || '');

  const [error, setError] = useState<boolean>(false);
  const [componentDoc, setComponentDoc] = useState<Component | null>(null);

  useEffect(() => {
    let isActive = true;

    (async () => {
      const [error, doc] = await to(
        import(
          /* webpackChunkName: 'docs_[index]' */ `contentlayer/generated/Component/components__${component}.mdx.json`,
          { assert: { type: 'json' } }
        )
      );

      if (!isActive) {
        return;
      }

      if (error) {
        setError(true);
      }

      if (doc) {
        setComponentDoc(doc.default);
      }
    })();

    return () => {
      isActive = false;
      setError(false);
      setComponentDoc(null);
    };
  }, [component]);

  return error ? <ViewError /> : <ViewComponent componentDoc={componentDoc} />;
};

export default View;
