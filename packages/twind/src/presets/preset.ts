import type { Preset } from '@twind/core';
import type { AgileTheme } from '../types/types';
import preflight from './preflight';
import theme from './theme';
import rules from './rules';
import variants from './variants';

const presetAgile = (): Preset<AgileTheme> => {
  return {
    darkMode: 'class',
    darkColor: (section, key, { theme }) => {
      key =
        key == 'white'
          ? 'black'
          : key == 'black'
          ? 'white'
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            key.replace(/\d+$/, (shade) => ((8 - ~~(parseInt(shade, 10) / 100) || 0.5) * 100) as any);

      return theme(section as 'colors', key);
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
