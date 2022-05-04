import { __DEV__ } from '@agile-ui/utils';
import { useState } from 'react';

export const CopyButton = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type={'button'}
      className={
        'px-2 py-0.5 rounded text-sm absolute right-1.5 top-1.5 bg-white border-2 border-gray-300 text-black appearance-none'
      }
      onClick={async () => {
        await navigator.clipboard.writeText(content);
        setCopied(true);

        setTimeout(() => setCopied(false), 1000);
      }}
    >
      <span>{copied ? '已复制' : '复制'}</span>
    </button>
  );
};

if (__DEV__) {
  CopyButton.displayName = 'CopyButton';
}
