import { Helmet } from 'react-helmet-async';
import { ErrorAlert } from '../../components/shared/ErrorAlert';
import Image404 from '../../assets/images/404.png';

const NotFound = () => {
  return (
    <>
      <Helmet title={'页面不存在'} />
      <ErrorAlert title={'页面不存在'}>
        <img className={'w-[320px] aspect-[3/2] items-center'} src={Image404} alt={'页面不存在'}></img>
      </ErrorAlert>
    </>
  );
};

export default NotFound;
