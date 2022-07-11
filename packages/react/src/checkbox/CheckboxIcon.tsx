import type { ComponentPropsWithoutRef } from 'react';
import { cx } from 'twind';
import { Animation } from '../animation/Animation';

export type CheckboxIconProps = {
  indeterminate?: boolean;
  checked?: boolean;
};

export const CheckboxIcon = (props: ComponentPropsWithoutRef<'svg'> & CheckboxIconProps) => {
  const { indeterminate = false, checked = false, className, ...rest } = props;
  const Icon = indeterminate ? IndeterminateIcon : CheckIcon;

  return (
    <Animation duration={200} show={checked || indeterminate}>
      <Icon className={cx('w-[1.2em]', className)} {...rest} />
    </Animation>
  );
};

const CheckIcon = (props: ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg
      viewBox="0 0 12 10"
      fill={'none'}
      strokeWidth={2}
      stroke={'currentColor'}
      strokeDasharray={16}
      opacity={1}
      strokeDashoffset={0}
      {...props}
    >
      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
    </svg>
  );
};

const IndeterminateIcon = (props: ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg viewBox="0 0 24 24" stroke={'currentColor'} strokeWidth={4} opacity={1} {...props}>
      <line x1="21" x2="3" y1="12" y2="12"></line>
    </svg>
  );
};
