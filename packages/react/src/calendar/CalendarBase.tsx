import { omit } from '@agile-ui/utils';
import clsx from 'clsx';
import { polymorphicComponent } from '../utils/polymorphic';

export type CalendarBaseProps = {
  startWeekDay?: number;
};

export const CalendarBase = polymorphicComponent<'div', CalendarBaseProps>((props, ref) => {
  const { as: Component = 'div', className, ...rest } = omit(props, ['children']);

  return <Component {...rest} className={clsx(className, '')} ref={ref} />;
});
