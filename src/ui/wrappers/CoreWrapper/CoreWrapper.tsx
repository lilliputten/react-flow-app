import React from 'react';
import { CssBaseline, Typography } from '@mui/material';
import classNames from 'classnames';

import { WithToastsWrapper } from 'src/ui/Basic';
import styles from './CoreWrapper.module.scss';

export interface TCoreWrapperProps extends JSX.IntrinsicAttributes {
  className?: string;
  children: React.ReactNode;
  // themeMode?: TMuiThemeMode;
}

export function CoreWrapper(props: TCoreWrapperProps) {
  const { children, className } = props;
  // TODO: `useGlobalCssClasses`?
  return (
    <>
      {/* Theme root for app-through typograpy support */}
      <CssBaseline />
      <Typography className={classNames(className, styles.container)} component="div">
        {/* Toasts support */}
        <WithToastsWrapper>
          {/* Core content */}
          {children}
        </WithToastsWrapper>
      </Typography>
    </>
  );
}
