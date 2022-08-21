import { cx } from 'twind';
import { polymorphicComponent } from '../utils/component';

export type BreadcrumbLinkProps = {
  currentPage?: boolean;
};

export const BreadcrumbLink = polymorphicComponent<'a', BreadcrumbLinkProps>((props, ref) => {
  const { as: Component = 'a', className, href, currentPage, ...rest } = props;

  if (currentPage) {
    return <span ref={ref} className={cx('', className)} aria-current="page" {...rest} />;
  }

  return <Component ref={ref} href={href} className={cx('cursor-pointer hover:underline', className)} {...rest} />;
});

BreadcrumbLink.displayName = 'BreadcrumbLink';
