import { Edit } from '@agile-ui/react-icons';
import { pascalCase, to } from '@agile-ui/utils';
import type { MDXContent } from 'mdx/types';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Image404 from '../../assets/images/404.png';
import { MdxToc } from '../../components/mdx/MdxToc';
import type { Toc } from '../../components/mdx/MdxToc';
import { ErrorAlert } from '../../components/shared/ErrorAlert';
import { LazyLoader } from '../../components/shared/LazyLoader';
import { components } from '../../data/components';

type Mdx = {
  title?: string;
  description?: string;
  documentLink: string;
  default: MDXContent;
  toc: Toc[];
};

const githubUrl = 'https://github.com/huijiewei/agile-ui/blob/main';

export const DocumentView = () => {
  const documentName = pascalCase(useParams().document || '');

  const [mdx, setMdx] = useState<Mdx | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const [error, mdx] = await to(import(`../../docs/documents/${documentName}.mdx`));

      if (!mounted) {
        return;
      }

      if (error) {
        setError(true);
      }

      if (mdx) {
        setMdx({
          ...mdx,
          documentLink: `${githubUrl}/website/src/docs/documents/${documentName}.mdx`,
        });
      }
    })();

    return () => {
      mounted = false;
      setMdx(null);
      setError(false);
    };
  }, [documentName]);

  if (error) {
    return (
      <>
        <Helmet title={'文档不存在'}></Helmet>
        <ErrorAlert title={`文档不存在`}>
          <img className={'w-[320px] aspect-[3/2] items-center'} src={Image404} alt={'文档不存在'}></img>
        </ErrorAlert>
      </>
    );
  }

  if (mdx == null) {
    return <LazyLoader className={'h-96'}></LazyLoader>;
  }

  return (
    <>
      <Helmet title={`${mdx.title}`}></Helmet>
      <div className={'relative laptop:mr-44'}>
        <article className={'flex flex-col gap-5'}>
          <div className={'flex flex-row items-center justify-between'}>
            <h1 className={'text-xl font-bold'}>{mdx.title}</h1>
          </div>
          <p>{mdx.description}</p>
          {mdx.default({ components })}
          <p>
            <a
              className={'inline-flex flex-row items-center hover:(underline underline-offset-2)'}
              target={'_blank'}
              href={mdx.documentLink}
              rel="noreferrer"
            >
              <Edit className={'mr-1'} />
              建议更改此页面
            </a>
          </p>
        </article>
        <nav
          className={'laptop:z-50 laptop:block fixed top-20 bottom-0 right-[max(0px,calc(50%-40rem))] z-20 hidden w-40'}
        >
          <MdxToc toc={mdx.toc}></MdxToc>
        </nav>
      </div>
    </>
  );
};

export default DocumentView;
