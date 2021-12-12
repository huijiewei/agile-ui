import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, JSXElementConstructor } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type ExtendedProps<_ExtendedProps = {}, OverrideProps = {}> = OverrideProps & Omit<_ExtendedProps, keyof OverrideProps>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PropsOf<C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = JSX.LibraryManagedAttributes<
  C,
  ComponentPropsWithoutRef<C>
>;

type AsProp<C extends ElementType> = {
  /** Tag or component that should be used as root element */
  as?: C;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type InheritedProps<C extends ElementType, Props = {}> = ExtendedProps<PropsOf<C>, Props>;

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

// eslint-disable-next-line @typescript-eslint/ban-types
export type PolymorphicComponentProps<C extends ElementType, Props = {}> = InheritedProps<C, Props & AsProp<C>> & {
  ref?: PolymorphicRef<C>;
};
