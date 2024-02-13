import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { TDemoComponent } from 'src/core/types';
import { DemoCheckDataStore } from './Tests/DemoCheckDataStore';

import styles from './Demo.module.scss';

interface TOption {
  value: string;
  content: string | React.ReactNode;
}

const demoComponents: Record<string, TDemoComponent> = {
  DemoCheckDataStore: DemoCheckDataStore,
};
const demoTexts: Record<string, string> = {
  // DemoCheckDataStore: 'Check data store',
};

const demoOptions: TOption[] = Object.keys(demoComponents).map((id) => {
  const Component = demoComponents[id];
  const text = demoTexts[id] || Component?.__title;
  return {
    value: id,
    content: text ? (
      <>
        {id} <span className="dull">&nbsp;– {text}</span>
      </>
    ) : (
      id
    ),
  };
});

// The local storage is used to save last demo (to make it 'sticky')
const hasLocalStorage = typeof localStorage !== 'undefined';
const storagePrefix = 'Demo:';
const storageId = storagePrefix + 'id';

export function Demo() {
  const [demoId, setDemoId] = React.useState(
    // NOTE: Use saved option if any...
    (hasLocalStorage && localStorage.getItem(storageId)) || '',
  );
  const DemoComponent = React.useMemo(() => {
    return demoComponents[demoId];
  }, [demoId]);
  /* // UNUSED: demoComponentText -- To display extra info about the demo component
   * const demoComponentText = React.useMemo(() => {
   *   return demoTexts[demoId] || DemoComponent?.__title;
   * }, [DemoComponent, demoId]);
   */
  // TODO: Remember last demo
  const handleChange = (event: SelectChangeEvent) => {
    const val = event.target.value;
    setDemoId(val);
    // Save option to the future use...
    if (hasLocalStorage) {
      localStorage.setItem(storageId, val);
    }
  };
  /* // DEMO: Test scrolling functionality...
   * const testContent = Array.from(Array(25)).map((_, n) => {
   *   return <p key={n}>{n}</p>;
   * });
   */
  return (
    <Box className={styles.root}>
      <Box className={styles.selectorBox}>
        {/* TODO: Selector */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Demo component</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={demoId}
            label="Demo component"
            onChange={handleChange}
            sx={{ minWidth: 300 }}
            fullWidth
          >
            {demoOptions.map(({ value, content }) => (
              <MenuItem key={value} value={value}>
                {content}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* // NOTE: It's a little redundant to show the demo fetails here: the component name and description are already shown in the select box above
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
      <Box className={styles.demoBox} id={demoId}>
        <Box className={styles.scrollable}>
          {/* TODO: Display here a demo component */}
          {DemoComponent && <DemoComponent />}
        </Box>
      </Box>
    </Box>
  );
}
