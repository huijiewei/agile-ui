import { isBrowser } from '@agile-ui/utils';
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicEffect = isBrowser() ? useLayoutEffect : useEffect;
