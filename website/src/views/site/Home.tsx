import { Button, Calendar, Stack } from '@agile-ui/react';
import { AddMode, Camera, Config } from '@icon-park/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Stack className={'p-3 space-x-2'}>
        <Button to={''} as={Link} level={'primary'}>
          按钮 Button
        </Button>
        <Button level={'success'}>按钮 Button</Button>
        <Button level={'natural'}>中文按钮</Button>
        <Button level={'warning'}>中文按钮</Button>
        <Button loading level={'danger'}>
          中文按钮
        </Button>
        <Button disabled>禁用按钮</Button>
      </Stack>
      <Stack className={'flex p-3 space-x-2 items-end'}>
        <Button level={'primary'} size={'xs'}>
          按钮 Button
        </Button>
        <Button level={'primary'} size={'sm'}>
          中文按钮
        </Button>
        <Button level={'primary'} size={'md'}>
          中文按钮
        </Button>
        <Button level={'primary'} size={'md'}>
          钮
        </Button>
        <Button startIcon={<Camera />} level={'primary'} size={'lg'}>
          中文按钮
        </Button>
        <Button level={'primary'} size={'xl'}>
          中文按钮
        </Button>
      </Stack>
      <Stack className={'p-3 space-x-2'}>
        <Button startIcon={<AddMode />} level={'primary'} size={'xs'} variant={'outline'}>
          按钮 Button
        </Button>
        <Button startIcon={<AddMode />} level={'primary'} size={'sm'} variant={'outline'}>
          中文按钮
        </Button>
        <Button startIcon={<Camera />} level={'primary'} size={'md'} variant={'outline'}>
          中文按钮
        </Button>
        <Button startIcon={<Config />} level={'primary'} size={'lg'} variant={'outline'}>
          中文按钮
        </Button>
        <Button startIcon={<Camera />} level={'primary'} size={'xl'} variant={'outline'}>
          中文按钮
        </Button>
      </Stack>
      <Stack className={'p-3 space-x-2'}>
        <Button level={'primary'} variant={'outline'}>
          按钮 Button
        </Button>
        <Button startIcon={<Config />} level={'success'} variant={'outline'}>
          中文按钮
        </Button>
        <Button level={'natural'} variant={'outline'}>
          中文按钮
        </Button>
        <Button level={'warning'} variant={'outline'}>
          中文按钮
        </Button>
        <Button level={'danger'} variant={'outline'}>
          中文按钮
        </Button>
        <Button variant={'outline'} disabled>
          禁用按钮
        </Button>
      </Stack>
      <Stack className={'p-3 space-x-2'}>
        <Button level={'primary'} variant={'light'}>
          按钮 Button
        </Button>
        <Button startIcon={<Config />} level={'success'} variant={'light'}>
          中文按钮
        </Button>
        <Button level={'natural'} variant={'light'}>
          中文按钮
        </Button>
        <Button level={'warning'} variant={'light'}>
          中文按钮
        </Button>
        <Button level={'danger'} variant={'light'}>
          中文按钮
        </Button>
        <Button variant={'light'} disabled>
          禁用按钮
        </Button>
      </Stack>
      <Stack className={'p-3 space-x-2'}>
        <Button level={'primary'} variant={'subtle'}>
          按钮 Button
        </Button>
        <Button startIcon={<Config />} level={'success'} variant={'subtle'}>
          中文按钮
        </Button>
        <Button level={'natural'} variant={'subtle'}>
          中文按钮
        </Button>
        <Button level={'warning'} variant={'subtle'}>
          中文按钮
        </Button>
        <Button level={'danger'} variant={'subtle'}>
          中文按钮
        </Button>
        <Button variant={'subtle'} disabled>
          禁用按钮
        </Button>
      </Stack>
      <Stack className={'p-3 space-x-2'}>
        <Button level={'primary'} variant={'link'}>
          按钮 Button
        </Button>
        <Button startIcon={<Config />} level={'success'} variant={'link'}>
          中文按钮
        </Button>
        <Button level={'natural'} variant={'link'}>
          中文按钮
        </Button>
        <Button level={'warning'} variant={'link'}>
          中文按钮
        </Button>
        <Button level={'danger'} variant={'link'}>
          中文按钮
        </Button>
        <Button variant={'link'} disabled>
          禁用按钮
        </Button>
      </Stack>
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
