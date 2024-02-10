/** The list of available chart engines */
export const validMuiThemeModes = [
  // prettier-ignore
  'light',
  'dark',
] as const;

// NOTE: Don't forget to update the library selection method in `src/components/SankeyHooks/useChartComponent.ts`

export type TMuiThemeMode = (typeof validMuiThemeModes)[number];

/** Default chart engine */
export const defaultMuiThemeMode: TMuiThemeMode = validMuiThemeModes[0];

export const muiThemeModeNames: Record<TMuiThemeMode, string> = {
  light: 'Light',
  dark: 'Dark',
};
