import { Edit, Github } from '@agile-ui/react-icons';
import { kebabCase, pascalCase } from '@agile-ui/utils';
import type { MDXContent } from 'mdx/types';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { cx } from 'twind';
import Image500 from '../../assets/images/500.png';
import { Error } from '../../components/error/Error';
import { Loader } from '../../components/loader/Loader';
import { components } from '../../data/components';

type Mdx = {
  title?: string;
  description?: string;
  sourceLink: string;
  documentLink: string;
  Component: MDXContent;
};

const githubUrl = 'https://github.com/huijiewei/agile-solid/blob/main';

const View = () => {
  const component = pascalCase(useParams().component || '');

  const [mdx, setMdx] = useState<Mdx>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const componentName = pascalCase(component);
    const componentSlug = kebabCase(componentName);

    import(`../../docs/components/${componentName}.mdx`)
      .then((mdx) => {
        setMdx({
          title: mdx.title,
          description: mdx.description,
          sourceLink: `${githubUrl}/packages/react/src/${componentSlug}/${componentName}.tsx`,
          documentLink: `${githubUrl}/website/src/docs/components/${componentName}.mdx`,
          Component: mdx.default,
        });
        setError(false);
      })
      .catch((reason) => {
        console.log(reason);
        setError(true);
      });

    return () => {
      setMdx(undefined);
      setError(false);
    };
  }, [component]);

  if (error) {
    return (
      <>
        <Helmet title={'文档不存在'}></Helmet>
        <Error title={`组件文档不存在`}>
          <img className={'w-[320px] aspect-[3/2] items-center'} src={Image500} alt={`组件文档不存在`}></img>
        </Error>
      </>
    );
  }

  if (!mdx) {
    return <Loader className={'h-96'}></Loader>;
  }

  return (
    <>
      <Helmet title={mdx.title}></Helmet>
      <div className={'relative laptop:mr-44'}>
        <article
          className={cx(
            'flex flex-col gap-5',
            '&>h2:scroll-mt-[6rem] &>h3:scroll-mt-6 &>h4:scroll-mt-6',
            '&>h2>a:(opacity-0 text-green-600 ml-2 transition-opacity) &>h3>a:(opacity-0 text-green-600 ml-2 transition-opacity) &>h4>a:(opacity-0 text-green-600 ml-2 transition-opacity)',
            '&>h2:hover:&>a:opacity-100 &>h3:hover&>a:opacity-100 &>h4:hover&>a:group-hover:opacity-100',
            '&>h2>a:before:content-["#"] &>h3>a:before:content-["#"] &>h4>a:before:content-["#"]'
          )}
        >
          <div className={'flex flex-row items-center justify-between'}>
            <h1 className={'text-xl font-bold'}>{mdx.title}</h1>
            <a className={'inline-flex flex-row items-center'} target={'_blank'} href={mdx.sourceLink} rel="noreferrer">
              <Github className={'mr-1'} />
              查看源代码
            </a>
          </div>
          <p>{mdx.description}</p>
          <mdx.Component components={components} />
          <p>
            <a
              className={'inline-flex flex-row items-center'}
              target={'_blank'}
              href={mdx.documentLink}
              rel="noreferrer"
            >
              <Edit className={'mr-1'} />
              编辑这个页面
            </a>
          </p>
        </article>
        <nav
          className={'laptop:z-50 laptop:block fixed top-20 bottom-0 right-[max(0px,calc(50%-40rem))] z-20 hidden w-40'}
        ></nav>
      </div>
    </>
  );
};

export default View;
