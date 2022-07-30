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
        label: '主题指南',
        path: '/theme',
      },
      {
        label: '暗黑模式',
        path: '/dark-mode',
      },
      {
        label: '动画效果',
        path: '/animation',
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
            label: '图片',
            path: '/components/image',
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
            label: '栅格',
            path: '/components/grid',
          },
          {
            label: '表格',
            path: '/components/table',
          },
          {
            label: '分割线',
            path: '/components/divider',
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
            label: '数字输入框',
            path: '/components/number-input',
          },
          {
            label: '选择器',
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
            label: '开关',
            path: '/components/switch',
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
            label: '弹出框',
            path: '/components/popover',
          },
          {
            label: '模态框',
            path: '/components/modal',
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
            label: '下拉菜单',
            path: '/components/dropdown-menu',
          },
          {
            label: '右键菜单',
            path: '/components/context-menu',
          },
        ],
      },
    ],
  },
];
