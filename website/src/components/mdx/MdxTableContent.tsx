import { twClsx } from '@agile-ui/react';
import { MindmapList } from '@icon-park/react';
import { useEffect, useRef, useState } from 'react';

type Heading = { id: string; text: string; level: string };

const getActiveElement = (rects: DOMRect[]) => {
  if (rects.length === 0) {
    return -1;
  }

  const closest = rects.reduce(
    (acc, item, index) => {
      if (Math.abs(acc.position) < Math.abs(item.y)) {
        return acc;
      }

      return {
        index,
        position: item.y,
      };
    },
    { index: 0, position: rects[0].y }
  );

  return closest.index;
};

export const MdxTableContent = ({ headings }: { headings: Heading[] }) => {
  const [active, setActive] = useState(0);

  const slugs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    slugs.current = headings.map((heading) => document.getElementById(heading.id) as HTMLDivElement);
  }, [headings]);

  useEffect(() => {
    setActive(getActiveElement(slugs.current.map((d) => d.getBoundingClientRect())));
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    setActive(getActiveElement(slugs.current.map((d) => d.getBoundingClientRect())));
  };

  return (
    <>
      <h3 className={'inline-flex items-center font-bold'}>
        <MindmapList className={'mr-1'} />
        目录
      </h3>
      <ul className={'mt-2 space-y-1 border-l border-l-slate-100'}>
        {headings.map(({ id, text, level }: Heading, index) => (
          <li key={id}>
            <a
              className={twClsx(
                '-ml-px block border-l py-1',
                level == 'h3' ? 'pl-10' : 'pl-5',
                index == active
                  ? 'border-l-blue-300 bg-blue-50 text-blue-600'
                  : 'border-l-transparent hover:border-l-slate-200'
              )}
              aria-current={index == active ? 'location' : undefined}
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
