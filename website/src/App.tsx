import { Button, Calendar, ScrollArea, Stack } from '@agile-ui/react';
import { useTimeout } from '@agile-ui/react-hooks';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const App = () => {
  useTimeout(() => {
    document.getElementById('splash')?.remove();
  }, 500);

  const btnRef = useRef(null);

  useEffect(() => {
    console.log(btnRef.current);
  }, [btnRef]);

  return (
    <>
      <Stack as={'span'} direction={'row'} style={{ padding: '20px' }}>
        <Button to={''} as={Link} ref={btnRef} level={'primary'}>
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
        &nbsp;&nbsp;
        <Button variant={'ghost'} disabled>
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
      <div style={{ padding: '20px' }}>
        <ScrollArea type={'always'} style={{ height: '200px' }}>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>12</p>
          <p>12</p>
          <p>12</p>
          <p>12</p>
          <p>12</p>
          <p>12</p>
          <p>12</p>
        </ScrollArea>
      </div>
    </>
  );
};
