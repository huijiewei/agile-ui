import { __DEV__, isNumber } from '@agile-ui/utils';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';

type BreadcrumbSeparatorProps = {
  spacing?: string | number;
};

export const BreadcrumbSeparator = primitiveComponent<'span', BreadcrumbSeparatorProps>((props, ref) => {
  const { spacing, className, ...rest } = props;

  return (
    <span
      ref={ref}
      className={cx(
        isNumber(spacing) || spacing == 'px' || spacing == 'auto' ? `mx-${spacing}` : `mx-[${spacing}]`,
        className
      )}
      role="presentation"
      {...rest}
    />
  );
});

if (__DEV__) {
  BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
}
