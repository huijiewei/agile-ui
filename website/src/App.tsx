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
        <Button level={'primary'}>中文按钮</Button>
        &nbsp;&nbsp;
        <Button level={'success'}>中文按钮</Button>
        &nbsp;&nbsp;
        <Button level={'natural'}>中文按钮</Button>
        &nbsp;&nbsp;
        <Button level={'warning'}>中文按钮</Button>
        &nbsp;&nbsp;
        <Button level={'danger'}>中文按钮</Button>
      </div>
      <div style={{ padding: '20px' }}>
        <Button level={'primary'} variant={'outline'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'success'} variant={'outline'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'natural'} variant={'outline'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'warning'} variant={'outline'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'danger'} variant={'outline'}>
          中文按钮
        </Button>
      </div>
      <div style={{ padding: '20px' }}>
        <Button level={'primary'} variant={'ghost'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'success'} variant={'ghost'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'natural'} variant={'ghost'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'warning'} variant={'ghost'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'danger'} variant={'ghost'}>
          中文按钮
        </Button>
      </div>
      <div style={{ padding: '20px' }}>
        <Button level={'primary'} variant={'link'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'success'} variant={'link'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'natural'} variant={'link'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'warning'} variant={'link'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'danger'} variant={'link'}>
          中文按钮
        </Button>
      </div>
    </>
  );
};
