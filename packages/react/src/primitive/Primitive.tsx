import { ComponentProps, ComponentPropsWithRef, ElementType, forwardRef, ForwardRefExoticComponent } from 'react';
import { Slot } from '../slot/Slot';

const NODES = ['a', 'button', 'div', 'h2', 'h3', 'img', 'li', 'nav', 'p', 'span', 'svg', 'ul'] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PropsWithoutRef<P> = P extends any ? ('ref' extends keyof P ? Pick<P, Exclude<keyof P, 'ref'>> : P) : P;
type PrimitiveForwardRefComponent<E extends ElementType> = ForwardRefExoticComponent<PrimitivePropsWithRef<E>>;

export type PrimitivePropsWithRef<E extends ElementType> = ComponentPropsWithRef<E> & {
  asChild?: boolean;
};
export type ComponentPropsWithoutRef<T extends ElementType> = PropsWithoutRef<ComponentProps<T>>;

type Primitives = { [E in typeof NODES[number]]: PrimitiveForwardRefComponent<E> };

export const Primitive = NODES.reduce(
  (primitive, node) => ({
    ...primitive,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,react/display-name
    [node]: forwardRef((props: PrimitivePropsWithRef<typeof node>, ref: any) => {
      const { asChild, ...restProps } = props;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Comp: any = asChild ? Slot : node;

      return <Comp {...restProps} ref={ref} />;
    }),
  }),
  {} as Primitives
);
