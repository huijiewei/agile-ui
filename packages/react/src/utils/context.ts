import { Context, createContext as ReactCreateContext, Provider, useContext as ReactUseContext } from 'react';

export type CreateContextOptions = {
  name?: string;
  strict?: boolean;
  errorMessage?: string;
};

type CreateContextReturn<T> = [Provider<T>, () => T, Context<T>];

export const createContext = <ContextValueType>(options: CreateContextOptions = {}) => {
  const { strict = true, errorMessage = 'useContext must be used within a Provider', name } = options;

  const Context = ReactCreateContext<ContextValueType | undefined>(undefined);

  Context.displayName = name;

  const useContext = () => {
    const context = ReactUseContext(Context);

    if (!context && strict) {
      new Error(errorMessage);
    }

    return context;
  };

  return [Context.Provider, useContext, Context] as CreateContextReturn<ContextValueType>;
};
