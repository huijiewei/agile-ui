import {
  useCallbackRef,
  useDebounceCallback,
  useDirection,
  useMergedRef,
  useResizeObserver,
  useStateMachine,
} from '@agile-ui/react-hooks';
import { __DEV__, clamp, mergeEventHandlers } from '@agile-ui/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
  PointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Presence } from '../presence/Presence';
import { themeVars } from '../theme/styles/vars.css';
import { createContext } from '../utils/context';
import { polymorphicComponent } from '../utils/polymorphic';
import {
  displayAbsoluteClass,
  scrollAreaClass,
  scrollAreaContentClass,
  scrollAreaScrollbarClass,
  scrollAreaThumbClass,
  scrollAreaViewportClass,
  visibleHiddenClass,
  visibleVisibleClass,
} from './ScrollArea.css';

type Type = 'auto' | 'always' | 'scroll' | 'hover';
type Direction = 'ltr' | 'rtl';
type Orientation = 'vertical' | 'horizontal';
type Sizes = {
  content: number;
  viewport: number;
  scrollbar: {
    size: number;
    paddingStart: number;
    paddingEnd: number;
  };
};

type ScrollAreaContextValue = {
  type: Type;
  direction: Direction;
  scrollbarSize?: number;
  scrollHideDelay: number;
  scrollArea: HTMLDivElement | null;
  viewport: HTMLDivElement | null;
  onViewportChange(viewport: HTMLDivElement | null): void;
  content: HTMLDivElement | null;
  onContentChange(content: HTMLDivElement): void;
  scrollbarX: HTMLDivElement | null;
  onScrollbarXChange(scrollbar: HTMLDivElement | null): void;
  scrollbarXEnabled: boolean;
  onScrollbarXEnabledChange(rendered: boolean): void;
  scrollbarY: HTMLDivElement | null;
  onScrollbarYChange(scrollbar: HTMLDivElement | null): void;
  scrollbarYEnabled: boolean;
  onScrollbarYEnabledChange(rendered: boolean): void;
  onCornerWidthChange(width: number): void;
  onCornerHeightChange(height: number): void;
};

const [ScrollAreaProvider, useScrollArea] = createContext<ScrollAreaContextValue>({
  strict: true,
  name: 'ScrollAreaContext',
});

type ScrollAreaProps = {
  type?: Type;
  direction?: Direction;
  scrollbarSize?: number;
  scrollHideDelay?: number;
  viewportRef?: ForwardedRef<HTMLDivElement>;
};

export const ScrollArea = polymorphicComponent<'div', ScrollAreaProps>((props, ref) => {
  const {
    as: Component = 'div',
    type = 'hover',
    direction,
    className,
    children,
    scrollHideDelay = 900,
    style,
    ...rest
  } = props;

  const [scrollArea, setScrollArea] = useState<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  const [content, setContent] = useState<HTMLDivElement | null>(null);

  const [scrollbarX, setScrollbarX] = useState<HTMLDivElement | null>(null);
  const [scrollbarY, setScrollbarY] = useState<HTMLDivElement | null>(null);

  const [scrollbarXEnabled, setScrollbarXEnabled] = useState(false);
  const [scrollbarYEnabled, setScrollbarYEnabled] = useState(false);

  const [cornerWidth, setCornerWidth] = useState(0);
  const [cornerHeight, setCornerHeight] = useState(0);

  const computedDirection = useDirection(scrollArea, direction);

  const contextValue = useMemo(
    () => ({
      type,
      direction: computedDirection,
      scrollHideDelay,
      scrollArea,
      viewport,
      onViewportChange: setViewport,
      content,
      onContentChange: setContent,
      scrollbarX,
      onScrollbarXChange: setScrollbarX,
      scrollbarXEnabled,
      onScrollbarXEnabledChange: setScrollbarXEnabled,
      scrollbarY,
      onScrollbarYChange: setScrollbarY,
      scrollbarYEnabled,
      onScrollbarYEnabledChange: setScrollbarYEnabled,
      onCornerWidthChange: setCornerWidth,
      onCornerHeightChange: setCornerHeight,
    }),
    [
      computedDirection,
      content,
      scrollArea,
      scrollHideDelay,
      scrollbarX,
      scrollbarXEnabled,
      scrollbarY,
      scrollbarYEnabled,
      type,
      viewport,
    ]
  );

  return (
    <ScrollAreaProvider value={contextValue}>
      <Component
        {...rest}
        className={clsx(className, scrollAreaClass)}
        ref={useMergedRef(ref, (node) => setScrollArea(node))}
        style={{
          ...assignInlineVars({
            [themeVars.scrollArea.corner.width]: cornerWidth + 'px',
            [themeVars.scrollArea.corner.height]: cornerHeight + 'px',
          }),
          ...style,
        }}
      >
        <ScrollAreaViewport>{children}</ScrollAreaViewport>
        <ScrollAreaScrollbar
          className={scrollAreaScrollbarClass({ orientation: 'horizontal', direction: computedDirection })}
          orientation="horizontal"
        >
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaScrollbar
          className={scrollAreaScrollbarClass({ orientation: 'vertical', direction: computedDirection })}
          orientation="vertical"
        >
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </Component>
    </ScrollAreaProvider>
  );
});

type PrimitiveDivProps = ComponentPropsWithoutRef<'div'>;
type ScrollAreaViewportProps = PrimitiveDivProps;

const ScrollAreaViewport = forwardRef<HTMLDivElement, ScrollAreaViewportProps>((props, ref) => {
  const { children, ...rest } = props;
  const context = useScrollArea();
  const viewPortRef = useRef<HTMLDivElement>(null);
  const composedRefs = useMergedRef(ref, viewPortRef, context.onViewportChange);

  return (
    <div
      {...rest}
      className={scrollAreaViewportClass({
        scrollbarXEnabled: context.scrollbarXEnabled,
        scrollbarYEnabled: context.scrollbarYEnabled,
      })}
      ref={composedRefs}
    >
      <div ref={context.onContentChange} className={scrollAreaContentClass}>
        {children}
      </div>
    </div>
  );
});

if (__DEV__) {
  ScrollAreaViewport.displayName = 'ScrollAreaViewport';
}

type ScrollbarContextValue = {
  hasThumb: boolean;
  scrollbar: HTMLDivElement | null;
  onThumbChange(thumb: HTMLDivElement | null): void;
  onThumbPointerUp(): void;
  onThumbPointerDown(pointerPos: { x: number; y: number }): void;
  onThumbPositionChange(): void;
};

const [ScrollbarProvider, useScrollbar] = createContext<ScrollbarContextValue>({
  strict: true,
  name: 'ScrollbarContext',
});

type ScrollAreaScrollbarImplPrivateProps = {
  sizes: Sizes;
  hasThumb: boolean;
  onThumbChange: ScrollbarContextValue['onThumbChange'];
  onThumbPointerUp: ScrollbarContextValue['onThumbPointerUp'];
  onThumbPointerDown: ScrollbarContextValue['onThumbPointerDown'];
  onThumbPositionChange: ScrollbarContextValue['onThumbPositionChange'];
  onWheelScroll(event: WheelEvent, maxScrollPos: number): void;
  onDragScroll(pointerPos: { x: number; y: number }): void;
  onResize(): void;
};

type ScrollAreaScrollbarAxisPrivateProps = {
  hasThumb: boolean;
  sizes: Sizes;
  onSizesChange(sizes: Sizes): void;
  onThumbChange(thumb: HTMLDivElement | null): void;
  onThumbPointerDown(pointerPos: number): void;
  onThumbPointerUp(): void;
  onThumbPositionChange(): void;
  onWheelScroll(scrollPos: number): void;
  onDragScroll(pointerPos: number): void;
};

type ScrollAreaScrollbarImplProps = ScrollAreaScrollbarImplPrivateProps & PrimitiveDivProps;

type ScrollAreaScrollbarAxisProps = Omit<ScrollAreaScrollbarImplProps, keyof ScrollAreaScrollbarImplPrivateProps> &
  ScrollAreaScrollbarAxisPrivateProps;

type ScrollAreaScrollbarVisibleProps = Omit<ScrollAreaScrollbarAxisProps, keyof ScrollAreaScrollbarAxisPrivateProps> & {
  orientation?: Orientation;
};

type ScrollAreaScrollbarProps = ScrollAreaScrollbarVisibleProps & {
  forceMount?: true;
};

const ScrollAreaScrollbar = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>((props, ref) => {
  const { forceMount, ...rest } = props;

  const context = useScrollArea();

  const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
  const isHorizontal = props.orientation == 'horizontal';

  useEffect(() => {
    isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
    return () => {
      isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
    };
  }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);

  return context.type == 'hover' ? (
    <ScrollAreaScrollbarHover {...rest} ref={ref} forceMount={forceMount} />
  ) : context.type == 'scroll' ? (
    <ScrollAreaScrollbarScroll {...rest} ref={ref} forceMount={forceMount} />
  ) : context.type == 'auto' ? (
    <ScrollAreaScrollbarAuto {...rest} ref={ref} forceMount={forceMount} />
  ) : context.type == 'always' ? (
    <ScrollAreaScrollbarVisible {...rest} ref={ref} />
  ) : null;
});

if (__DEV__) {
  ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar';
}

const ScrollAreaScrollbarHover = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>((props, ref) => {
  const { forceMount, className, ...rest } = props;
  const context = useScrollArea();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scrollArea = context.scrollArea;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };

      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };

      scrollArea.addEventListener('pointerenter', handlePointerEnter);
      scrollArea.addEventListener('pointerleave', handlePointerLeave);
      return () => {
        scrollArea.removeEventListener('pointerenter', handlePointerEnter);
        scrollArea.removeEventListener('pointerleave', handlePointerLeave);
      };
    }
  }, [context.scrollArea, context.scrollHideDelay]);

  return (
    <Presence present={forceMount || visible}>
      <ScrollAreaScrollbarAuto
        className={clsx(className, visible ? visibleVisibleClass : visibleHiddenClass)}
        {...rest}
        ref={ref}
      />
    </Presence>
  );
});

if (__DEV__) {
  ScrollAreaScrollbarHover.displayName = 'ScrollAreaScrollbarHover';
}

const ScrollAreaScrollbarScroll = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>(
  (props: ScrollAreaScrollbarProps, ref) => {
    const { forceMount, className, ...rest } = props;

    const context = useScrollArea();

    const isHorizontal = props.orientation === 'horizontal';
    const debounceScrollEnd = useDebounceCallback(() => send('SCROLL_END'), 100);
    const [state, send] = useStateMachine('hidden', {
      hidden: {
        SCROLL: 'scrolling',
      },
      scrolling: {
        SCROLL_END: 'idle',
        POINTER_ENTER: 'interacting',
      },
      interacting: {
        SCROLL: 'interacting',
        POINTER_LEAVE: 'idle',
      },
      idle: {
        HIDE: 'hidden',
        SCROLL: 'scrolling',
        POINTER_ENTER: 'interacting',
      },
    });

    useEffect(() => {
      if (state === 'idle') {
        const hideTimer = window.setTimeout(() => send('HIDE'), context.scrollHideDelay);
        return () => window.clearTimeout(hideTimer);
      }
    }, [state, context.scrollHideDelay, send]);

    useEffect(() => {
      const viewport = context.viewport;
      const scrollDirection = isHorizontal ? 'scrollLeft' : 'scrollTop';

      if (viewport) {
        let prevScrollPos = viewport[scrollDirection];
        const handleScroll = () => {
          const scrollPos = viewport[scrollDirection];
          const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
          if (hasScrollInDirectionChanged) {
            send('SCROLL');
            debounceScrollEnd();
          }
          prevScrollPos = scrollPos;
        };
        viewport.addEventListener('scroll', handleScroll);
        return () => viewport.removeEventListener('scroll', handleScroll);
      }
    }, [context.viewport, isHorizontal, send, debounceScrollEnd]);

    return (
      <Presence present={forceMount || state != 'hidden'}>
        <ScrollAreaScrollbarVisible
          {...rest}
          ref={ref}
          className={clsx(className, state == 'hidden' ? visibleHiddenClass : visibleVisibleClass)}
          onPointerEnter={mergeEventHandlers(props.onPointerEnter, () => send('POINTER_ENTER'))}
          onPointerLeave={mergeEventHandlers(props.onPointerLeave, () => send('POINTER_LEAVE'))}
        />
      </Presence>
    );
  }
);

if (__DEV__) {
  ScrollAreaScrollbarScroll.displayName = 'ScrollAreaScrollbarScroll';
}

const ScrollAreaScrollbarAuto = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>((props, ref) => {
  const { forceMount, className, ...rest } = props;

  const context = useScrollArea();
  const [visible, setVisible] = useState(false);
  const isHorizontal = props.orientation === 'horizontal';

  const handleResize = useDebounceCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;

      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);

  useResizeObserver(context.viewport, handleResize);
  useResizeObserver(context.content, handleResize);

  return (
    <Presence present={forceMount || visible}>
      <ScrollAreaScrollbarVisible
        {...rest}
        className={clsx(className, visible ? visibleVisibleClass : visibleHiddenClass)}
        ref={ref}
      />
    </Presence>
  );
});

if (__DEV__) {
  ScrollAreaScrollbarAuto.displayName = 'ScrollAreaScrollbarAuto';
}

const ScrollAreaScrollbarVisible = forwardRef<HTMLDivElement, ScrollAreaScrollbarVisibleProps>((props, ref) => {
  const { orientation = 'vertical', ...rest } = props;

  const context = useScrollArea();

  const thumbRef = useRef<HTMLDivElement | null>(null);
  const pointerOffsetRef = useRef(0);
  const [sizes, setSizes] = useState<Sizes>({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
  });

  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);

  type UncommonProps = 'onThumbPositionChange' | 'onDragScroll' | 'onWheelScroll';
  const commonProps: Omit<ScrollAreaScrollbarAxisPrivateProps, UncommonProps> = {
    ...rest,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => (thumbRef.current = thumb),
    onThumbPointerUp: () => (pointerOffsetRef.current = 0),
    onThumbPointerDown: (pointerPos) => (pointerOffsetRef.current = pointerPos),
  };

  function getScrollPosition(pointerPos: number, direction?: Direction) {
    return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, direction);
  }

  if (orientation == 'horizontal') {
    return (
      <ScrollAreaScrollbarX
        {...commonProps}
        ref={ref}
        onThumbPositionChange={() => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.direction);
            thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
          }
        }}
        onWheelScroll={(scrollPos: number) => {
          if (context.viewport) context.viewport.scrollLeft = scrollPos;
        }}
        onDragScroll={(pointerPos: number) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, context.direction);
          }
        }}
      />
    );
  }

  if (orientation == 'vertical') {
    return (
      <ScrollAreaScrollbarY
        {...commonProps}
        ref={ref}
        onThumbPositionChange={() => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes);
            thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
        }}
        onWheelScroll={(scrollPos: number) => {
          if (context.viewport) context.viewport.scrollTop = scrollPos;
        }}
        onDragScroll={(pointerPos: number) => {
          if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
        }}
      />
    );
  }

  return null;
});

if (__DEV__) {
  ScrollAreaScrollbarVisible.displayName = 'ScrollAreaScrollbarVisible';
}

const ScrollAreaScrollbarX = forwardRef<HTMLDivElement, ScrollAreaScrollbarAxisProps>(
  (props: ScrollAreaScrollbarAxisProps, ref) => {
    const { sizes, onSizesChange, style, ...rest } = props;
    const context = useScrollArea();

    const [computedStyle, setComputedStyle] = useState<CSSStyleDeclaration>();
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const composeRefs = useMergedRef(ref, scrollbarRef, context.onScrollbarXChange);

    useEffect(() => {
      if (scrollbarRef.current) setComputedStyle(getComputedStyle(scrollbarRef.current));
    }, [scrollbarRef]);

    return (
      <ScrollAreaScrollbarImpl
        {...rest}
        ref={composeRefs}
        sizes={sizes}
        style={{
          ...assignInlineVars({
            [themeVars.scrollArea.scrollbar.width]: getThumbSize(sizes) + 'px',
          }),
          ...style,
        }}
        onThumbPointerDown={(pointerPos: { x: number }) => props.onThumbPointerDown(pointerPos.x)}
        onDragScroll={(pointerPos) => props.onDragScroll(pointerPos.x)}
        onWheelScroll={(event, maxScrollPos) => {
          if (context.viewport) {
            const scrollPos = context.viewport.scrollLeft + event.deltaX;
            props.onWheelScroll(scrollPos);
            if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
              event.preventDefault();
            }
          }
        }}
        onResize={() => {
          if (scrollbarRef.current && context.viewport && computedStyle) {
            onSizesChange({
              content: context.viewport.scrollWidth,
              viewport: context.viewport.offsetWidth,
              scrollbar: {
                size: scrollbarRef.current.clientWidth,
                paddingStart: toInt(computedStyle.paddingLeft),
                paddingEnd: toInt(computedStyle.paddingRight),
              },
            });
          }
        }}
      />
    );
  }
);

if (__DEV__) {
  ScrollAreaScrollbarX.displayName = 'ScrollAreaScrollbarX';
}

const ScrollAreaScrollbarY = forwardRef<HTMLDivElement, ScrollAreaScrollbarAxisProps>(
  (props: ScrollAreaScrollbarAxisProps, ref) => {
    const { sizes, onSizesChange, style, ...rest } = props;
    const context = useScrollArea();

    const [computedStyle, setComputedStyle] = useState<CSSStyleDeclaration>();
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const composeRefs = useMergedRef(ref, scrollbarRef, context.onScrollbarYChange);

    useEffect(() => {
      if (scrollbarRef.current) setComputedStyle(getComputedStyle(scrollbarRef.current));
    }, [scrollbarRef]);

    return (
      <ScrollAreaScrollbarImpl
        {...rest}
        ref={composeRefs}
        sizes={sizes}
        style={{
          ...assignInlineVars({
            [themeVars.scrollArea.scrollbar.height]: getThumbSize(sizes) + 'px',
          }),
          ...style,
        }}
        onThumbPointerDown={(pointerPos: { y: number }) => props.onThumbPointerDown(pointerPos.y)}
        onDragScroll={(pointerPos: { y: number }) => props.onDragScroll(pointerPos.y)}
        onWheelScroll={(event: { deltaY: number; preventDefault: () => void }, maxScrollPos) => {
          if (context.viewport) {
            const scrollPos = context.viewport.scrollTop + event.deltaY;
            props.onWheelScroll(scrollPos);

            if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
              event.preventDefault();
            }
          }
        }}
        onResize={() => {
          if (scrollbarRef.current && context.viewport && computedStyle) {
            onSizesChange({
              content: context.viewport.scrollHeight,
              viewport: context.viewport.offsetHeight,
              scrollbar: {
                size: scrollbarRef.current.clientHeight,
                paddingStart: toInt(computedStyle.paddingTop),
                paddingEnd: toInt(computedStyle.paddingBottom),
              },
            });
          }
        }}
      />
    );
  }
);

if (__DEV__) {
  ScrollAreaScrollbarY.displayName = 'ScrollAreaScrollbarY';
}

const ScrollAreaScrollbarImpl = forwardRef<HTMLDivElement, ScrollAreaScrollbarImplProps>(
  (props: ScrollAreaScrollbarImplProps, ref) => {
    const {
      sizes,
      hasThumb,
      onThumbChange,
      onThumbPointerUp,
      onThumbPointerDown,
      onThumbPositionChange,
      onDragScroll,
      onWheelScroll,
      onResize,
      className,
      ...rest
    } = props;

    const context = useScrollArea();
    const [scrollbar, setScrollbar] = useState<HTMLDivElement | null>(null);
    const composeRefs = useMergedRef(ref, (node) => setScrollbar(node));

    const rectRef = useRef<DOMRect | null>(null);
    const prevWebkitUserSelectRef = useRef<string>('');
    const viewport = context.viewport;
    const maxScrollPos = sizes.content - sizes.viewport;
    const handleWheelScroll = useCallbackRef(onWheelScroll);
    const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
    const handleResize = useDebounceCallback(onResize, 10);

    function handleDragScroll(event: PointerEvent<HTMLElement>) {
      if (rectRef.current) {
        const x = event.clientX - rectRef.current.left;
        const y = event.clientY - rectRef.current.top;
        onDragScroll({ x, y });
      }
    }

    useEffect(() => {
      const handleWheel = (event: WheelEvent) => {
        const element = event.target as HTMLElement;
        const isScrollbarWheel = scrollbar?.contains(element);
        if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
      };
      document.addEventListener('wheel', handleWheel, { passive: false });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return () => document.removeEventListener('wheel', handleWheel, { passive: false } as any);
    }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);

    useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);

    useResizeObserver(scrollbar, handleResize);
    useResizeObserver(context.content, handleResize);

    const contextValue = useMemo(
      () => ({
        hasThumb,
        scrollbar,
        onThumbChange,
        onThumbPointerUp,
        onThumbPositionChange: handleThumbPositionChange,
        onThumbPointerDown,
      }),
      [handleThumbPositionChange, hasThumb, onThumbChange, onThumbPointerDown, onThumbPointerUp, scrollbar]
    );

    return (
      <ScrollbarProvider value={contextValue}>
        <div
          {...rest}
          ref={composeRefs}
          className={clsx(className, displayAbsoluteClass)}
          onPointerDown={mergeEventHandlers(props.onPointerDown, (event) => {
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target as HTMLElement;
              element.setPointerCapture(event.pointerId);

              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              rectRef.current = scrollbar!.getBoundingClientRect();

              prevWebkitUserSelectRef.current = document.body.style.userSelect;
              document.body.style.userSelect = 'none';
              handleDragScroll(event);
            }
          })}
          onPointerMove={mergeEventHandlers(props.onPointerMove, handleDragScroll)}
          onPointerUp={mergeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target as HTMLElement;
            element.releasePointerCapture(event.pointerId);
            document.body.style.userSelect = prevWebkitUserSelectRef.current;
            rectRef.current = null;
          })}
        />
      </ScrollbarProvider>
    );
  }
);

if (__DEV__) {
  ScrollAreaScrollbarImpl.displayName = 'ScrollAreaScrollbarImpl';
}

type ScrollAreaThumbProps = PrimitiveDivProps;

const ScrollAreaThumb = forwardRef<HTMLDivElement, ScrollAreaThumbProps>((props: ScrollAreaThumbProps, ref) => {
  const { className, ...rest } = props;
  const scrollAreaContext = useScrollArea();
  const scrollbarContext = useScrollbar();
  const { onThumbPositionChange } = scrollbarContext;

  const composedRef = useMergedRef(ref, (node) => scrollbarContext.onThumbChange(node));
  const removeUnlinkedScrollListenerRef = useRef<() => void>();
  const debounceScrollEnd = useDebounceCallback(() => {
    if (removeUnlinkedScrollListenerRef.current) {
      removeUnlinkedScrollListenerRef.current();
      removeUnlinkedScrollListenerRef.current = undefined;
    }
  }, 100);

  useEffect(() => {
    const viewport = scrollAreaContext.viewport;
    if (viewport) {
      const handleScroll = () => {
        debounceScrollEnd();
        if (!removeUnlinkedScrollListenerRef.current) {
          removeUnlinkedScrollListenerRef.current = addUnlinkedScrollListener(viewport, onThumbPositionChange);
          onThumbPositionChange();
        }
      };
      onThumbPositionChange();
      viewport.addEventListener('scroll', handleScroll);
      return () => viewport.removeEventListener('scroll', handleScroll);
    }
  }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);

  return scrollbarContext.hasThumb ? (
    <div
      {...rest}
      className={clsx(className, scrollAreaThumbClass)}
      ref={composedRef}
      onPointerDownCapture={mergeEventHandlers(props.onPointerDownCapture, (event) => {
        const thumb = event.target as HTMLElement;
        const thumbRect = thumb.getBoundingClientRect();
        const x = event.clientX - thumbRect.left;
        const y = event.clientY - thumbRect.top;
        scrollbarContext.onThumbPointerDown({ x, y });
      })}
      onPointerUp={mergeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)}
    />
  ) : null;
});

if (__DEV__) {
  ScrollAreaThumb.displayName = 'ScrollAreaThumb';
}
type ScrollAreaCornerImplProps = PrimitiveDivProps;
type ScrollAreaCornerProps = ScrollAreaCornerImplProps;

const ScrollAreaCorner = forwardRef<HTMLDivElement, ScrollAreaCornerProps>(
  (props: ScrollAreaCornerProps, forwardedRef) => {
    const context = useScrollArea();
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type != 'scroll' && hasBothScrollbarsVisible;
    return hasCorner ? <ScrollAreaCornerImpl {...props} ref={forwardedRef} /> : null;
  }
);

if (__DEV__) {
  ScrollAreaCorner.displayName = 'ScrollAreaCorner';
}

const ScrollAreaCornerImpl = forwardRef<HTMLDivElement, ScrollAreaCornerImplProps>(
  (props: ScrollAreaCornerImplProps, ref) => {
    const context = useScrollArea();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const hasSize = Boolean(width && height);

    useResizeObserver(context.scrollbarX, () => {
      const height = context.scrollbarX?.offsetHeight || 0;
      context.onCornerHeightChange(height);
      setHeight(height);
    });

    useResizeObserver(context.scrollbarY, () => {
      const width = context.scrollbarY?.offsetWidth || 0;
      context.onCornerWidthChange(width);
      setWidth(width);
    });

    return hasSize ? <div {...props} ref={ref} /> : null;
  }
);

if (__DEV__) {
  ScrollAreaCornerImpl.displayName = 'ScrollAreaCornerImpl';
}

const toInt = (value?: string) => {
  return value ? parseInt(value, 10) : 0;
};

const getThumbRatio = (viewportSize: number, contentSize: number) => {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
};

const getThumbSize = (sizes: Sizes) => {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;

  return Math.max(thumbSize, 18);
};

const getScrollPositionFromPointer = (
  pointerPos: number,
  pointerOffset: number,
  sizes: Sizes,
  dir: Direction = 'ltr'
) => {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === 'ltr' ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange as [number, number]);
  return interpolate(pointerPos);
};

const getThumbOffsetFromScroll = (scrollPos: number, sizes: Sizes, dir: Direction = 'ltr') => {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === 'ltr' ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange as [number, number]);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
};

const linearScale = (input: readonly [number, number], output: readonly [number, number]) => {
  return (value: number) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
};

const isScrollingWithinScrollbarBounds = (scrollPos: number, maxScrollPos: number) => {
  return scrollPos > 0 && scrollPos < maxScrollPos;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const addUnlinkedScrollListener = (node: HTMLElement, handler = () => {}) => {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll) handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
};
