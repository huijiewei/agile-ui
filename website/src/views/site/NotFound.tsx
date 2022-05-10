import { Box } from '@agile-ui/react';
import Image from '../../assets/images/404.svg';

const NotFound = () => {
  return (
    <Box className={'flex justify-center'}>
      <img className={'w-2/3'} alt={'404'} src={Image} />
    </Box>
  );
};

export default NotFound;
