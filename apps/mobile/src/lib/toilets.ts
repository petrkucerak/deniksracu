import data from '@/data/toilets.json';
import type { Toilet } from '@/lib/toilet';

export const toilets = data as Toilet[];

const byId = new Map(toilets.map((t) => [t.id, t]));

export function getToilet(id: string) {
  return byId.get(id);
}
