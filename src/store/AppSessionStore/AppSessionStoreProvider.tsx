import React from 'react';

import { AppSessionStore } from './AppSessionStore';
import {
  // casterSession,
  AppSessionStoreContextProvider,
} from './AppSessionStoreContext';

interface TAppSessionStoreProviderProps {
  children?: React.ReactNode;
}
export function AppSessionStoreProvider(props: TAppSessionStoreProviderProps): JSX.Element {
  const { children } = props;
  const appSessionStore = React.useMemo(() => {
    return new AppSessionStore();
  }, []);
  React.useEffect(() => {
    // TODO: To set inited flag in other place?
    appSessionStore.setInited(true);
    // TODO: Do some other initializations?
    return () => {
      appSessionStore.destroy();
    };
  }, [appSessionStore]);
  // prettier-ignore
  return (
    <AppSessionStoreContextProvider value={appSessionStore}>
      {children}
    </AppSessionStoreContextProvider>
  );
}

/* // UNUSED: Wrapper `withAppSessionStoreProvider`
 * export function withAppSessionStoreProvider<P extends JSX.IntrinsicAttributes>(
 *   Component: React.ComponentType<P>,
 * ) {
 *   return function AppSessionStoreWrapped(props: P) {
 *     return (
 *       <AppSessionStoreProvider>
 *         <Component {...props} />
 *       </AppSessionStoreProvider>
 *     );
 *   };
 * }
 */
