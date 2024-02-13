import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Stack, Button, Container } from '@mui/material';
import { Check, DriveFolderUpload, Delete } from '@mui/icons-material';
import classNames from 'classnames';

import {
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

// import { InfoContent } from './InfoContent';

import styles from './LoadDataPage.module.scss';

// DEBUG: Unimplemented component stubs!
const PlaceholderComponent = (id: string) => () => (
  <Box className={classNames('AppRouterWrapperPlaceholder', id)}>
    Placeholder component: <strong>{id}</strong>
  </Box>
);
const InfoContent = PlaceholderComponent('InfoContent');

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
  } = appDataStore;
  const [doAutoLoad, setAutoLoad] = React.useState(defaultAutoLoad);
  // const [doAutoStart, setAutoStart] = React.useState(defaultAutoStart);
  /** If data has already loaded then it's possible to go to core visualizer/editor */
  const [isAllDataLoaded, setAllDataLoaded] = React.useState(false);
  const [isSomeDataLoaded, setSomeDataLoaded] = React.useState(false);
  /** Start core application if all the data is ready... */
  const doVisualize = React.useCallback(() => {
    // TODO: Initialize stores...
    // appSessionStore.updateHiddenGraphNodes();
    // All data is ready
    appDataStore.setReady(true);
  }, [appDataStore]);
  const doResetData = React.useCallback(() => {
    // Clear all the data...
    setAutoLoad(false);
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
  // Calculate overall loading status depending on all data loading status
  React.useEffect(() => {
    const isAllDataLoaded = !!(testData /* && edgesData && flowsData && graphsData && nodesData */);
    const isSomeDataLoaded = !!(
      testData /* || edgesData || flowsData || graphsData || nodesData */
    );
    setAllDataLoaded(isAllDataLoaded);
    setSomeDataLoaded(isSomeDataLoaded);
  }, [testData /*, edgesData, flowsData, graphsData, nodesData */]);
  // Auto start visualization...
  React.useEffect(() => {
    if (isAllDataLoaded && doAutoStart) {
      doVisualize();
    }
  }, [isAllDataLoaded, doAutoStart, doVisualize]);
  return (
    <Container className={classNames(className, styles.root)} maxWidth="md">
      <Box className={classNames(styles.section, styles.content)}>
        <InfoContent />
      </Box>
      <Stack className={classNames(styles.section, styles.inputFields)} gap={1}>
        <UploadAppDataField
          id="testData"
          dataName="test data"
          setData={handleTestData}
          defaultLoaded={!!testData}
          dataInfo={getAppDataInfo(testData)}
          autoLoadUrl={doAutoLoad ? autoLoadUrlTest : undefined}
          className={styles.uploadButton}
        />
      </Stack>
      <Box className={classNames(styles.section, styles.actions)}>
        <Button
          // prettier-ignore
          variant="contained"
          onClick={doVisualize}
          startIcon={<Check />}
          disabled={!isAllDataLoaded}
        >
          Visualize
        </Button>
        <Button
          // prettier-ignore
          variant="contained"
          onClick={() => setAutoLoad(true)}
          color="secondary"
          startIcon={<DriveFolderUpload />}
          disabled={isAllDataLoaded}
        >
          Load default datasets
        </Button>
        <Button
          // prettier-ignore
          variant="contained"
          onClick={doResetData}
          color="error"
          startIcon={<Delete />}
          disabled={!isSomeDataLoaded}
        >
          Reset loaded data
        </Button>
      </Box>
    </Container>
  );
});
