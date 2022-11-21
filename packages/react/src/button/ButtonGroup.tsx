import { useMemo } from 'react';
import { cx } from '@twind/core';
import { createContext } from '../utils/context';
import { primitiveComponent } from '../utils/component';
import type { Size, ScaleColor } from '../utils/types';

export type ButtonBaseProps = {
  /**
   * 形式
   * @default 'solid'
   */
  variant?: 'solid' | 'outline' | 'light' | 'subtle' | 'link';

  /**
   * 颜色
   * @default 'blue'
   */
  color?: ScaleColor;

  /**
   * 大小
   * @default 'md'
   */
  size?: Size;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
};

export type ButtonGroupProps = ButtonBaseProps & {
  vertical?: boolean;
};

const [ButtonGroupProvider, useButtonGroup] = createContext<ButtonGroupProps | undefined>({
  strict: false,
  name: 'ButtonGroupContext',
});

export { useButtonGroup };

export const ButtonGroup = primitiveComponent<'div', ButtonGroupProps>((props, ref) => {
  const {
    children,
    vertical = false,
    size = 'md',
    disabled,
    color = 'blue',
    variant = 'solid',
    className,
    ...rest
  } = props;

  const context = useMemo(
    () => ({ size, color, variant, disabled, vertical }),
    [size, color, variant, disabled, vertical]
  );

  return (
    <ButtonGroupProvider value={context}>
      <div
        role={'group'}
        className={cx('inline-flex', vertical ? 'flex-col' : 'flex-row', className)}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    </ButtonGroupProvider>
  );
});

ButtonGroup.displayName = 'ButtonGroup';
