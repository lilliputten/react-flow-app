import { Context, createContext, Provider, useContext } from 'react';

export interface TStoreContext<T> {
  // Context...
  StoreContext: Context<T>;
  StoreProvider: Provider<T>;
  // Use root store
  useStore: () => T;
}

export function makeStoreContext<T>(store: T): TStoreContext<T> {
  // Context...
  const StoreContext: Context<T> = createContext(store);
  const StoreProvider: Provider<T> = StoreContext.Provider;

  // Use root store
  const useStore: () => T = () => useContext(StoreContext);

  const context: TStoreContext<T> = { StoreContext, StoreProvider, useStore };
  return context;
}
