import { useEffect, useState } from 'react';

export const useClipboard = (timeout = 2000) => {
  const [value, setValue] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const onCopy = async (source: string) => {
    await navigator.clipboard.writeText(source);

    setValue(source);
    setCopied(true);
  };

  useEffect(() => {
    const id = copied ? setTimeout(() => setCopied(false), timeout) : null;

    return () => {
      id && clearTimeout(id);
    };
  }, [timeout, copied]);

  return { value, copied, onCopy };
};
