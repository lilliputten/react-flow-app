import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import styles from './Demo.module.scss';

interface TOption {
  value: string;
  text: string;
}
const demosList = [
  // prettier-ignore
  'Sample',
  'Second',
];
const demos: TOption[] = demosList.map((id) => ({ value: id, text: id }));

// The local storage is used to save last demo (to make it 'sticky')
const hasLocalStorage = typeof localStorage !== 'undefined';
const storagePrefix = 'Demo:';
const storageId = storagePrefix + 'option';

export function Demo() {
  const [demoOption, setDemoOption] = React.useState(
    // NOTE: Use saved option if any...
    (hasLocalStorage && localStorage.getItem(storageId)) || '',
  );
  // TODO: Remember last demo
  const handleChange = (event: SelectChangeEvent) => {
    const val = event.target.value;
    setDemoOption(val);
    // Save option to the future use...
    if (hasLocalStorage) {
      localStorage.setItem(storageId, val);
    }
  };
  // DEMO: Test scrolling functionality...
  const test = Array.from(Array(25));
  const testContent = test.map((_, n) => {
    return <p key={n}>{n}</p>;
  });
  return (
    <Box className={styles.root}>
      <Box className={styles.selectorBox}>
        {/* TODO: Selector */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Demo option</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={demoOption}
            label="Select demo"
            onChange={handleChange}
            sx={{ minWidth: 300 }}
            fullWidth
          >
            {demos.map(({ value, text }) => (
              <MenuItem key={value} value={value}>
                {text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box className={styles.demoHeader}>
        <Typography>
          {demoOption ? (
            <span>
              Displayed demo: <strong>{demoOption}</strong>
            </span>
          ) : (
            <span className={styles.dull}>No demo selected</span>
          )}
        </Typography>
      </Box>
      <Box className={styles.demoBox}>
        <Box className={styles.scrollable}>
          {/* TODO: Display here a demo component */}
          {testContent}
        </Box>
      </Box>
    </Box>
  );
}
