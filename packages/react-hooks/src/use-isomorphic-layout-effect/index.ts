import { isBrowser } from '@agile-ui/utils';
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
