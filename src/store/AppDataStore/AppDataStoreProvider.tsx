import React from 'react';

import { AppDataStore } from './AppDataStore';
import { AppDataStoreContextProvider } from './AppDataStoreContext';

interface TAppDataStoreProviderProps {
  children?: React.ReactNode;
}
export function AppDataStoreProvider(props: TAppDataStoreProviderProps): JSX.Element {
  const { children } = props;
  const sankeyAppDataStore = React.useMemo(() => {
    return new AppDataStore();
  }, []);
  React.useEffect(() => {
    // TODO: To set inited flag in other place?
    sankeyAppDataStore.setInited(true);
    // TODO: Do some other initializations?
    return () => {
      sankeyAppDataStore.destroy();
    };
  }, [sankeyAppDataStore]);
  // prettier-ignore
  return (
    <AppDataStoreContextProvider value={sankeyAppDataStore}>
      {children}
    </AppDataStoreContextProvider>
  );
}

/* // UNUSED: Wrapper `withAppDataStoreProvider`
 * export function withAppDataStoreProvider<P extends JSX.IntrinsicAttributes>(
 *   Component: React.ComponentType<P>,
 * ) {
 *   return function AppDataStoreWrapped(props: P) {
 *     return (
 *       <AppDataStoreProvider>
 *         <Component {...props} />
 *       </AppDataStoreProvider>
 *     );
 *   };
 * }
 */
