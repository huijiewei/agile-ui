import { Button } from '@agile-ui/react';
import { useTimeout } from '@agile-ui/react-hooks';

export const App = () => {
  useTimeout(() => {
    document.getElementById('splash')?.remove();
  }, 500);

  return (
    <>
      <div style={{ padding: '20px' }}>
        <Button>中文按钮</Button>
        &nbsp;&nbsp;
        <Button>English Button</Button>
      </div>
      <div style={{ padding: '20px' }}>
        <Button level={'success'}>中文按钮</Button>
        &nbsp;&nbsp;
        <Button level={'success'}>English Button</Button>
      </div>
    </>
  );
};
