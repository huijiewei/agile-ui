import type { Preset } from '@twind/core';
import type { AgileTheme } from '../types/types';
import preflight from './preflight';
import theme from './theme';
import rules from './rules';
import variants from './variants';
import { autoColorKey } from '../utils/color';

const presetAgile = (): Preset<AgileTheme> => {
  return {
    darkMode: 'class',
    darkColor: (section, key, { theme }) => {
      return theme(section as 'colors', autoColorKey(key));
    },
    preflight,
    theme,
    variants,
    rules,
    finalize(rule) {
      if (rule.n && rule.d && rule.r.some((r) => /^&::(before|after)$/.test(r)) && !/(^|;)content:/.test(rule.d)) {
        return { ...rule, d: 'content:var(--tw-content);' + rule.d };
      }

      return rule;
    },
  };
};

export default presetAgile;
