import { __DEV__ } from '@agile-ui/utils';
import { Children, cloneElement, isValidElement, ReactElement } from 'react';
import { cx } from 'twind';
import { primitiveComponent } from '../utils/component';
import type { Size } from '../utils/types';

export type InputBaseProps = {
  /**
   * 大小
   * @default 'md'
   */
  size?: Size;
};

export type InputGroupProps = InputBaseProps;

export const InputGroup = primitiveComponent<'div', InputGroupProps>((props, ref) => {
  const { className, size = 'md', children, ...rest } = props;

  const validChildren = Children.toArray(children).filter((child) => isValidElement(child));

  const clones = Children.toArray(validChildren).map((child, idx) => {
    const classNames = [];

    if (idx == 0) {
      classNames.push('rounded-tr-none rounded-br-none');
    } else if (idx == validChildren.length - 1) {
      classNames.push('rounded-tl-none rounded-bl-none -ml-px');
    } else {
      classNames.push('!rounded-none -ml-px');
    }

    const target = child as ReactElement;

    return cloneElement(target, {
      size: size,
      className: cx(classNames, target.props.className),
    });
  });

  return (
    <div ref={ref} className={cx('w-full relative flex items-stretch', className)} {...rest}>
      {clones}
    </div>
  );
});

if (__DEV__) {
  InputGroup.displayName = 'InputGroup';
}
