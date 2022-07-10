import { useEventListener } from '@agile-ui/react-hooks';
import { slugify } from '@agile-ui/utils';
import { useEffect, useRef, useState } from 'react';
import { cx } from 'twind';

export type Toc = {
  depth: number;
  value: string;
  children: Toc[];
};

const getActiveElement = (rects: DOMRect[]) => {
  if (rects.length == 0) {
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

  const slugs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    slugs.current = toc
      .map((item) => document.getElementById(slugify(item.value)) as HTMLElement)
      .filter((item) => item != null);
  }, [toc]);

  useEventListener('scroll', () => {
    setActive(getActiveElement(slugs.current.map((d) => d.getBoundingClientRect())));
  });

  return (
    <ul className={'space-y-1 border-l border-l-gray-100'}>
      {toc.map(({ value, depth }, index) => {
        const slug = slugify(value);

        return (
          <li key={slug}>
            <a
              className={cx(
                '-ml-px block border-l py-1 text-sm',
                depth == 3 ? 'pl-8' : 'pl-4',
                index == active
                  ? 'border-l-blue-300 bg-blue-50 text-blue-500'
                  : 'border-l-transparent text-gray-500 hover:(border-l-gray-300 text-gray-700)'
              )}
              aria-current={index == active ? 'location' : undefined}
              href={`#${slug}`}
            >
              {value}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
