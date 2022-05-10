import { Tooltip, twClsx, VisuallyHidden } from '@agile-ui/react';
import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import LogoImage from '../assets/images/logo.png';

const navMenus = [
  {
    label: '主页',
    path: '/home',
  },
  {
    label: '开始',
    children: [
      {
        label: '安装',
        path: '/install',
      },
      {
        label: '介绍',
        path: '/about',
      },
      {
        label: '联系',
        path: '/contact',
      },
    ],
  },
  {
    label: '组件',
    children: [
      {
        label: '按钮',
        path: '/components/button',
      },
      {
        label: '加载中',
        path: '/components/spinner',
      },
      {
        label: '输入框',
        path: '/components/input',
      },
      {
        label: '选择框',
        path: '/components/select',
      },
      {
        label: '复选框',
        path: '/components/checkbox',
      },
      {
        label: '单选框',
        path: '/components/radio',
      },
      {
        label: '链接',
        path: '/components/link',
      },
      {
        label: '导航',
        path: '/components/nav',
      },
      {
        label: '菜单',
        path: '/components/menu',
      },
      {
        label: '布局',
        path: '/components/layout',
      },
      {
        label: '表格',
        path: '/components/table',
      },
      {
        label: '排版',
        path: '/components/typography',
      },
      {
        label: '分割线',
        path: '/components/divider',
      },
      {
        label: '栅格',
        path: '/components/grid',
      },
      {
        label: '间距',
        path: '/components/spacing',
      },
      {
        label: '头像',
        path: '/components/avatar',
      },
      {
        label: '徽标',
        path: '/components/tag',
      },
      {
        label: '日历',
        path: '/components/calendar',
      },
      {
        label: '卡片',
        path: '/components/card',
      },
      {
        label: '图片轮播',
        path: '/components/carousel',
      },
      {
        label: '折叠面板',
        path: '/components/accordion',
      },
      {
        label: '评论',
        path: '/components/comment',
      },
      {
        label: '描述',
        path: '/components/description',
      },
      {
        label: '图片',
        path: '/components/image',
      },
      {
        label: '空状态',
        path: '/components/empty',
      },
      {
        label: '列表',
        path: '/components/list',
      },
      {
        label: '气泡卡片',
        path: '/components/popover',
      },
      {
        label: '数值显示',
        path: '/components/number',
      },
      {
        label: '标签',
        path: '/components/label',
      },
      {
        label: '标签页',
        path: '/components/tab',
      },
    ],
  },
];

export const DefaultLayout = () => {
  return (
    <>
      <header
        className={
          'sticky top-0 z-30 w-full flex-none border-b border-slate-200 bg-white bg-opacity-90 py-3 backdrop-blur laptop:z-50'
        }
      >
        <div className={'mx-auto flex max-w-7xl justify-between px-5'}>
          <div className={'flex h-full items-center'}>
            <img className={'inline-block w-9 align-middle'} alt={'Agile UI'} src={LogoImage} />
            <span className={'ml-1.5 inline-block align-middle text-[20px] font-bold'}>Agile UI</span>
          </div>
          <div className={'flex items-center'}>
            <Tooltip placement={'bottom'} content={'Github 上的 Agile UI'}>
              <a
                className={'block text-slate-500 hover:text-slate-700'}
                rel="noreferrer"
                href="https://github.com/huijiewei/agile-ui"
                target="_blank"
              >
                <VisuallyHidden>Github 上的 Agile UI</VisuallyHidden>
                <svg viewBox="0 0 16 16" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
              </a>
            </Tooltip>
          </div>
        </div>
      </header>
      <div>
        <div className={'mx-auto max-w-7xl'}>
          <aside className={'hidden scrollbar scrollbar-thin scrollbar-thumb-gray-300 laptop:block'}>
            <nav className={'fixed bottom-0 top-[3.8125rem] w-52 overflow-hidden hover:overflow-y-auto '}>
              <ul className={'relative space-y-3 p-5'}>
                {navMenus.map((menu) => (
                  <li key={menu.label}>
                    <h5 className={'mb-3 font-medium'}>
                      {menu.path ? (
                        <NavLink
                          className={({ isActive }) => {
                            return twClsx('hover:text-gray-700', isActive && 'text-blue-700');
                          }}
                          to={menu.path}
                        >
                          {menu.label}
                        </NavLink>
                      ) : (
                        menu.label
                      )}
                    </h5>
                    {menu.children && (
                      <ul className={'space-y-2 border-l border-l-gray-100'}>
                        {menu.children.map((child) => (
                          <li key={child.label}>
                            <NavLink
                              className={({ isActive }) => {
                                return twClsx(
                                  '-ml-px block border-l border-transparent pl-4',
                                  isActive
                                    ? 'border-l-blue-600 text-blue-700'
                                    : 'text-gray-700 hover:border-l-gray-400 hover:text-gray-900'
                                );
                              }}
                              to={child.path}
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <div className={'laptop:pl-52'}>
            <main className={'mx-auto p-5'}>
              <Suspense fallback={null}>
                <Outlet />
              </Suspense>
            </main>
            <footer className={'border-t border-t-gray-200 bg-white p-3 text-gray-600'}>
              <div className={'flex justify-between text-sm'}>
                <div>2022 © Agile.</div>
                <div>Design & Develop by Huijie.</div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};
