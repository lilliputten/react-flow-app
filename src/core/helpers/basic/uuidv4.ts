import { UUID } from 'src/core/types';

const longTemplate = '11111111-1111-1111-1111-111111111111';
const shortTemplate = '111-111-1111';

function uuidByTemplate(template: string): UUID {
  return template.replace(/[018]/g, () =>
    (crypto.getRandomValues(new Uint8Array(1))[0] & 15).toString(16),
  );
}

export function uuidv4() {
  return uuidByTemplate(shortTemplate);
}

export function longUuidv4() {
  return uuidByTemplate(longTemplate);
}
