import { __DEV__ } from '@agile-ui/utils';
import { m } from 'framer-motion';
import { Box } from '../box/Box';

export { AnimatePresence } from 'framer-motion';

export const Motion = m(Box);

if (__DEV__) {
  Motion.displayName = 'Motion';
}
