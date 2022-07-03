import { Helmet } from 'react-helmet-async';
import { Error } from '../../components/shared/Error';
import Image404 from '../../assets/images/404.png';

const NotFound = () => {
  return (
    <>
      <Helmet title={'页面不存在'} />
      <Error title={'页面不存在'}>
        <img className={'w-[320px] aspect-[3/2] items-center'} src={Image404} alt={'页面不存在'}></img>
      </Error>
    </>
  );
};

export default NotFound;
