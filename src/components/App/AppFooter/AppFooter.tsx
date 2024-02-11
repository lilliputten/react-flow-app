import * as React from 'react';
import classNames from 'classnames';

import { TPropsWithClassName } from 'src/core/types';
import {
  version,
  timestamp,
  // isDev,
  // demoPageUrl,
  // mainPageUrl,
  // // TODO: Show state depending on the current page
} from 'src/core/constants/config';

import styles from './AppFooter.module.scss';

export const AppFooter: React.FC<TPropsWithClassName> = (props) => {
  const appInfo = `Version: ${version} @${timestamp}`;
  const { className } = props;
  return (
    <div className={classNames(className, styles.root)}>
      <div className={classNames(styles.leftInfo)}>
        {/* Current state info */}
        {/* TODO: Show current data state */}
      </div>
      <div className={classNames(styles.rightInfo)}>
        {/* Application info */}
        {appInfo}
      </div>
    </div>
  );
};
