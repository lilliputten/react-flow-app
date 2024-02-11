import classnames from 'classnames';

// MUI...
import Stack from '@mui/material/Stack';

import styles from './Scrollable.module.scss';

interface TScrollableProps {
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  scrollable?: boolean;
}

export function Scrollable(props: TScrollableProps): JSX.Element {
  const { className, containerClassName, children, scrollable = true } = props;
  // prettier-ignore
  return (
    <Stack
      className={classnames(
        className,
        styles.root,
        scrollable ? styles.scrollable : styles.clippable,
      )}
      flex={1}
    >
      <Stack className={classnames(containerClassName, styles.container)} flex={1}>
        {children}
      </Stack>
    </Stack>
  );
}
