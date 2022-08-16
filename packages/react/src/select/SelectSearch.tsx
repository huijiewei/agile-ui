import { primitiveComponent } from '../utils/component';

type SelectSearchProps = {
  open: boolean;
  setOpen: (opened: boolean) => void;
  setActiveIndex: (index: number) => void;
};

export const SelectSearch = primitiveComponent<'input', SelectSearchProps>((props, ref) => {
  const { value, onChange, open, setOpen, setActiveIndex, ...rest } = props;

  return (
    <div
      data-value={value}
      className={
        'flex-auto inline-grid grid-cols-[0px_min-content] row-start-1 row-end-2 col-start-1 col-end-3 after:(content-[attr(data-value)_"_"] whitespace-pre invisible min-w-[2px] row-start-1 row-end-auto col-start-2 col-end-auto)'
      }
    >
      <input
        autoCapitalize={'none'}
        autoComplete={'off'}
        autoCorrect={'off'}
        spellCheck={false}
        tabIndex={0}
        type={'text'}
        ref={ref}
        className={
          'appearance-none select-none outline-none w-full min-w-[2px] row-start-1 row-end-auto col-start-2 col-end-auto'
        }
        style={{
          background: 0,
        }}
        value={value}
        onChange={(event) => {
          onChange && onChange(event);
          !open && setOpen(true);
          setActiveIndex(0);
        }}
        onClick={(event) => {
          open && event.stopPropagation();
        }}
        {...rest}
      />
    </div>
  );
});
