import { Button, Calendar, Stack } from '@agile-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Stack as={'div'} direction={'horizontal'} style={{ padding: '20px' }}>
        <Button to={''} as={Link} level={'primary'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'success'}>中文按钮</Button>
        &nbsp;&nbsp;
        <Button level={'natural'}>中文按钮</Button>
        &nbsp;&nbsp;
        <Button level={'warning'}>中文按钮</Button>
        &nbsp;&nbsp;
        <Button level={'danger'}>中文按钮</Button>
        &nbsp;&nbsp;
        <Button disabled>禁用按钮</Button>
      </Stack>
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
        &nbsp;&nbsp;
        <Button variant={'outline'} disabled>
          禁用按钮
        </Button>
      </div>
      <div style={{ padding: '20px' }}>
        <Button level={'primary'} variant={'light'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'success'} variant={'light'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'natural'} variant={'light'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'warning'} variant={'light'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'danger'} variant={'light'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button variant={'light'} disabled>
          禁用按钮
        </Button>
      </div>
      <div style={{ padding: '20px' }}>
        <Button level={'primary'} variant={'subtle'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'success'} variant={'subtle'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'natural'} variant={'subtle'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'warning'} variant={'subtle'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button level={'danger'} variant={'subtle'}>
          中文按钮
        </Button>
        &nbsp;&nbsp;
        <Button variant={'subtle'} disabled>
          禁用按钮
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
        &nbsp;&nbsp;
        <Button variant={'link'} disabled>
          禁用按钮
        </Button>
      </div>
      <div>
        <Calendar>1</Calendar>
      </div>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
    </>
  );
};

export default Home;
