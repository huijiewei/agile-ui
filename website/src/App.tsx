import { Button } from '@agile-ui/react';
import { useTimeout } from '@agile-ui/react-hooks';
import { Link } from 'react-router-dom';

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
        &nbsp;&nbsp;
        <Button to={''} as={Link}>
          Link
        </Button>
      </div>
      <div style={{ padding: '20px' }}>
        <Button level={'success'}>中文按钮</Button>
        &nbsp;&nbsp;
        <Button level={'success'}>English Button</Button>
      </div>
    </>
  );
};
