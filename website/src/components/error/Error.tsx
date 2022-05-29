import { Button } from '@agile-ui/react';
import type { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

type ErrorProps = {
  title: string;
  onBack?: () => void;
};

export const Error = (props: PropsWithChildren<ErrorProps>) => {
  const { title, onBack, children } = props;
  const navigate = useNavigate();

  const handleBack = () => {
    onBack && onBack();
    navigate(-1);
  };
  return (
    <div className={'flex py-32 flex-auto flex-col items-center justify-center p-4 text-center'}>
      <h1 className={'text-xl'}>{title}</h1>
      {children && <div className={'mx-auto mt-5 w-fit'}>{children}</div>}
      <div className={'mt-5'}>
        <Button variant={'outline'} onClick={handleBack}>
          返回
        </Button>
      </div>
    </div>
  );
};
