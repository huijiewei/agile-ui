import { __DEV__ } from '@agile-ui/utils';
import { cx } from 'twind';
import { polymorphicComponent } from '../utils/component';

export type BreadcrumbLinkProps = {
  currentPage?: boolean;
};

export const BreadcrumbLink = polymorphicComponent<'a', BreadcrumbLinkProps>((props, ref) => {
  const { as: Component = 'a', className, currentPage, ...rest } = props;

  if (currentPage) {
    return <span ref={ref} className={cx('', className)} aria-current="page" {...rest} />;
  }

  return <Component ref={ref} className={cx('cursor-pointer hover:underline', className)} {...rest} />;
});

if (__DEV__) {
  BreadcrumbLink.displayName = 'BreadcrumbLink';
}
