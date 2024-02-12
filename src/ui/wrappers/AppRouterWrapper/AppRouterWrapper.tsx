import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import classNames from 'classnames';

import { showError } from 'src/ui/Basic';
import { getErrorText } from 'src/core/helpers/basic';
import { TPropsWithChildrenAndClassName } from 'src/core/types';
import { AppSessionStore, useAppSessionStore } from 'src/store/AppSessionStore';

// import { AppCore } from 'src/components/App/AppCore';
import { AppRouterWrapperWaiter } from './AppRouterWrapperWaiter';
import { HelpModal } from 'src/components/Help/HelpModal';
import { Demo } from 'src/components/Demo';
// import { DemoPage } from 'src/pages/DemoPage';

import styles from './AppRouterWrapper.module.scss';

// DEBUG: Unimplemented component stubs!
const PlaceholderComponent = (id: string) => () => (
  <Box className={classNames('AppRouterWrapperPlaceholder', id)}>
    Placeholder component: <strong>{id}</strong>
  </Box>
);
const AppRouterWrapperFinished = PlaceholderComponent('AppRouterWrapperFinished');

type TAppRouterWrapperProps = TPropsWithChildrenAndClassName;

interface TCurrentComponentProps extends TAppRouterWrapperProps {
  rootState: typeof AppSessionStore.prototype.rootState;
}

/** Components router */
const RenderCurrentComponent: React.FC<TCurrentComponentProps> = (props) => {
  const {
    // prettier-ignore
    rootState,
    children,
  } = props;
  /*
  return <>{rootState}</>;
  */
  switch (rootState) {
    case 'waiting':
      return <AppRouterWrapperWaiter />;
    case 'demo':
      return <Demo />;
    case 'finished':
      return <AppRouterWrapperFinished />;
    case 'ready':
      // return <AppCore themeMode={themeMode} />;
      return <>{children}</>;
    // case 'welcome': // UNUSED!
    //   return <AppRouterWrapperWelcome />;
  }
};

function useAppSessionInit() {
  const appSessionStore = useAppSessionStore();
  React.useEffect(() => {
    // Init store...
    appSessionStore.setInited(true);
    // Init options, parameters and settings...
    appSessionStore
      .initSettings()
      .then(() => {
        appSessionStore.setReady(true);
      })
      .catch((error) => {
        const errMsg = [
          // prettier-ignore
          'Cannot to initialize app session store settings',
          getErrorText(error),
        ]
          .filter(Boolean)
          .join(': ');
        const err = new Error(errMsg);
        // eslint-disable-next-line no-console
        console.error('[AppWrapper:useAppSessionStore]', errMsg, {
          err,
          error,
        });
        // eslint-disable-next-line no-debugger
        debugger;
        showError(err);
        // throw error;
      });
  }, [appSessionStore]);
}

/** Choose & render suitable application part */
const RenderContent: React.FC<TAppRouterWrapperProps> = observer((props) => {
  useAppSessionInit();
  const appSessionStore = useAppSessionStore();
  const { rootState } = appSessionStore;
  // TODO: Wrap with error & loader splash renderer?
  return (
    <>
      <RenderCurrentComponent
        // prettier-ignore
        rootState={rootState}
        {...props}
      />
      <HelpModal />
    </>
  );
});

export const AppRouterWrapper: React.FC<TAppRouterWrapperProps> = (props) => {
  const { className } = props;
  return (
    <Box className={classNames(className, styles.root)}>
      <RenderContent {...props} />
    </Box>
  );
};
