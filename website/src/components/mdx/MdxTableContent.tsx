import { twClsx } from '@agile-ui/react';
import { MindmapList } from '@icon-park/react';
import { useScrollSpy } from '../../hooks/useScrollSpy';

export const MdxTableContent = ({ headings }: { headings: { id: string; text: string; level: string }[] }) => {
  const activeId = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    {
      rootMargin: '0% 0% -24% 0%',
    }
  );

  return (
    <>
      <h3 className={'inline-flex items-center font-bold'}>
        <MindmapList className={'mr-1'} />
        目录
      </h3>
      <ul className={'mt-2 space-y-1 border-l border-l-slate-100'}>
        {headings.map(({ id, text, level }: { id: string; text: string; level: string }) => (
          <li key={id}>
            <a
              className={twClsx(
                '-ml-px block border-l py-1',
                level == 'h3' ? 'pl-10' : 'pl-5',
                activeId === id
                  ? 'border-l-blue-300 bg-blue-50 text-blue-600'
                  : 'border-l-transparent hover:border-l-slate-200'
              )}
              aria-current={id === activeId ? 'location' : undefined}
              href={`#${id}`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
