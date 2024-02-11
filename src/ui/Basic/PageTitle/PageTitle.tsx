import React from 'react';
import Typography from '@mui/material/Typography';
import classnames from 'classnames';

import { TPropsWithChildrenAndClassName } from 'src/core/types';

import styles from './PageTitle.module.scss';

export const PageTitle: React.FC<TPropsWithChildrenAndClassName> = (props) => {
  const { children, className } = props;
  return (
    <Typography
      className={classnames(className, styles.root)}
      fontSize="24px"
      variant="h2"
      fontWeight="600"
      color="#333"
      mb={3}
    >
      {children}
    </Typography>
  );
};
