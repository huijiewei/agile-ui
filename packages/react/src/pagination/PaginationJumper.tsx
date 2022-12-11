import { Input } from '../input/Input';
import { useState } from 'react';

export type PaginationJumperProps = {
  page: number;
  totalPage: number;
  setPage: (page: number) => void;
};

export const PaginationJumper = (props: PaginationJumperProps) => {
  const { page, totalPage, setPage } = props;

  const [inputValue, setInputValue] = useState<number>();

  const handleChange = (value: string | number) => {
    const parsed = parseInt(value.toString(), 10);

    setInputValue(Number.isNaN(parsed) ? undefined : parsed);
  };

  const handleJump = () => {
    if (inputValue == undefined) {
      return;
    }

    setInputValue(undefined);

    if (inputValue == page) {
      return;
    }

    const jump = inputValue < 1 ? 1 : inputValue > totalPage ? totalPage : inputValue;

    setPage(jump);
  };

  return (
    <div className={'flex items-center gap-2'}>
      <span className={'text-gray-500'}>前往</span>
      <Input
        size={'sm'}
        className={'w-10'}
        value={inputValue == undefined ? '' : inputValue}
        onChange={handleChange}
        onBlur={handleJump}
        onPressEnter={handleJump}
      />
    </div>
  );
};
