import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '@twind/core';

export const VisuallyHidden = (props: ComponentPropsWithoutRef<'span'>) => {
  const { children, className, ...rest } = props;

  return (
    <span {...rest} className={cx('sr-only', className)}>
      {children}
    </span>
  );
};

VisuallyHidden.displayName = 'VisuallyHidden';
