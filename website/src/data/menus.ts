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
            label: '按钮 Button',
            path: '/components/button',
          },
          {
            label: '图标 Icon',
            path: '/components/icon',
          },
          {
            label: '图片 Image',
            path: '/components/image',
          },
          {
            label: '排版 Typography',
            path: '/components/typography',
          },
        ],
      },
      {
        label: '布局',
        children: [
          {
            label: '布局 Layout',
            path: '/components/layout',
          },
          {
            label: '弹性布局 Flex',
            path: '/components/flex',
          },
          {
            label: '网格 Grid',
            path: '/components/grid',
          },
          {
            label: '表格 Table',
            path: '/components/table',
          },
          {
            label: '分割线 Divider',
            path: '/components/divider',
          },
        ],
      },
      {
        label: '数据展示',
        children: [
          {
            label: '头像 Avatar',
            path: '/components/avatar',
          },
          {
            label: '徽标 Badge',
            path: '/components/badge',
          },
        ],
      },
      {
        label: '数据输入',
        children: [
          {
            label: '输入框 Input',
            path: '/components/input',
          },
          {
            label: '数字输入框 NumberInput',
            path: '/components/number-input',
          },
          {
            label: '选择器 Select',
            path: '/components/select',
          },
          {
            label: '滑动输入条 Slider',
            path: '/components/slider',
          },
          {
            label: '复选框 Checkbox',
            path: '/components/checkbox',
          },
          {
            label: '单选框 Radio',
            path: '/components/radio',
          },
          {
            label: '开关 Switch',
            path: '/components/switch',
          },
        ],
      },
      {
        label: '交互反馈',
        children: [
          {
            label: '警告框 Alert',
            path: '/components/alert',
          },
          {
            label: '通知提醒 Toast',
            path: '/components/toast',
          },
          {
            label: '工具提示 Tooltip',
            path: '/components/tooltip',
          },
          {
            label: '弹出框 Popover',
            path: '/components/popover',
          },
          {
            label: '模态框 Modal',
            path: '/components/modal',
          },
          {
            label: '抽屉 Drawer',
            path: '/components/drawer',
          },
          {
            label: '进度条 ProgressBar',
            path: '/components/progress-bar',
          },
          {
            label: '加载中 Spinner',
            path: '/components/spinner',
          },
          {
            label: '覆盖层 Overlay',
            path: '/components/overlay',
          },
          {
            label: '覆盖层加载 SpinnerOverlay',
            path: '/components/spinner-overlay',
          },
        ],
      },
      {
        label: '页面导航',
        children: [
          {
            label: '面包屑 Breadcrumb',
            path: '/components/breadcrumb',
          },
          {
            label: '分页 Pagination',
            path: '/components/pagination',
          },
          {
            label: '下拉菜单 DropdownMenu',
            path: '/components/dropdown-menu',
          },
          {
            label: '右键菜单 ContextMenu',
            path: '/components/context-menu',
          },
        ],
      },
    ],
  },
];
