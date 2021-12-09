import { __DEV__, Merge } from '@agile-ui/utils';
import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, forwardRef, ReactElement } from 'react';

export type ExpandProps<T> = T extends object ? (T extends infer O ? { [K in keyof O]: O[K] } : never) : T;
export type PropsWithAs<P, E extends ElementType> = P & { as?: E };
export type PropsWithHtmlElement<P, E extends ElementType> = Merge<ComponentPropsWithoutRef<E>, P>;
export type PolymorphicProps<P, E extends ElementType> = PropsWithAs<PropsWithHtmlElement<P, E>, E>;
export type PolymorphicPropsWithRef<P, E extends ElementType> = PropsWithAs<Merge<ComponentPropsWithRef<E>, P>, E>;
export type PolymorphicComponent<P, D extends ElementType> = (<E extends ElementType = D>(
  props: PolymorphicPropsWithRef<P, E>
) => ReactElement | null) & {
  displayName?: string;
};

const DEFAULT_TAG = 'div';

type PrimitiveOwnProps = unknown;

export const Primitive: PolymorphicComponent<PrimitiveOwnProps, typeof DEFAULT_TAG> = forwardRef((props, ref) => {
  const { as: Comp = DEFAULT_TAG, ...restProps } = props;
  return <Comp {...restProps} ref={ref} />;
});

if (__DEV__) {
  Primitive.displayName = 'Primitive';
}
