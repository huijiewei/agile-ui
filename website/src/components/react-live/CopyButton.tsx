import { useClipboard } from '@agile-ui/react-hooks';
import { __DEV__ } from '@agile-ui/utils';

export const CopyButton = ({ content }: { content: string }) => {
  const { copied, onCopy } = useClipboard();

  return (
    <button
      type={'button'}
      className={
        'px-2 py-0.5 rounded text-sm absolute right-1.5 top-1.5 bg-white border-2 border-gray-300 text-black appearance-none'
      }
      onClick={() => onCopy(content)}
    >
      <span>{copied ? '已复制' : '复制'}</span>
    </button>
  );
};

if (__DEV__) {
  CopyButton.displayName = 'CopyButton';
}
