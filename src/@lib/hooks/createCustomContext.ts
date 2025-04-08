import { createContext, useContext } from "react";

export function createCustomContext<T>(): [
  React.Provider<T | undefined>,
  React.Context<T | undefined>,
  () => T,
] {
  const Context = createContext<T | undefined>(undefined);

  const useCustomContext = () => {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error("Context must be used within its Provider");
    }
    return context;
  };

  return [Context.Provider, Context, useCustomContext];
}
