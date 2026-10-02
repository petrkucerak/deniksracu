// Converts the legacy _toilets/*.json files into one normalized dataset
// bundled with the app. Replaced by the API in phase 2.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const srcDir = path.join(root, '_toilets');
const outFile = path.join(root, 'apps/mobile/src/data/toilets.json');

const types = [
  'hospoda, restaurace, ...',
  'nákupní středisko',
  'veřejné toalety, toitoika',
  'přírodní zátiší',
  'škola, firma, ...',
  'úřad, banka, ...',
  'jiné',
];

const toilets = [];
const skipped = [];
for (const file of fs.readdirSync(srcDir).filter((f) => f.endsWith('.json'))) {
  const raw = JSON.parse(fs.readFileSync(path.join(srcDir, file), 'utf-8'));
  const latitude = Number(raw.latitude);
  const longitude = Number(raw.longtitude ?? raw.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || !raw.placeName) {
    skipped.push(file);
    continue;
  }
  toilets.push({
    id: file.replace(/\.json$/, ''),
    latitude,
    longitude,
    placeName: String(raw.placeName).trim(),
    wayDescription: String(raw.wayDescription ?? '').trim(),
    toiletType: types.includes(raw.toiletType) ? raw.toiletType : 'jiné',
    isClean: Boolean(raw.isClean),
    hasPaper: Boolean(raw.hasPaper),
    canLock: Boolean(raw.canLock),
    hasWater: Boolean(raw.hasWater),
    isFree: Boolean(raw.isFree),
    bonusCategory: Array.isArray(raw.bonusCategory) ? raw.bonusCategory.map(String) : [],
    comment: String(raw.comment ?? '').trim(),
    nickName: String(raw.nickName ?? '').trim() || 'Ghost',
    createdAt: new Date(raw.timeStamp).toISOString(),
  });
}

toilets.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(toilets));
console.log(`toilets.json: ${toilets.length} toilets, skipped ${skipped.length}`, skipped);
