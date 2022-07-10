export type Menu = {
  label: string;
  path?: string;
  children?: Menu[];
};

export const menus: Menu[] = [
  {
    label: '开发指南',
    children: [
      {
        label: '快速开始',
        path: '/start',
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
        label: '通用',
        children: [
          {
            label: '按钮',
            path: '/components/button',
          },
          {
            label: '图标',
            path: '/components/icon',
          },
          {
            label: '排版',
            path: '/components/typography',
          },
        ],
      },
      {
        label: '布局',
        children: [
          {
            label: '布局',
            path: '/components/layout',
          },
          {
            label: '表格',
            path: '/components/table',
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
        ],
      },
      {
        label: '数据展示',
        children: [
          {
            label: '头像',
            path: '/components/avatar',
          },
          {
            label: '徽标',
            path: '/components/badge',
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
            label: '日历',
            path: '/components/calendar',
          },
        ],
      },
      {
        label: '数据输入',
        children: [
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
        ],
      },
      {
        label: '交互反馈',
        children: [
          {
            label: '警告框',
            path: '/components/alert',
          },
          {
            label: '通知提醒',
            path: '/components/toast',
          },
          {
            label: '工具提示',
            path: '/components/tooltip',
          },
          {
            label: '进度条',
            path: '/components/progress-bar',
          },
          {
            label: '加载中',
            path: '/components/spinner',
          },
          {
            label: '覆盖层',
            path: '/components/overlay',
          },
          {
            label: '覆盖层加载',
            path: '/components/spinner-overlay',
          },
        ],
      },
      {
        label: '页面导航',
        children: [
          {
            label: '面包屑',
            path: '/components/breadcrumb',
          },
          {
            label: '菜单',
            path: '/components/menu',
          },
          {
            label: '步骤',
            path: '/components/steps',
          },
          {
            label: '标签页',
            path: '/components/tab',
          },
        ],
      },
    ],
  },
];
