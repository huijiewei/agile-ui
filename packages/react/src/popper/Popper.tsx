import { useIsomorphicLayoutEffect, useMergedRefs } from '@agile-ui/react-hooks';
import type { Placement } from '@floating-ui/react-dom';
import { useFloating, arrow, shift, flip, offset, autoUpdate } from '@floating-ui/react-dom';
import { PropsWithChildren, useMemo, useRef, useState } from 'react';
import { PopperProvider } from './PopperContext';

export type PopperProps = {
  placement?: Placement;
};

export const Popper = (props: PropsWithChildren<PopperProps>) => {
  const { children, placement = 'bottom' } = props;

  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  const anchorRef = useRef<HTMLElement>(null);
  const arrowRef = useRef();

  const [arrowElem, setArrow] = useState<HTMLSpanElement | null>(null);
  const [arrowSize, setArrowSize] = useState(0);

  const middleware = [];
  middleware.push(flip());
  middleware.push(shift());

  if (arrowElem) {
    middleware.push(arrow({ element: arrowElem }));
  }

  if (arrowSize) {
    middleware.push(offset(arrowSize));
  }

  const floating = useFloating({
    placement,
    middleware,
    whileElementsMounted: autoUpdate,
  });

  const { middlewareData } = floating;

  const arrowRefs = useMergedRefs(arrowRef, setArrow);

  useIsomorphicLayoutEffect(() => {
    floating.reference(anchorRef.current);
  }, [anchorRef]);

  const arrowStyle = useMemo(() => {
    return middlewareData.arrow;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(middlewareData.arrow || {})]);

  return (
    <PopperProvider
      value={{ anchorRef, arrowRef: arrowRefs, arrowSize: setArrowSize, arrowStyle, mounted, ...floating }}
    >
      {children}
    </PopperProvider>
  );
};
