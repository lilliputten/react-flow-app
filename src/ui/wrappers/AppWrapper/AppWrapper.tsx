import React from 'react';

import { CoreWrapper } from 'src/ui/wrappers/CoreWrapper';
import { AppSessionStoreProvider } from 'src/store/AppSessionStore';
import { AppRouterWrapper } from 'src/ui/wrappers/AppRouterWrapper';

interface TWithChildren {
  className?: string;
  children?: React.ReactNode;
}
type TAppWrapperProps = TWithChildren;

export function AppWrapper(props: TAppWrapperProps): JSX.Element {
  const { children, className } = props;
  return (
    <CoreWrapper className={className}>
      <AppSessionStoreProvider>
        {/* TODO: Expose root control nodes or use custom hooks? */}
        {children}
      </AppSessionStoreProvider>
    </CoreWrapper>
  );
}
