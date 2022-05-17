import { useEffect, useRef, useState } from 'react';

const options: IntersectionObserverInit = {
  rootMargin: '0% 0% -40% 0%',
};

export const useScrollSpy = (selectors: string[]) => {
  const [activeId, setActiveId] = useState<string>();
  const observer = useRef<IntersectionObserver | null>(null);
  const str = selectors.toString();

  useEffect(() => {
    const elements = selectors.map((selector) => document.querySelector(selector));
    observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry && entry.isIntersecting) {
          setActiveId(entry.target.getAttribute('id') || '');
        }
      });
    }, options);

    elements.forEach((el) => {
      if (el) observer.current?.observe(el);
    });

    return () => observer.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [str]);

  return activeId;
};
