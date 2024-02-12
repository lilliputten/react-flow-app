import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import { TPropsWithClassName } from 'src/core/types';
import { useAppSessionStore } from 'src/store/AppSessionStore';
import { HelpContent } from 'src/components/Help/HelpContent';
import { DialogPopupPaper } from 'src/components/MUI/DialogPopupPaper';

import styles from './HelpModal.module.scss';

export const HelpModal: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const appSessionStore = useAppSessionStore();
  const { showHelp } = appSessionStore;
  // TODO: Fetch & store graph data from and to `AppDataStore` with `graphId`
  const closeModal = () => {
    appSessionStore.setShowHelp(false);
  };
  const title = 'Application help';
  // @see https://mui.com/material-ui/react-dialog/
  return (
    <Dialog
      className={classNames(className, styles.root)}
      open={showHelp}
      onClose={closeModal}
      maxWidth="md"
      PaperComponent={DialogPopupPaper}
    >
      <DialogTitle className={styles.title}>
        <Box flexGrow={1} className={styles.titleText}>
          {title}
        </Box>
        <Box>
          <IconButton onClick={closeModal}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <HelpContent />
      </DialogContent>
      {/* NOTE: Close action isn't used: we have close button on the top panel
      <DialogActions>
        <Button onClick={closeModal}>Close help</Button>
      </DialogActions>
       */}
    </Dialog>
  );
});
