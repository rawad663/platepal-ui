import { createContext, useContext, useState } from 'react';

type Context<T> = [T | undefined, (arg: T | undefined) => void];

export const createProvider = <T,>() => {
  const context: [undefined, () => void] = [undefined, () => {}];

  const Context = createContext<Context<T>>(context);

  const useGetContext = () => useContext(Context);

  const Provider = ({ children, initialState }: { children: React.ReactNode; initialState?: T }) => {
    const [state, setState] = useState<T | undefined>(initialState);

    return <Context.Provider value={[state, setState]}>{children}</Context.Provider>;
  };

  return {
    Provider,
    useContext: useGetContext,
  };
};
