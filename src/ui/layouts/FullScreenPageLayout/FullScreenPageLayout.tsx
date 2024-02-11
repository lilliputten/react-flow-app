import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import classNames from 'classnames';

import { ThemeWrapper } from 'src/ui/wrappers/ThemeWrapper';
import { AppHeader } from 'src/components/App/AppHeader';
import { AppFooter } from 'src/components/App/AppFooter';
import { useAppSessionStore } from 'src/store';

import styles from './FullScreenPageLayout.module.scss';

export interface TFullScreenPageLayoutProps {
  className?: string;
  children?: React.ReactNode;
}

export const FullScreenPageLayout: React.FC<TFullScreenPageLayoutProps> = observer(
  (props): JSX.Element => {
    // NOTE: Get props from nextjs (as `pageProps`)
    const { className, children } = props;
    const appSessionStore = useAppSessionStore();
    const { themeMode } = appSessionStore;
    return (
      <ThemeWrapper className={classNames(className, styles.root)} themeMode={themeMode} fullSize>
        <AppHeader className={styles.header} />
        <Box className={styles.content}>{children}</Box>
        <AppFooter className={styles.footer} />
      </ThemeWrapper>
    );
  },
);
