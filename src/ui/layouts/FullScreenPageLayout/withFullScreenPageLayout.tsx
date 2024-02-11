import React from 'react';

import { FullScreenPageLayout, TFullScreenPageLayoutProps } from './FullScreenPageLayout';

export interface TWithFullScreenPageLayoutProps extends JSX.IntrinsicAttributes {
  // title?: string;
}

export function withFullScreenPageLayoutFabric<P extends JSX.IntrinsicAttributes>(
  wrapperProps: TFullScreenPageLayoutProps = {},
): (
  Component: React.ComponentType<P & TWithFullScreenPageLayoutProps>,
) => (props: P & TWithFullScreenPageLayoutProps) => JSX.Element {
  return function withFullScreenPageLayout<P extends JSX.IntrinsicAttributes>(
    Component: React.ComponentType<P>,
  ) {
    return function FullScreenPageLayoutWrapper(props: P & TWithFullScreenPageLayoutProps) {
      return (
        <FullScreenPageLayout {...wrapperProps}>
          <Component {...props} />
        </FullScreenPageLayout>
      );
    };
  };
}
