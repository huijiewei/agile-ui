import LogoImage from '../../assets/images/logo.svg';
import { badges } from '../../data/badges';

const Home = () => {
  return (
    <>
      <div className={'flex flex-col gap-3'}>
        <h1 className={'text-[36px] font-bold text-sky-600 text-center'}>
          <img
            width={'50'}
            height={'50'}
            className={'inline-block align-middle -mt-[3px] mb-[3px]'}
            alt={'Agile UI'}
            src={LogoImage}
          />{' '}
          Agile UI
        </h1>
        <p className={'text-center text-lg'}>React + TypeScript + Twind UI Components</p>
        <hr />
        {badges.map((group, idx) => (
          <p key={`bg-${idx}`} className={'flex flex-row gap-1 justify-center'}>
            {group.map((badge) => (
              <a key={badge.name} target={'_blank'} href={badge.href} rel="noreferrer">
                <img
                  width={badge.width}
                  height={badge.height}
                  loading={'lazy'}
                  alt={badge.name}
                  src={badge.image}
                  srcSet={`${badge.image} 2x`}
                />
              </a>
            ))}
          </p>
        ))}
        <hr />
        <h2 className={'text-lg font-bold'}>特点</h2>
        <ul className={'list-disc px-5'}>
          <li>React 18 - 用于构建用户界面的JavaScript 库。</li>
          <li>Tailwind CSS 3 - 一个功能类优先的CSS 框架，用于快速构建定制的用户界面。</li>
          <li>Twind - 最小、最快、功能最完整的 tailwind-in-js 解决方案</li>
          <li>Vite - 下一代的前端工具链，为开发提供极速响应。</li>
          <li>Typescript - TypeScript 是具有类型语法的 JavaScript。</li>
          <li>ESLint - ESLint 静态分析你的代码以快速发现问题。</li>
          <li>Prettier - 一个“有态度”的代码格式化工具</li>
          <li>Husky & Lint Staged - 在提交暂存文件之前，运行脚本</li>
        </ul>
        <hr />
        <p
          className={
            'p-2 pl-3 font-bold border-l-2 border-l-yellow-300 bg-yellow-50 dark:(border-l-yellow-800 bg-yellow-800/30)'
          }
        >
          正在开发中, 目前仅供参考学习!
        </p>
        <p></p>
      </div>
    </>
  );
};

export default Home;
