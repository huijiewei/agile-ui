import { Error } from '../../components/error/Error';
import Image404 from '../../assets/images/404.png';

const NotFound = () => {
  return (
    <Error title={'页面不存在'}>
      <img className={'w-[320px] items-center'} src={Image404} alt={'页面不存在'}></img>
    </Error>
  );
};

export default NotFound;
