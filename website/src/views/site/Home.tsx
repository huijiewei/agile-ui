import { ArrowRight, Github } from '@agile-ui/react-icons';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLayoutAsideExistedDispatch } from '../../components/layout/LayoutProvider';

const Home = () => {
  const dispatch = useLayoutAsideExistedDispatch();

  useEffect(() => {
    dispatch && dispatch(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className={'px-3'}>
        <div className={'flex h-[calc(100vh-12em)] flex-col items-center justify-center'}>
          <p
            className={
              'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 bg-clip-text text-[5em] font-bold leading-normal text-transparent'
            }
          >
            Agile UI
          </p>
          <div className={'mt-10 text-center text-lg leading-9'}>
            <p>一个灵活的 React 18 组件库</p>
            <p className={'font-bold'}>基于 Tailwind CSS, Twind CSS-IN-JSS 方案, 自动黑色模式</p>
            <p>更多特点待你发现...</p>
          </div>
          <p className={'mt-10 flex flex-row gap-9'}>
            <Link
              className={
                'inline-flex h-12 w-32 items-center justify-center gap-2 rounded bg-blue-500 text-lg text-white transition-colors hover:bg-blue-600 active:bg-blue-700'
              }
              to={'/start'}
            >
              快速开始
              <ArrowRight />
            </Link>
            <a
              className={
                'inline-flex h-12 w-32 items-center justify-center gap-2 rounded bg-gray-100 text-lg transition-colors hover:bg-gray-200 active:bg-gray-300'
              }
              target={'_blank'}
              rel="noopener noreferrer"
              href="https://github.com/huijiewei/agile-ui"
            >
              <Github />
              GitHub
            </a>
          </p>
        </div>
      </main>
      <footer className={'border-t-1 flex flex-col items-center gap-2 border-gray-100 py-5 text-center'}>
        <p className={'w-fit rounded bg-gray-800 px-3 py-1 text-sm font-medium text-white'}>
          Deployed by{' '}
          <span aria-label={'Vercel logo'} role={'img'}>
            ▲
          </span>{' '}
          Vercel
        </p>
        <p>根据 MIT 许可证发布</p>
        <p>
          Proudly made in
          <span className={'mx-1'} aria-label="China" role="img">
            🇨🇳
          </span>
          by Huijie, 2022
        </p>
      </footer>
    </>
  );
};

export default Home;
