import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LogoImage from '../assets/images/logo.png';

export const DefaultLayout = () => {
  return (
    <div className={'container'}>
      <header className={'fixed inset-x-0 top-0 z-50 border-b border-b-gray-200 bg-white'}>
        <div className={'mx-auto my-0 flex h-16 items-center justify-between'}>
          <div className={'flex'}>
            <div className={'w-52 border-r-black bg-black py-0 px-3 align-middle text-white'}>
              <img className={'inline-block w-12 align-middle'} alt={'Agile UI'} src={LogoImage} />
              <span className={'ml-1 inline-block align-middle text-xl'}>Agile UI</span>
            </div>
            <button className={'h-16'}></button>
          </div>
          <div className={'flex'}></div>
        </div>
      </header>
      <aside className={'fixed bottom-0 top-16 z-50 w-52 border-r border-r-black bg-black text-white'}>Aside</aside>
      <section className={'ml-52 overflow-hidden'}>
        <div className={'pt-20 pb-16'}>
          <div className={'w-full'}>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </div>
        </div>
        <footer className={'absolute bottom-0 right-0 left-52 border-t border-t-gray-200 bg-white p-3 text-gray-600'}>
          <div className={'flex justify-between text-base'}>
            <div>2022 © Agile.</div>
            <div>Design & Develop by Huijie.</div>
          </div>
        </footer>
      </section>
    </div>
  );
};
