/** @module typescript
 *  @descr Typescript helpers.
 *  @since 2023.01.26, 20:43
 *  @changed 2023.01.26, 20:43
 */

export type TEnumValue = number | string;
export function getEnumKeys(obj: { [key: string]: TEnumValue }): string[] {
  const keys = Object.keys(obj);
  const list = keys.reduce<string[]>((list, key) => {
    const val = obj[key];
    const isNumericKey = !isNaN(parseInt(key, 10));
    const isValueExists = val != null;
    if (!list.includes(key) && isValueExists && !isNumericKey) {
      list.push(key);
    }
    return list;
  }, []);
  return list;
}
export function getEnumValues(obj: { [key: string]: number | string }): TEnumValue[] {
  const keys = getEnumKeys(obj);
  return keys.map((key) => obj[key]);
}
export function getEnumMap(obj: { [key: string]: number | string }): { [key: TEnumValue]: string } {
  const keys = getEnumKeys(obj);
  return keys.reduce((result, key) => {
    const val = obj[key];
    return { ...result, [val]: key };
  }, {});
}
