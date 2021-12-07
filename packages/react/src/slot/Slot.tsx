import { Children, cloneElement, forwardRef, HTMLAttributes, isValidElement, ReactElement, ReactNode } from 'react';
import { Dict, __DEV__ } from '@agile-ui/utils';
import { composeRefs } from '@agile-ui/react-hooks';

export type SlotProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
};

export const Slot = forwardRef<HTMLElement, SlotProps>((props, ref) => {
  const { children, ...restProps } = props;

  if (Children.toArray(children).some(isSlottable)) {
    return (
      <>
        {Children.map(children, (child) => {
          return isSlottable(child) ? (
            <SlotClone {...restProps} ref={ref}>
              {child.props.children}
            </SlotClone>
          ) : (
            child
          );
        })}
      </>
    );
  }

  return (
    <SlotClone {...restProps} ref={ref}>
      {children}
    </SlotClone>
  );
});

if (__DEV__) {
  Slot.displayName = 'Slot';
}

type SlotCloneProps = {
  children: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SlotClone = forwardRef<any, SlotCloneProps>((props, ref) => {
  const { children, ...restProps } = props;

  if (isValidElement(children)) {
    return cloneElement(children, {
      ...mergeProps(restProps, children.props),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref: composeRefs(ref, (children as any).ref),
    });
  }

  return Children.count(children) > 1 ? Children.only(null) : null;
});

if (__DEV__) {
  SlotClone.displayName = 'SlotClone';
}

export const Slottable = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

const isSlottable = (child: ReactNode): child is ReactElement => {
  return isValidElement(child) && child.type === Slottable;
};

const mergeProps = (slotProps: Dict, childProps: Dict) => {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      overrideProps[propName] = (...args: unknown[]) => {
        childPropValue?.(...args);
        slotPropValue?.(...args);
      };
    } else if (propName === 'style') {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
};
