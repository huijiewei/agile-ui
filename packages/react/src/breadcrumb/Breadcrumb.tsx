import { __DEV__ } from '@agile-ui/utils';
import { Children, cloneElement, isValidElement } from 'react';
import type { ReactElement } from 'react';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';

export type BreadcrumbProps = {
  /**
   * 指定分隔符
   * @default "/"
   */
  separator?: string | ReactElement;

  /**
   * 分隔符左右边距
   * @default '2'
   */
  spacing?: string | number;
};

export const Breadcrumb = primitiveComponent<'nav', BreadcrumbProps>((props, ref) => {
  const { children, className, separator = '/', spacing = 2, ...rest } = props;

  const validChildren = Children.toArray(children).filter((child) => isValidElement(child)) as ReactElement[];
  const count = validChildren.length;

  const clones = validChildren.map((child, index) => {
    return cloneElement(child, {
      separator,
      spacing,
      lastChild: count === index + 1,
    });
  });

  return (
    <nav ref={ref} className={cx('block', className)} {...rest}>
      <ol>{clones}</ol>
    </nav>
  );
});

if (__DEV__) {
  Breadcrumb.displayName = 'Breadcrumb';
}
