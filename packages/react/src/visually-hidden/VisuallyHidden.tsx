import { ElementRef, forwardRef } from 'react';
import { __DEV__ } from '@agile-ui/utils';
import { ComponentPropsWithoutRef, Primitive } from '../primitive/Primitive';

type VisuallyHiddenElement = ElementRef<typeof Primitive.span>;
type PrimitiveSpanProps = ComponentPropsWithoutRef<typeof Primitive.span>;

export type VisuallyHiddenProps = PrimitiveSpanProps;

export const VisuallyHidden = forwardRef<VisuallyHiddenElement, VisuallyHiddenProps>((props, ref) => {
  return <Primitive.span className={'sr-only'} ref={ref} {...props} />;
});

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}
