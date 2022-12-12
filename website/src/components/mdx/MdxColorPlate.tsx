import agileTwindConfig from '@agile-ui/twind';
import { isString } from '@agile-ui/utils';
import { useMemo } from 'react';
import { tw } from '@twind/core';

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
                <div
                  className={'dark:(ring-1 ring-inset ring-white/10) h-10 w-10 rounded'}
                  style={{
                    backgroundColor: tw.theme('colors', `${color.name}`, '#000').toString(),
                  }}
                ></div>
                <div className={''}>
                  <div className={'font-medium capitalize'}>{color.name}</div>
                  <div className={'font-mono text-xs uppercase'}>{color.value}</div>
                </div>
              </div>
            ) : (
              <>
                <div className={'w-16 shrink-0'}>
                  <div className={'flex h-10 flex-col justify-center font-medium capitalize'}>{color.name}</div>
                </div>
                <div className={'grid min-w-0 flex-1 grid-cols-5 gap-3 tablet:grid-cols-10'}>
                  {Object.keys(color.value).map((key) => {
                    const value = (color.value as Record<string, string>)[key];

                    return (
                      <div className={'flex flex-col gap-1'} key={key}>
                        <div
                          className={'dark:(ring-1 ring-white/10) h-10 w-full rounded ring-inset'}
                          style={{
                            backgroundColor: tw.theme('colors', `${color.name}-${key}`, '#000').toString(),
                          }}
                        ></div>
                        <div>
                          <div className={'font-medium capitalize'}>{key}</div>
                          <div className={'font-mono text-xs'}>{value}</div>
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
