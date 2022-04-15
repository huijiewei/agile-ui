import { Layout, LayoutAside, LayoutContent, LayoutHeader } from '@agile-ui/react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const DefaultLayout = () => {
  return (
    <div className={'container'}>
      <header className={'fixed top-0 left-0 right-0 z-50 bg-white border-b border-b-gray-200'}>
        <div className={'flex justify-between items-center mx-auto my-0 h-16'}>
          <div className={'flex'}>
            <div className={'bg-black border-r-black w-52 text-white py-0 px-3 align-middle'}>
              <img
                className={'w-12 align-middle inline-block'}
                alt={'Agile UI'}
                src={require('../assets/images/logo.png')}
              />
              <span className={'align-middle text-xl inline-block ml-1'}>Agile UI</span>
            </div>
            <button className={'h-16'}></button>
          </div>
          <div className={'flex'}></div>
        </div>
      </header>
      <aside className={'w-52 z-50 bottom-0 border-r border-r-black bg-black fixed top-16 text-white'}>Aside</aside>
      <section className={'overflow-hidden ml-52'}>
        <div className={'pt-20 pb-16'}>
          <div className={'w-full'}>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </div>
        </div>
        <footer
          className={'bottom-0 py-3 px-3 absolute right-0 left-52 text-gray-600 bg-white border-t border-t-gray-200'}
        >
          <div className={'flex text-base justify-between'}>
            <div>2022 © Agile.</div>
            <div>Design & Develop by Huijie.</div>
          </div>
        </footer>
      </section>
    </div>
  );
};
