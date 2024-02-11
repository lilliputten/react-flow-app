import React from 'react';
import classNames from 'classnames';

import Button from '@mui/material/Button';

import { LoaderSplash } from 'src/ui/Basic';
import { AppWrapper } from 'src/ui/wrappers/AppWrapper';

import styles from './TestPage.module.scss';
import { ThemeWrapper } from 'src/ui/wrappers/ThemeWrapper';

export function TestPage() {
  const [waiting, setWaiting] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setWaiting(false);
    }, 1500);
  }, []);
  return (
    <AppWrapper className={classNames(styles.root)}>
      <ThemeWrapper>
        <div>TestPage</div>
        <Button variant="contained">Hello world</Button>
        <LoaderSplash show={waiting} mode="cover" fullSize />
      </ThemeWrapper>
    </AppWrapper>
  );
}
