import type { Language } from 'prism-react-renderer';
import { CodeLive } from '../code/CodeLive';

type MdxCodeLiveProps = {
  children?: string;
  preview?: boolean;
  editable?: boolean;
  className?: string;
};

export const MdxCodeLive = (props: MdxCodeLiveProps) => {
  const code = props.children?.replace(/\n$/, '') || '';

  const language = (props.className?.replace('language-', '') || 'tsx') as Language;

  return <CodeLive code={code} language={language} preview={props.preview} editable={props.editable} />;
};
