import { Button } from '@agile-ui/react';
import { useTimeout } from '@agile-ui/react-hooks';

export const App = () => {
  useTimeout(() => {
    document.getElementById('splash')?.remove();
  }, 1000);

  return (
    <div className={'container p-5 mx-auto'}>
      <Button className={''}>中文按钮</Button>
    </div>
  );
};
