import { Box } from '@agile-ui/react';
import Image from '../../assets/images/404.svg';

const NotFound = () => {
  return (
    <Box>
      <img alt={'404'} src={Image} />
    </Box>
  );
};

export default NotFound;
