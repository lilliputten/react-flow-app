/** @module promises
 *  @descr Promise-related helpers.
 *  @since 2023.01.26, 20:43
 *  @changed 2023.01.26, 20:43
 */

import { NOOP } from 'src/core/helpers/basic/functions';

export interface TDeferred<T = void> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (error?: unknown) => void;
}

export function Deferred<T>(): TDeferred<T> {
  let resolve = NOOP as (value: T | PromiseLike<T>) => void;
  let reject = NOOP;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  const defer: TDeferred<T> = {
    promise,
    resolve,
    reject,
  };
  return defer;
}

export function asyncPromiseState(promise: Promise<unknown>): Promise<string> {
  // See also `config.constants:promiseStatusTexts` -- for `vow` module
  const temp = {};
  return Promise.race([promise, temp]).then(
    (value) => (value === temp ? 'PENDING' : 'FULFILLED'),
    () => 'REJECTED',
  );
}

export function dalayedPromise<T = void>(delay: number, result?: T): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(resolve, delay, result);
  });
}
