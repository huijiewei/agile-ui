import { useEffect, useRef, useState } from 'react';
import { cx } from 'twind';

export type Toc = {
  depth: number;
  value: string;
  children: Toc[];
};

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

export const MdxToc = ({ toc = [] }: { toc?: Toc[] }) => {
  const [active, setActive] = useState(0);

  const slugs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    slugs.current = toc.map((item) => document.getElementById(item.value) as HTMLDivElement);
  }, [toc]);

  const handleScroll = () => {
    setActive(getActiveElement(slugs.current.map((d) => d.getBoundingClientRect())));
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ul className={'mt-2 space-y-2 border-l border-l-gray-100'}>
        {toc.map(({ value, depth }, index) => (
          <li key={value}>
            <a
              className={cx(
                '-ml-px block border-l py-1',
                depth == 3 ? 'pl-10' : 'pl-5',
                index == active
                  ? 'border-l-blue-300 bg-blue-50 text-blue-400'
                  : 'border-l-transparent text-gray-600 hover:(border-l-gray-300 text-gray-800)'
              )}
              aria-current={index == active ? 'location' : undefined}
              href={`#${value}`}
            >
              {value}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
