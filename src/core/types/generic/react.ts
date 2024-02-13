import React from 'react';

export interface TPropsWithClassName {
  className?: string;
}
export type TPropsWithChildrenAndClassName = React.PropsWithChildren & TPropsWithClassName;

export function isClassComponent(component: unknown) {
  return typeof component === 'function' && !!component.prototype.isReactComponent;
}

export function isFunctionComponent(component: unknown) {
  return (
    typeof component === 'function' && String(component).includes('return React.createElement')
  );
}

export function isReactComponent(component: unknown) {
  return isClassComponent(component) || isFunctionComponent(component);
}

export function isElement(element: unknown) {
  return React.isValidElement(element);
}

export function isDOMTypeElement(element: unknown) {
  return React.isValidElement(element) && typeof element.type === 'string';
}

export function isCompositeTypeElement(element: unknown) {
  return React.isValidElement(element) && typeof element.type === 'function';
}
