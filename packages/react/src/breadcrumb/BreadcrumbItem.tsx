import type { ReactElement } from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import { cx } from '@twind/core';
import { primitiveComponent } from '../utils/component';
import type { BreadcrumbProps } from './Breadcrumb';
import { BreadcrumbLink } from './BreadcrumbLink';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';

export type BreadcrumbItemProps = BreadcrumbProps & {
  lastChild?: boolean;
  currentPage?: boolean;
};

export const BreadcrumbItem = primitiveComponent<'li', BreadcrumbItemProps>((props, ref) => {
  const { className, children, separator, spacing, lastChild, currentPage, ...rest } = props;

  const validChildren = Children.toArray(children).filter((child) => isValidElement(child)) as ReactElement[];

  const clones = validChildren.map((child) => {
    if (child.type == BreadcrumbLink) {
      return cloneElement(child, {
        currentPage,
      });
    }

    if (child.type == BreadcrumbSeparator) {
      return cloneElement(child, {
        spacing,
        children: child.props.children || separator,
      });
    }

    return child;
  });

  return (
    <li ref={ref} className={cx('inline-flex items-center', className)} {...rest}>
      {clones}
      {!lastChild && <BreadcrumbSeparator spacing={spacing}>{separator}</BreadcrumbSeparator>}
    </li>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
