import { createContext } from 'react';
import type { MotionState } from '@motionone/dom';

export const MotionContext = createContext<MotionState | undefined>(undefined);
