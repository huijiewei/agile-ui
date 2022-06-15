import { NavLink } from 'react-router-dom';
import { tx } from 'twind';
import { useLayerDispatch } from './DefaultLayout';

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
      {
        label: '覆盖层',
        path: '/components/overlay',
      },
      {
        label: '工具提示',
        path: '/components/tooltip',
      },
    ],
  },
];

export const LayoutNavMenu = () => {
  const layerDispatch = useLayerDispatch();

  return (
    <nav className={'relative'}>
      <ul className={'space-y-3 p-5'}>
        {navMenus.map((menu) => (
          <li key={menu.label}>
            <h5 className={'mb-3 font-medium'}>
              {menu.path ? (
                <NavLink
                  className={({ isActive }) => {
                    return tx('hover:text-gray-700', isActive && 'text-blue-700');
                  }}
                  onClick={() => layerDispatch(false)}
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
                        return tx(
                          '-ml-px block border-l border-transparent pl-4',
                          isActive
                            ? 'border-l-blue-600 text-blue-700'
                            : 'text-gray-700 hover:border-l-gray-400 hover:text-gray-900'
                        );
                      }}
                      onClick={() => layerDispatch(false)}
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
  );
};
