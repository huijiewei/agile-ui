import { createContext } from '../utils/context';

type DrawerContextValue = {
  placement: 'left' | 'right' | 'bottom' | 'top';
};

const [DrawerProvider, useDrawer] = createContext<DrawerContextValue>({
  strict: true,
  name: 'DrawerContext',
});

export { DrawerProvider, useDrawer };
