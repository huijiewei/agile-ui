import agileTwindConfig from '@agile-ui/twind';
import { isString } from '@agile-ui/utils';
import { useMemo } from 'react';

export const MdxColorPlate = () => {
  const agileColors = agileTwindConfig().theme?.colors;

  const colors: { name: string; value: string | Record<string, string> }[] = useMemo(() => {
    return agileColors
      ? Object.keys(agileColors)
          .filter((key) => !['inherit', 'current', 'transparent'].includes(key))
          .map((key) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const color = agileColors[key];

            return { name: key, value: color };
          })
      : [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={'flex flex-col gap-5'}>
      {colors.map((color) => {
        return (
          <div key={color.name} className={'flex flex-row gap-3'}>
            {isString(color.value) ? (
              <div className={'flex flex-row gap-3'}>
                <div className={`h-10 w-10 rounded shadow-inner bg-${color.name}`}></div>
                <div className={''}>
                  <div className={'font-medium capitalize'}>{color.name}</div>
                  <div className={'text-xs uppercase font-mono'}>{color.value}</div>
                </div>
              </div>
            ) : (
              <>
                <div className={'shrink-0 w-16'}>
                  <div className={'font-medium capitalize h-10 flex flex-col justify-center'}>{color.name}</div>
                </div>
                <div className={'min-w-0 flex-1 grid grid-cols-5 gap-3 tablet:grid-cols-10'}>
                  {Object.keys(color.value).map((key) => {
                    const value = (color.value as Record<string, string>)[key];

                    return (
                      <div className={'flex flex-col gap-1'} key={key}>
                        <div className={`h-10 w-full rounded shadow-inner bg-${color.name}-${key}`}></div>
                        <div>
                          <div className={'font-medium capitalize'}>{key}</div>
                          <div className={'text-xs font-mono'}>{value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
