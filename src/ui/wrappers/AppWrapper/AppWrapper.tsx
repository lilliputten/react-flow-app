import { CoreWrapper } from 'src/ui/wrappers/CoreWrapper';
import { AppSessionStoreProvider } from 'src/store/AppSessionStore';
import { AppDataStoreProvider } from 'src/store/AppDataStore';
import { TPropsWithChildrenAndClassName } from 'src/core/types';

type TAppWrapperProps = TPropsWithChildrenAndClassName;

export function AppWrapper(props: TAppWrapperProps): JSX.Element {
  const { children, className } = props;
  return (
    <CoreWrapper className={className}>
      <AppSessionStoreProvider>
        {/* NOTE: AppDataStoreProvider can be situated on the lower level */}
        <AppDataStoreProvider>
          {/* TODO: Expose root control nodes or use custom hooks? */}
          {children}
        </AppDataStoreProvider>
      </AppSessionStoreProvider>
    </CoreWrapper>
  );
}
