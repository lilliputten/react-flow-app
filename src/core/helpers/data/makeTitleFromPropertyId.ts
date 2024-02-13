import { ucFirst } from 'src/core/helpers/basic';

interface TMakeTitleFromPropertyIdOpts {
  parseCamelCase?: boolean;
  // TODO: decapitalize?
}

export function makeTitleFromPropertyId(id: string, opts?: TMakeTitleFromPropertyIdOpts) {
  if (opts?.parseCamelCase) {
    id = id.replace(/([\Wa-z0-9])([A-Z])/g, '$1 $2');
  }
  const title = ucFirst(id.trim())
    .replace(/[_ \t-]+/g, ' ')
    .replace(/\buuid\b/gi, 'UUID');
  return title;
}
