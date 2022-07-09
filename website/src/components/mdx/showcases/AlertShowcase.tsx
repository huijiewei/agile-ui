import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@agile-ui/react';
import { Info } from '@agile-ui/react-icons';
import { Playground } from '../../playground/Playground';
import type { ComponentProp } from '../../playground/PlaygroundHelper';

export const AlertShowcase = (componentProps: ComponentProp[]) => (
  <Playground
    codeTemplate={(props: string) => `
import { Alert } from '@agile-ui/react';

const Demo = () => {
  return (
    <Alert${props}>
        <AlertIcon>
          <Info />
        </AlertIcon>
        <AlertTitle>警告框</AlertTitle>
        <AlertDescription>警告框内容</AlertDescription>
    </Alert>
  );
}
`}
    component={Alert}
    defaultProps={{
      className: 'w-full',
      children: (
        <>
          <AlertIcon>
            <Info />
          </AlertIcon>
          <AlertTitle>警告框</AlertTitle>
          <AlertDescription>警告框内容</AlertDescription>
        </>
      ),
    }}
    componentProps={componentProps}
    ignoreProps={['className', 'children']}
  />
);
