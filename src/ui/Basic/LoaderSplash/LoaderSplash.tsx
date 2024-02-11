import { CircularProgress } from '@mui/material';
import classNames from 'classnames';

import { ThemeWrapper } from 'src/ui/wrappers/ThemeWrapper';
import { TMuiThemeMode } from 'src/core/types';

import styles from './LoaderSplash.module.scss';

export type TSplashMode = 'cover';

interface TLoaderSplashProps {
  className?: string;
  fullSize?: boolean;
  show?: boolean;
  mode?: TSplashMode;
  themeMode?: TMuiThemeMode;
}

export function LoaderSplash(props: TLoaderSplashProps): JSX.Element {
  const { className, fullSize, show = true, mode, themeMode } = props;
  const resultedClassName = classNames(
    className,
    styles.container,
    mode && styles['mode_' + mode],
    fullSize && styles.fullSize,
    show || styles.hidden,
  );
  // @see https://mui.com/material-ui/react-progress/
  return (
    <ThemeWrapper themeMode={themeMode} className={resultedClassName}>
      <CircularProgress />
    </ThemeWrapper>
  );
}
