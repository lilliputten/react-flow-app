/** @module functions
 *  @descr Object helpers.
 *  @since 2023.01.26, 20:43
 *  @changed 2023.01.26, 20:43
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NOOP(..._args: unknown[]): void {
  // @typescript-eslint/no-empty-function
}

/** Compose functions
 * @param {function[]} funcs
 * @return function
 */
type TComposingFunc = (arg?: unknown) => unknown;
export function composeList(funcs: TComposingFunc[]) {
  return function composed(args?: unknown) {
    return funcs.reduce((arg, func) => {
      return func(arg);
    }, args);
  };
}
/** Interface to composeList: pass functions as arguments */
export function composeArgs(...funcs: TComposingFunc[]): TComposingFunc {
  return composeList(funcs);
}

type TFn<P> = (a: P) => P;
export function compose<P = unknown>(fn1: TFn<P>, ...fns: TFn<P>[]) {
  return fns.reduce((prevFn, nextFn) => (value) => prevFn(nextFn(value)), fn1);
}
