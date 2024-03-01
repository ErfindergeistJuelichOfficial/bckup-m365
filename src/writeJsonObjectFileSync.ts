import fs from 'fs';

export function writeJsonObjectFileSync(path: string, json: object[]) {
  return fs.writeFileSync(path, JSON.stringify(json, null, 2), 'utf8');
}