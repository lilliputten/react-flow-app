import {
  ThemeProvider,
  createTheme,
  ThemeOptions,
  PaletteOptions,
  PaletteColorOptions,
  Theme,
} from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import tinycolor from 'tinycolor2';

import { TMuiThemeMode, defaultMuiThemeMode } from 'src/core/types';

import {
  defaultFontSize,
  defaultFontSizeRem,
  themeControlsRadius,
  primaryColor,
  secondaryColor,
  defaultBackgroundColor,
  defaultBackgroundColorDark,
  defaultTextColor,
  defaultTextColorDark,
} from 'src/core/assets/scss';

export interface TMuiThemeParams {
  mode?: TMuiThemeMode;
}

/* // Example mui color: lightBlue:
 * import { lightBlue } from '@mui/material/colors';
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
/* Default plaette primary color object:
 *   contrastText: "#fff"
 *   dark: "#1565c0"
 *   light: "#42a5f5"
 *   main: "#1976d2"
 */

function getColorObject(color: string) {
  const darkCmp = tinycolor(color).darken(20);
  const dark = tinycolor(color).darken(10).toHexString();
  const light = tinycolor(color).lighten(10).toHexString();
  const colorObj: PaletteColorOptions = {
    main: color,
    dark,
    light,
    contrastText: tinycolor.mostReadable(darkCmp, ['#fff', '#000']).toHexString(),
  };
  return colorObj;
}

function getMuiThemeOptions(params?: TMuiThemeParams) {
  const { mode = defaultMuiThemeMode } = params || {};
  // TODO: Check for primaryMuiColors, secondaryMuiColors, defaultFontSizePx?
  const isDark = mode === 'dark';
  const backgroundColor = isDark ? defaultBackgroundColorDark : defaultBackgroundColor;
  const textColor = isDark ? defaultTextColorDark : defaultTextColor;
  const background = {
    default: backgroundColor,
    paper: backgroundColor,
  };
  const text = {
    primary: textColor,
  };
  const palette: PaletteOptions = {
    primary: getColorObject(primaryColor),
    secondary: getColorObject(secondaryColor),
    mode,
    background,
    text,
  };
  // @see https://mui.com/material-ui/customization/typography/
  const typography: TypographyOptions = {
    // TODO: To investigate the method of customizing mui theme font properties!
    fontSize: defaultFontSizeRem,
    htmlFontSize: defaultFontSizeRem,
    allVariants: {
      // NOTE: This setting affects all the elements.
      fontSize: defaultFontSize,
    },
    button: {
      textTransform: 'none',
      fontWeight: 'normal',
      lineHeight: 'normal', // Fix vertical alignment bug
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
  /* console.log('[mui-theme:getMuiThemeOptions]', {
   *   defaultBackgroundColor,
   *   defaultBackgroundColorDark,
   *   defaultTextColor,
   *   defaultTextColorDark,
   *   typography,
   *   options,
   *   background,
   *   text,
   * });
   */
  return options;
}

export function createCustomizedMuiTheme(params?: TMuiThemeParams) {
  const options = getMuiThemeOptions(params);
  const theme: Theme = createTheme(options);
  /* // DEBUG: Use this data to extend ThemeOptions data above
   * console.log('[mui-theme]: createCustomizedMuiTheme', params, theme, {
   *   // contrastThreshold: theme.palette.contrastThreshold, // 3
   *   // tonalOffset: theme.palette.tonalOffset, // 0.2
   *   // primary: theme.palette.primary,
   *   breakpoints: theme.breakpoints,
   *   params,
   *   theme,
   * });
   */
  return theme;
}

export { ThemeProvider };
