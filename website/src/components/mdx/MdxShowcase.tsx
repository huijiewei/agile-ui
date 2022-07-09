import type { ComponentProp } from '../playground/PlaygroundHelper';
import { AlertShowcase } from './showcases/AlertShowcase';
import { BadgeShowcase } from './showcases/BadgeShowcase';
import { ButtonShowcase } from './showcases/ButtonShowcase';
import { CheckboxShowcase } from './showcases/CheckboxShowcase';
import { InputShowcase } from './showcases/InputShowcase';
import { ProgressBarShowcase } from './showcases/ProgressBarShowcase';
import { SpinnerShowcase } from './showcases/SpinnerShowcase';
import { TooltipShowcase } from './showcases/TooltipShowcase';

export type MdxShowcaseProps = {
  componentName: string;
  componentProps: ComponentProp[];
};

const showcases = {
  Button: ButtonShowcase,
  Badge: BadgeShowcase,
  Spinner: SpinnerShowcase,
  Input: InputShowcase,
  Tooltip: TooltipShowcase,
  Checkbox: CheckboxShowcase,
  ProgressBar: ProgressBarShowcase,
  Alert: AlertShowcase,
};

export const MdxShowcase = ({ componentName, componentProps }: MdxShowcaseProps) => {
  return showcases[componentName as keyof typeof showcases](componentProps);
};
