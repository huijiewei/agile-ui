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
        <div className={'flex h-[calc(100vh-12em)] flex-col justify-center items-center'}>
          <p
            className={
              'text-[5em] leading-normal font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400'
            }
          >
            Agile UI
          </p>
          <div className={'mt-10 text-lg leading-9 text-center'}>
            <p>一个灵活的 React 18 组件库</p>
            <p className={'font-bold'}>基于 Tailwind CSS, Twind CSS-IN-JSS 方案, 自动黑色模式</p>
            <p>更多特点待你发现...</p>
          </div>
          <p className={'flex flex-row gap-9 mt-10'}>
            <Link
              className={
                'inline-flex transition-colors gap-2 items-center text-lg rounded justify-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white h-12 w-32'
              }
              to={'/start'}
            >
              快速开始
              <ArrowRight />
            </Link>
            <a
              className={
                'inline-flex gap-2 transition-colors items-center text-lg rounded justify-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 h-12 w-32'
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
      <footer className={'py-5 border-gray-100 border-t-1 gap-2 flex flex-col text-center items-center'}>
        <p className={'bg-gray-800 w-fit rounded text-white font-medium text-sm px-3 py-1'}>
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
