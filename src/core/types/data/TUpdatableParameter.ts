export type TParamType = 'number' | 'string' | 'boolean';
export type TValidValues = undefined | readonly string[];
export interface TUpdatableParameter<T extends string = string> {
  id: T;
  type: TParamType;
  validValues?: TValidValues;
}
