import { forwardRef } from 'react';
import { __DEV__ } from '@agile-ui/utils';
import { PolymorphicComponent, Primitive } from '../primitive/Primitive';
import { root } from './VisuallyHidden.css';

const DEFAULT_TAG = 'span';

type VisuallyHiddenOwnProps = unknown;

const VisuallyHidden: PolymorphicComponent<VisuallyHiddenOwnProps, typeof DEFAULT_TAG> = forwardRef((props, ref) => {
  const { as = DEFAULT_TAG, ...restProps } = props;

  return <Primitive className={root} as={as} ref={ref} {...restProps} />;
});

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}
