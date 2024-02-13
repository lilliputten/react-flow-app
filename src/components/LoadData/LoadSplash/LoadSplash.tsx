import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import { TPropsWithClassName } from 'src/core/types';
import { useAppSessionStore } from 'src/store';

import styles from './LoadSplash.module.scss';

export const LoadSplash: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const appSessionStore = useAppSessionStore();
  const {
    // prettier-ignore
    themeMode,
  } = appSessionStore;
  const isDark = themeMode === 'dark';
  return (
    <div className={classNames(className, styles.root, isDark && styles.dark)}>
      <div className={classNames(styles.splashBg)}></div>
      <div className={classNames(styles.splashContent)}>
        {/* TODO: Show logo or smth else... */}
        <div className={styles.splashMotto}>A detailed application info or promo...</div>
      </div>
    </div>
  );
});
