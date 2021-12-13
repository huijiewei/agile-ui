import { __DEV__ } from '@agile-ui/utils';
import { root } from './VisuallyHidden.css';
import { ElementType, forwardRef, ReactElement } from 'react';
import { PolymorphicComponentProps } from '@agile-ui/react';

const DEFAULT_TAG = 'span';

export type VisuallyHiddenProps<C extends ElementType> = PolymorphicComponentProps<C>;

type VisuallyHiddenComponent = <C extends ElementType = typeof DEFAULT_TAG>(
  props: VisuallyHiddenProps<C>
) => ReactElement | null;

const VisuallyHidden: VisuallyHiddenComponent & { displayName?: string } = forwardRef((props, ref) => {
  const { as: Component = DEFAULT_TAG, ...rest } = props;

  return <Component {...rest} className={root} ref={ref} />;
});

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}
