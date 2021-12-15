import { polymorphicComponent } from '../utils/polymorphic';
import { CalendarBase, CalendarBaseProps } from './CalendarBase';

type CalendarProps = CalendarBaseProps;

export const Calendar = polymorphicComponent<'div', CalendarProps>((props, ref) => {
  return <CalendarBase {...props} ref={ref} />;
});
