export const appDataKeys = [
  // prettier-ignore
  'testData',
] as const;
export type TAppDataKey = (typeof appDataKeys)[number];
