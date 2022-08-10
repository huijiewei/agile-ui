import type { Merge } from '@agile-ui/utils';
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
  ForwardRefRenderFunction,
  ReactElement,
  WeakValidationMap,
} from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type As<Props = any> = ElementType<Props>;

type PropsOf<T extends As> = ComponentPropsWithoutRef<T> & {
  as?: As;
};

type OmitCommonProps<
  Target,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OmitAdditionalProps extends keyof any = never
> = Omit<Target, 'as' | OmitAdditionalProps>;

type RightJoinProps<
  SourceProps extends object = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  },
  OverrideProps extends object = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  },
  AsComponent extends As = As
> = RightJoinProps<ComponentProps, AdditionalProps> &
  RightJoinProps<AsProps, AdditionalProps> & {
    as?: AsComponent;
  };

type PolymorphicComponent<
  C extends As,
  Props extends object = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }
> = {
  <AsComponent extends As = C>(
    props: MergeWithAs<ComponentProps<C>, ComponentProps<AsComponent>, Props, AsComponent>
  ): JSX.Element;

  displayName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propTypes?: WeakValidationMap<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultProps?: Partial<any>;
};

export const polymorphicComponent = <
  C extends As,
  Props extends object = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }
>(
  render: ForwardRefRenderFunction<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    RightJoinProps<PropsOf<C>, Props> & {
      as?: As;
    }
  >
) => {
  return forwardRef(render) as unknown as PolymorphicComponent<C, Props>;
};

export type PrimitiveComponentProps<
  C extends ElementType = 'div',
  Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }
> = Merge<ComponentPropsWithoutRef<C>, Props>;

export const primitiveComponent = <
  C extends ElementType = 'div',
  Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }
>(
  render: (
    props: Merge<ComponentPropsWithoutRef<C>, Props>,
    ref?: ComponentPropsWithRef<C>['ref']
  ) => ReactElement | null
) => {
  return forwardRef(render);
};

export const primitiveOmitComponent = <C extends ElementType = 'div', K extends string | number | symbol = never>(
  render: (props: Omit<ComponentPropsWithoutRef<C>, K>, ref?: ComponentPropsWithRef<C>['ref']) => ReactElement | null
) => {
  return forwardRef(render);
};
