import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Stack, Button, Container } from '@mui/material';
import { DriveFolderUpload, Delete, BarChart } from '@mui/icons-material';
import classNames from 'classnames';

import {
  TDataFileUploadInfo,
  TPropsWithClassName,
  TTestData,
  // TEdgesData,
  // TFlowsData,
  // TGraphsData,
  // TNodesData,
} from 'src/core/types';
import { useAppSessionStore } from 'src/store/AppSessionStore';
import { getAppDataInfo, useAppDataStore } from 'src/store/AppDataStore';
import { UploadAppDataField } from 'src/components/LoadData/UploadAppDataField';

import { LoadSplash } from 'src/components/LoadData/LoadSplash';

import styles from './LoadDataPage.module.scss';

/* // DEBUG: Unimplemented component stubs!
 * const PlaceholderComponent = (id: string) => () => (
 *   <Box className={classNames('AppRouterWrapperPlaceholder', id)}>
 *     Placeholder component: <strong>{id}</strong>
 *   </Box>
 * );
 * const LoadSplash = PlaceholderComponent('LoadSplash');
 */

export const LoadDataPage: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const appSessionStore = useAppSessionStore();
  const {
    // prettier-ignore
    doAutoLoad: defaultAutoLoad,
    doAutoStart, // : defaultAutoStart,
    autoLoadUrlTest,
    // autoLoadUrlEdges,
    // autoLoadUrlFlows,
    // autoLoadUrlGraphs,
    // autoLoadUrlNodes,
  } = appSessionStore;
  const appDataStore = useAppDataStore();
  const {
    // prettier-ignore
    testData,
    // edgesData,
    // flowsData,
    // graphsData,
    // nodesData,
    hasAllData,
    hasSomeData,
  } = appDataStore;
  const [doAutoLoad, setAutoLoad] = React.useState(defaultAutoLoad);
  /** Start core application if all the data is ready... */
  const doVisualize = React.useCallback(() => {
    // TODO: Initialize stores...
    // Eg: appSessionStore.updateHiddenGraphNodes();
    // All data is ready
    appDataStore.setReady(true);
  }, [appDataStore]);
  const doResetData = React.useCallback(() => {
    // Clear all the data...
    setAutoLoad(false);
    appDataStore.clearFileInfos();
    appDataStore.setTestData(undefined);
    // appDataStore.setEdgesData(undefined);
    // appDataStore.setFlowsData(undefined);
    // appDataStore.setGraphsData(undefined);
    // appDataStore.setNodesData(undefined);
  }, [appDataStore]);
  /** Handle loaded test data... */
  const handleTestData = React.useCallback(
    (testData?: TTestData) => {
      appDataStore.setTestData(testData);
    },
    [appDataStore],
  );
  // Auto start visualization...
  React.useEffect(() => {
    if (hasAllData && doAutoStart) {
      doVisualize();
    }
  }, [hasAllData, doAutoStart, doVisualize]);
  const setFileInfo = React.useCallback(
    (info?: TDataFileUploadInfo) => {
      if (info) {
        const { fileId } = info;
        appDataStore.setFileInfo(fileId, info);
      }
    },
    [appDataStore],
  );
  return (
    <Container className={classNames(className, styles.root)} maxWidth="md">
      <LoadSplash className={classNames(styles.section, styles.splash)} />
      <Stack className={classNames(styles.section, styles.inputFields)} gap={1}>
        <UploadAppDataField
          id="testData"
          dataName="test data"
          setData={handleTestData}
          defaultLoaded={!!testData}
          dataInfo={getAppDataInfo(testData)}
          autoLoadUrl={doAutoLoad ? autoLoadUrlTest : undefined}
          setFileInfo={setFileInfo}
          className={styles.uploadButton}
        />
      </Stack>
      <Box className={classNames(styles.section, styles.actions)}>
        <Button
          // prettier-ignore
          variant="contained"
          onClick={doVisualize}
          startIcon={<BarChart />}
          disabled={!hasAllData}
        >
          Visualize
        </Button>
        <Button
          // prettier-ignore
          variant="contained"
          onClick={() => setAutoLoad(true)}
          color="secondary"
          startIcon={<DriveFolderUpload />}
          disabled={hasAllData}
        >
          Load default datasets
        </Button>
        <Button
          // prettier-ignore
          variant="contained"
          onClick={doResetData}
          color="error"
          startIcon={<Delete />}
          disabled={!hasSomeData}
        >
          Reset loaded data
        </Button>
      </Box>
    </Container>
  );
});
