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
        <Button disabled to={''} as={Link}>
          Link
        </Button>
        <Button disabled as={'span'}>
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
