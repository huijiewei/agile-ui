export const LayoutFooter = () => {
  return (
    <footer className={'border-t border-t-gray-200 py-3 px-5 text-slate-600'}>
      <div className={'flex justify-between text-[13px] font-medium'}>
        <div>Copyright © 2022</div>
        <div>
          Proudly made in
          <span className={'mx-1'} aria-label="China" role="img">
            🇨🇳
          </span>
          by Huijie
        </div>
      </div>
    </footer>
  );
};
