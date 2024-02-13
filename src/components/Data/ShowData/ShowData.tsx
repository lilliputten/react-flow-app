import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';

import styles from './ShowData.module.scss';
import { useAppDataStore } from 'src/store/AppDataStore';

export const ShowData: React.FC = observer(() => {
  const appDataStore = useAppDataStore();
  const {
    // prettier-ignore
    // hasAllData,
    testData,
  } = appDataStore;
  /* // DEMO: Test scrolling functionality...
   * const testContent = Array.from(Array(25)).map((_, n) => {
   *   return <p key={n}>{n}</p>;
   * });
   */
  return (
    <Box className={styles.root}>
      {/* // NOTE: It's a little redundant: the component name and description are already shown in the select box above
      <Box className={styles.demoHeader}>
        {demoId ? (
          <span>
            <span className="dull">Displayed demo:</span> <strong>{demoId}</strong>
            {!!demoComponentText && <> – {demoComponentText}</>}
          </span>
        ) : (
          <span className={styles.dull}>No demo selected</span>
        )}
      </Box>
      */}
      <Box className={styles.mainContentBox}>
        <Box className={styles.scrollable}>
          {/* TODO: Display here a demo component */}
          <h2>Demo data dump:</h2>
          <pre>
            {/* DEBUG! */}
            {JSON.stringify(testData, null, 2)}
          </pre>
        </Box>
      </Box>
    </Box>
  );
});
