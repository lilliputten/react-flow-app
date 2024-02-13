import { getErrorText } from 'src/core/helpers/basic';

export function safeParseJson<T = unknown>(jsonText?: string): T | undefined {
  if (!jsonText) {
    return undefined;
  }
  /* console.log('[loadDemoData:safeParseJson:start] text', {
   *   jsonText,
   * });
   */
  if (jsonText.includes('NaN')) {
    jsonText = jsonText.replace(/(:\s*)NaN($|,)/g, '$1null$2');
  }
  // TODO: Check json validity
  try {
    return JSON.parse(jsonText);
  } catch (error) {
    const errMsg = getErrorText(error);
    const reason = ['Failed to parse json data', errMsg].filter(Boolean).join(': ');
    const nextError = new Error(reason);
    // eslint-disable-next-line no-console
    console.error('[loadDemoData:safeParseJson]: error', reason, {
      reason,
      error,
      jsonText,
    });
    // eslint-disable-next-line no-debugger
    debugger;
    throw nextError;
  }
}
