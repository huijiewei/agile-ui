export const LayoutFooter = () => {
  return (
    <footer className={'border-t border-t-gray-200 bg-white py-3 px-5 text-slate-600'}>
      <div className={'flex justify-between text-[13px] font-medium'}>
        <div>Copyright © 2022, Agile Studio</div>
        <div>
          Proudly made in{' '}
          <span aria-label="China" role="img">
            🇨🇳
          </span>{' '}
          by Huijie Wei
        </div>
      </div>
    </footer>
  );
};
