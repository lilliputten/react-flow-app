import React from 'react';
import { observer } from 'mobx-react-lite';
import { Paper, PaperProps } from '@mui/material';

import { useAppSessionStore } from 'src/store/AppSessionStore';
import { createCustomizedMuiTheme, ThemeProvider } from 'src/core/global/mui-theme';

export const DialogPopupPaper: React.FC<PaperProps> = observer((props) => {
  const { className, children, elevation = 2 } = props;
  const appSessionStore = useAppSessionStore();
  const { themeMode } = appSessionStore;
  const theme = React.useMemo(() => createCustomizedMuiTheme({ mode: themeMode }), [themeMode]);
  // See https://mui.com/material-ui/api/paper/
  return (
    <ThemeProvider theme={theme}>
      <Paper className={className} elevation={elevation}>
        <>{children}</>
      </Paper>
    </ThemeProvider>
  );
});
