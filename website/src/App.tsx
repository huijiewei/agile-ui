import { Button } from '@agile-ui/react';
import { useTimeout } from '@agile-ui/react-hooks';

export const App = () => {
  useTimeout(() => {
    document.getElementById('splash')?.remove();
  }, 500);

  return (
    <div className={'container p-5 mx-auto'}>
      <Button className={'1'}>中文按钮</Button>
    </div>
  );
};
