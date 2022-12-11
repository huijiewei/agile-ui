import { Button } from '@agile-ui/react';
import type { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

type ErrorProps = {
  title: string;
  onBack?: () => void;
};

export const ErrorAlert = (props: PropsWithChildren<ErrorProps>) => {
  const { title, onBack, children } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    onBack && onBack();
    navigate(-1);
  };
  return (
    <div className={'flex flex-auto flex-col items-center justify-center p-4 py-32 text-center'}>
      <h1 className={'text-xl'}>{title}</h1>
      {children}
      <div className={'mt-5'}>
        <Button variant={'outline'} onClick={handleClick}>
          返回
        </Button>
      </div>
    </div>
  );
};
