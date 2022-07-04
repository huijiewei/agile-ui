import type { Plugin } from 'vite';

export const viteReactDevtools = (): Plugin => {
  return {
    name: 'reactDevtoolsPlugin',
    enforce: 'pre',
    apply: 'build',
    transformIndexHtml(code) {
      return {
        html: code,
        tags: [
          {
            injectTo: 'body',
            tag: `script`,
            children: `if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') { window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};};`,
          },
        ],
      };
    },
  };
};
