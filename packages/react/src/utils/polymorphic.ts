import type { Merge } from '@agile-ui/utils';
import { ComponentProps, ElementType, forwardRef, MutableRefObject, ReactElement, WeakValidationMap } from 'react';

/*
  From: https://github.com/Doist/reactist/blob/main/src/utils/polymorphism.ts
*/
type PolymorphicProp<ComponentType extends ElementType> = {
  as?: ComponentType;
};

type PolymorphicComponentProps<ComponentType extends ElementType, OwnProps> = Merge<
  ComponentProps<ComponentType>,
  OwnProps & PolymorphicProp<ComponentType>
>;

type ElementTagNameMap = HTMLElementTagNameMap &
  Pick<SVGElementTagNameMap, Exclude<keyof SVGElementTagNameMap, keyof HTMLElementTagNameMap>>;

type ElementByTag<TagName extends keyof ElementTagNameMap> = ElementTagNameMap[TagName];

type ElementByTagOrAny<ComponentType extends ElementType> = ComponentType extends keyof ElementTagNameMap
  ? ElementByTag<ComponentType>
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any;

type ForwardRefFunction<ComponentType extends ElementType, OwnProps> = {
  (
    props: PolymorphicComponentProps<ComponentType, OwnProps>,
    ref:
      | ((instance: ElementByTagOrAny<ComponentType> | null) => void)
      | MutableRefObject<ElementByTagOrAny<ComponentType> | null>
      | null
  ): ReactElement | null;
  displayName?: string;
};

export type PolymorphicComponent<ComponentType extends ElementType, OwnProps> = {
  <TT extends ElementType = ComponentType>(props: PolymorphicComponentProps<TT, OwnProps>): ReactElement | null;
  readonly $$typeof: symbol;
  defaultProps?: Partial<PolymorphicComponentProps<ComponentType, OwnProps>>;
  propTypes?: WeakValidationMap<PolymorphicComponentProps<ComponentType, OwnProps>>;
  displayName?: string;
};

export const polymorphicComponent = <
  ComponentType extends ElementType = 'div',
  OwnProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }
>(
  render: ForwardRefFunction<ComponentType, OwnProps>
) => {
  return forwardRef(render) as PolymorphicComponent<ComponentType, OwnProps>;
};
