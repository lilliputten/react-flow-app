import { ThemeProvider, createTheme, ThemeOptions, PaletteOptions } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
// import { lightBlue } from '@mui/material/colors';

import { TMuiThemeMode, defaultMuiThemeMode } from 'src/core/types';

import scssVariables from 'src/core/assets/scss/variables.module.scss';

export interface TMuiThemeParams {
  mode?: TMuiThemeMode;
}

/* // Example mui color: lightBlue:
 * lightBlue:
 *   50: '#e1f5fe'
 *   100: '#b3e5fc'
 *   200: '#81d4fa'
 *   300: '#4fc3f7'
 *   400: '#29b6f6'
 *   500: '#03a9f4'
 *   600: '#039be5'
 *   700: '#0288d1'
 *   800: '#0277bd'
 *   900: '#01579b'
 *   A100: '#80d8ff'
 *   A200: '#40c4ff'
 *   A400: '#00b0ff'
 *   A700: '#0091ea'
 */

function getMuiThemeOptions(params?: TMuiThemeParams) {
  const { mode = defaultMuiThemeMode } = params || {};
  const {
    // defaultFontSizePx,
    themeControlsRadiusPx,
  } = scssVariables;
  // const defaultFontSize = parseInt(defaultFontSizePx);
  const themeControlsRadius = parseInt(themeControlsRadiusPx);
  // TODO: Check for primaryMuiColors, secondaryMuiColors, defaultFontSizePx?
  const backgroundColor = mode === 'dark' ? '#000' : '#fff';
  const textColor = mode === 'dark' ? '#ddd' : '#333';
  const background = {
    default: backgroundColor,
    paper: backgroundColor,
  };
  const text = {
    primary: textColor,
  };
  const palette: PaletteOptions = {
    mode,
    background,
    text,
  };
  // @see https://mui.com/material-ui/customization/typography/
  const typography: TypographyOptions = {
    // TODO: To investigate the method of customizing mui theme font properties!
    // fontSize: defaultFontSize,
    // htmlFontSize: defaultFontSize,
    allVariants: {
      // NOTE: This setting affects all the elements.
      // fontSize: defaultFontSize,
    },
    button: {
      textTransform: 'none',
    },
  };
  const options: ThemeOptions = {
    // direction: 'rtl', // NOTE: Right to left direction. Rememeber to add `dir="rtl"` attribute to body tag.

    palette,
    typography,

    shape: {
      borderRadius: themeControlsRadius,
    },

    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },
    },

    // May be used in code:
    // - breakpoints
  };
  return options;
}

export function createCustomizedMuiTheme(params?: TMuiThemeParams) {
  const options = getMuiThemeOptions(params);
  const theme = createTheme(options);
  // DEBUG: Use this data to extend ThemeOptions data above
  // console.log('[mui-theme]: createCustomizedMuiTheme', params, theme);
  return theme;
}

export { ThemeProvider };
