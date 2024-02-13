import { Context, createContext, Provider, useContext } from 'react';

// import { makeStoreContext } from '@/helpers/store/storeContextHelpers';
import { AppDataStore } from './AppDataStore';

const AppDataStoreContext: Context<AppDataStore> = createContext({} as AppDataStore);
export const AppDataStoreContextProvider: Provider<AppDataStore> = AppDataStoreContext.Provider;

export function useAppDataStore() {
  return useContext(AppDataStoreContext);
}
