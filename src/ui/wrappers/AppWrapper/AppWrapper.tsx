import React from 'react';

import { CoreWrapper } from 'src/ui/wrappers/CoreWrapper';

interface TWithChildren {
  className?: string;
  children?: React.ReactNode;
}
type TAppWrapperProps = TWithChildren;

// // Placeholders...
// const PlaceholderComponent = ({ children }: TWithChildren) => <>{children}</>;
// const StoreWrapper = PlaceholderComponent;

export function AppWrapper(props: TAppWrapperProps): JSX.Element {
  const { children, className } = props;
  return (
    <CoreWrapper className={className}>
      {/* TODO: Expose root control nodes or use custom hooks? */}
      {children}
    </CoreWrapper>
  );
}
