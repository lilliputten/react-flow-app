import { useLayoutEffect, useRef } from 'react';
import debounce from 'lodash.debounce';

type TCallback<T> = (target: T) => void;

const defaultUpdateResizeDelay = 50;

export function useResizeObserver<T extends HTMLElement>(
  callback: TCallback<T>,
  updateResizeDelay = defaultUpdateResizeDelay,
) {
  const ref = useRef<T>();
  useLayoutEffect(() => {
    const element = ref?.current;
    if (!element) {
      return;
    }
    const cb = debounce(callback.bind(null, element), updateResizeDelay);
    const observer = new ResizeObserver(cb);
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [callback, ref, updateResizeDelay]);
  return ref;
}
