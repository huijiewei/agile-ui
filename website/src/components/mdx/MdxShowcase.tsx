import type { ComponentProp } from '../playground/PlaygroundHelper';
import { AlertShowcase } from './showcases/AlertShowcase';
import { BadgeShowcase } from './showcases/BadgeShowcase';
import { ButtonShowcase } from './showcases/ButtonShowcase';
import { CheckboxShowcase } from './showcases/CheckboxShowcase';
import { InputShowcase } from './showcases/InputShowcase';
import { ProgressBarShowcase } from './showcases/ProgressBarShowcase';
import { RadioShowcase } from './showcases/RadioShowcase';
import { SpinnerShowcase } from './showcases/SpinnerShowcase';
import { SwitchShowcase } from './showcases/SwitchShowcase';
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
  Radio: RadioShowcase,
  Switch: SwitchShowcase,
};

export const MdxShowcase = ({ componentName, componentProps }: MdxShowcaseProps) => {
  return showcases[componentName as keyof typeof showcases](componentProps);
};
