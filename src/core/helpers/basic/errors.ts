export function getErrorText(err?: Error | string | unknown): string {
  return err ? (err instanceof Error ? err.message : String(err)) : '';
}

export function derivedErrorMessage(text: Error | string, parentError?: Error | string): string {
  return [getErrorText(text), getErrorText(parentError)].filter(Boolean).join(': ');
}
// TODO: Errors composer?
