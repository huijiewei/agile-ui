import { Button, Calendar, Spinner, Stack } from '@agile-ui/react';
import { AddMode, Camera, Config } from '@icon-park/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Stack className={'space-x-2 p-3'}>
        <Button to={''} as={Link} color={'primary'}>
          按钮 Button
        </Button>
        <Button color={'success'}>按钮 Button</Button>
        <Button color={'natural'}>中文按钮</Button>
        <Button color={'warning'}>中文按钮</Button>
        <Button loading loadingText={'加载中...'} spinnerPlacement={'end'} color={'danger'}>
          中文按钮
        </Button>
        <Button loading>中文按钮 English</Button>
        <Button disabled>禁用按钮</Button>
      </Stack>
      <Stack className={'flex items-end space-x-2 p-3'}>
        <Button color={'primary'} size={'xs'}>
          按钮 Button
        </Button>
        <Button color={'primary'} size={'sm'}>
          中文按钮
        </Button>
        <Button color={'primary'} size={'md'}>
          中文按钮
        </Button>
        <Button color={'primary'} size={'md'}>
          钮
        </Button>
        <Button startIcon={<Camera />} color={'primary'} size={'lg'}>
          中文按钮
        </Button>
        <Button loading color={'primary'} size={'xl'}>
          中文按钮
        </Button>
        <Button color={'primary'} size={'xl'}>
          中文按钮
        </Button>
        <Spinner>1</Spinner>
        <Spinner className={'spinner-blue-700 spinner-empty-gray-200'}>1</Spinner>
      </Stack>
      <Stack className={'space-x-2 p-3'}>
        <Button startIcon={<AddMode />} color={'primary'} size={'xs'} variant={'outline'}>
          按钮 Button
        </Button>
        <Button loading startIcon={<AddMode />} color={'primary'} size={'xs'} variant={'outline'}>
          按钮 Button
        </Button>
        <Button loading={true} startIcon={<AddMode />} color={'primary'} size={'sm'} variant={'outline'}>
          中文按钮
        </Button>
        <Button startIcon={<Camera />} color={'primary'} size={'md'} variant={'outline'}>
          中文按钮
        </Button>
        <Button startIcon={<Config />} color={'primary'} size={'lg'} variant={'outline'}>
          中文按钮
        </Button>
        <Button startIcon={<Camera />} color={'primary'} size={'xl'} variant={'outline'}>
          中文按钮
        </Button>
      </Stack>
      <Stack className={'space-x-2 p-3'}>
        <Button color={'primary'} variant={'outline'}>
          按钮 Button
        </Button>
        <Button startIcon={<Config />} color={'success'} variant={'outline'}>
          中文按钮
        </Button>
        <Button color={'natural'} variant={'outline'}>
          中文按钮
        </Button>
        <Button color={'warning'} variant={'outline'}>
          中文按钮
        </Button>
        <Button color={'danger'} variant={'outline'}>
          中文按钮
        </Button>
        <Button variant={'outline'} disabled>
          禁用按钮
        </Button>
      </Stack>
      <Stack className={'space-x-2 p-3'}>
        <Button color={'primary'} variant={'light'}>
          按钮 Button
        </Button>
        <Button startIcon={<Config />} color={'success'} variant={'light'}>
          中文按钮
        </Button>
        <Button color={'natural'} variant={'light'}>
          中文按钮
        </Button>
        <Button color={'warning'} variant={'light'}>
          中文按钮
        </Button>
        <Button color={'danger'} variant={'light'}>
          中文按钮
        </Button>
        <Button variant={'light'} disabled>
          禁用按钮
        </Button>
      </Stack>
      <Stack className={'space-x-2 p-3'}>
        <Button color={'primary'} variant={'subtle'}>
          按钮 Button
        </Button>
        <Button startIcon={<Config />} color={'success'} variant={'subtle'}>
          中文按钮
        </Button>
        <Button color={'natural'} variant={'subtle'}>
          中文按钮
        </Button>
        <Button color={'warning'} variant={'subtle'}>
          中文按钮
        </Button>
        <Button color={'danger'} variant={'subtle'}>
          中文按钮
        </Button>
        <Button variant={'subtle'} disabled>
          禁用按钮
        </Button>
      </Stack>
      <Stack className={'space-x-2 p-3'}>
        <Button color={'primary'} variant={'link'}>
          按钮 Button
        </Button>
        <Button startIcon={<Config />} color={'success'} variant={'link'}>
          中文按钮
        </Button>
        <Button color={'natural'} variant={'link'}>
          中文按钮
        </Button>
        <Button color={'warning'} variant={'link'}>
          中文按钮
        </Button>
        <Button color={'danger'} variant={'link'}>
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
