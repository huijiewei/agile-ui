export const disableReactDevTools = (): void => {
  const noop = (): void => undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DEV_TOOLS = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (typeof DEV_TOOLS === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const [key, value] of (<any>Object).entries(DEV_TOOLS)) {
      DEV_TOOLS[key] = typeof value === 'function' ? noop : null;
    }
  }
};
