import * as React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Favorite, LocationOn, Restore } from '@mui/icons-material';
import classNames from 'classnames';

import { TPropsWithClassName } from 'src/core/types';
// import { ThemeWrapper } from 'src/ui/wrappers/ThemeWrapper';
// import { TMuiThemeMode } from 'src/core/types';

import styles from './AppFooter.module.scss';

export const AppFooter: React.FC<TPropsWithClassName> = (props) => {
  const { className } = props;
  const [value, setValue] = React.useState('Recents');
  const handleValue = (event: React.SyntheticEvent<Element, Event>, value: string) => {
    setValue(value);
  };
  return (
    <BottomNavigation
      className={classNames(className, styles.root)}
      showLabels
      value={value}
      onChange={handleValue}
    >
      <BottomNavigationAction label="Recents" value="Recents" icon={<Restore />} />
      <BottomNavigationAction label="Favorites" value="Favorites" icon={<Favorite />} />
      <BottomNavigationAction label="Nearby" value="Nearby" icon={<LocationOn />} />
    </BottomNavigation>
  );
};
