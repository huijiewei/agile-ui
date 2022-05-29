import { Error } from '../../components/error/Error';
import Image404 from '../../assets/images/404.png';
import { Fade } from '../../components/transition/Fade';

const NotFound = () => {
  return (
    <Fade>
      <Error title={'页面不存在'}>
        <img className={'w-[320px] items-center'} src={Image404} alt={'页面不存在'}></img>
      </Error>
    </Fade>
  );
};

export default NotFound;
