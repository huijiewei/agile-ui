import { useTimeout } from '@agile-ui/react-hooks';
import presetAgile from '@agile-ui/react/src/utils/twind';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetExt from '@twind/preset-ext';
import presetTailwind from '@twind/preset-tailwind';
import { BrowserRouter } from 'react-router-dom';
import { injectGlobal, setup } from 'twind';
import { AppHelmet } from './AppHelmet';
import { AppRoutes } from './routes';

setup({
  presets: [presetAutoprefix(), presetExt(), presetTailwind(), presetAgile()],
  rules: [
    [
      'bg-gradient-radial-dot',
      { backgroundImage: 'radial-gradient(circle, var(--tw-gradient-from) 1px, var(--tw-gradient-to) 1px)' },
    ],
  ],
});

injectGlobal`
body {
    @apply antialiased overflow-y-scroll &::-webkit-scrollbar:(w-[12px] h-[12px]) &::-webkit-scrollbar-thumb:(border-([3px] solid transparent) bg-clip-padding bg-gray-300);
}
`;

export const App = () => {
  useTimeout(() => {
    document.getElementById('splash')?.remove();
  }, 500);

  return (
    <BrowserRouter>
      <AppHelmet />
      <AppRoutes />
    </BrowserRouter>
  );
};
