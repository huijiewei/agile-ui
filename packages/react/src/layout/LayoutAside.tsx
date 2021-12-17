import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { useMemo } from 'react';
import { createContext } from '../utils/context';
import { polymorphicComponent } from '../utils/polymorphic';
import { layoutAsideClass, layoutVars } from './Layout.css';

type LayoutAsideContextValue = {
  collapsed: boolean;
  collapsedWidth: number;
};

const [LayoutAsideContextProvider, useLayoutAside] = createContext<LayoutAsideContextValue>({
  strict: true,
  name: 'LayoutAsideContext',
});

export { useLayoutAside };

type LayoutAsideProps = LayoutAsideContextValue & {
  width: number;
};

export const LayoutAside = polymorphicComponent<'aside', LayoutAsideProps>((props, ref) => {
  const { as: Component = 'aside', width, collapsed, collapsedWidth, className, children, style, ...rest } = props;

  const layoutAsideContextValue = useMemo(() => ({ collapsed, collapsedWidth }), [collapsed, collapsedWidth]);

  return (
    <LayoutAsideContextProvider value={layoutAsideContextValue}>
      <Component
        {...rest}
        style={{ ...assignInlineVars({ [layoutVars.aside.width]: width + 'px' }), ...style }}
        className={clsx(className, layoutAsideClass)}
        ref={ref}
      >
        {children}
      </Component>
    </LayoutAsideContextProvider>
  );
});
