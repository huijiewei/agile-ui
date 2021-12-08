import { ElementRef, forwardRef } from 'react';
import { __DEV__ } from '@agile-ui/utils';
import { ComponentPropsWithoutRef, Primitive } from '../primitive/Primitive';
import * as styles from './VisuallyHidden.css';

type VisuallyHiddenElement = ElementRef<typeof Primitive.span>;
type PrimitiveSpanProps = ComponentPropsWithoutRef<typeof Primitive.span>;

export type VisuallyHiddenProps = PrimitiveSpanProps;

export const VisuallyHidden = forwardRef<VisuallyHiddenElement, VisuallyHiddenProps>((props, ref) => {
  return <Primitive.span className={styles.root} ref={ref} {...props} />;
});

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}
