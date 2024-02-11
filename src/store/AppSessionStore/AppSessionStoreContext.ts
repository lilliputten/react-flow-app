import { Context, createContext, Provider, useContext } from 'react';

// import { makeStoreContext } from '@/helpers/store/storeContextHelpers';
import { AppSessionStore } from './AppSessionStore';

const AppSessionStoreContext: Context<AppSessionStore> = createContext({} as AppSessionStore);
export const AppSessionStoreContextProvider: Provider<AppSessionStore> =
  AppSessionStoreContext.Provider;

export function useAppSessionStore() {
  return useContext(AppSessionStoreContext);
}
