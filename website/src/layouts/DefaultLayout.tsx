import { twClsx } from '@agile-ui/react';
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
        label: 'Spinner',
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
      <header className={'sticky top-0 z-40 w-full border-b border-gray-200 bg-white'}>
        <div className={'container mx-auto my-0 flex h-16 justify-between'}>
          <div className={'flex h-full w-52 items-center px-3'}>
            <img className={'inline-block w-9 align-middle'} alt={'Agile UI'} src={LogoImage} />
            <span className={'ml-1.5 inline-block align-middle font-mono font-bold text-[20px]'}>Agile UI</span>
          </div>
          <div className={'flex'}>1233</div>
        </div>
      </header>
      <div className={'container mx-auto'}>
        <aside
          className={
            'fixed z-20 w-52 overflow-y-hidden hover:overflow-y-auto h-full pb-10 scrollbar scrollbar-thin scrollbar-thumb-rounded-sm scrollbar-thumb-gray-300'
          }
        >
          <div className={'px-3 py-3'}>
            <ul className={'space-y-3'}>
              {navMenus.map((menu) => (
                <li key={menu.label}>
                  <h5 className={'font-medium mb-3'}>
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
                                'block -ml-px border-l border-transparent pl-4',
                                isActive
                                  ? 'text-blue-700 border-l-blue-600'
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
          </div>
        </aside>
        <section className={'ml-52'}>
          <div className={'w-full p-5'}>
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </div>
          <footer className={'border-t border-t-gray-200 bg-white p-3 text-gray-600'}>
            <div className={'flex justify-between text-sm'}>
              <div>2022 © Agile.</div>
              <div>Design & Develop by Huijie.</div>
            </div>
          </footer>
        </section>
      </div>
    </>
  );
};
