import { createContext, use, useMemo, useState, type ReactNode } from 'react';

import { distance, type LatLng } from '@/lib/geo';
import type { FeatureKey, Toilet, ToiletType } from '@/lib/toilet';
import { toilets } from '@/lib/toilets';

type Filters = {
  features: Set<FeatureKey>;
  types: Set<ToiletType>;
  toggleFeature: (k: FeatureKey) => void;
  toggleType: (t: ToiletType) => void;
  reset: () => void;
  activeCount: number;
};

const FiltersContext = createContext<Filters | null>(null);

function toggled<T>(set: Set<T>, v: T) {
  const next = new Set(set);
  if (next.has(v)) next.delete(v);
  else next.add(v);
  return next;
}

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [features, setFeatures] = useState<Set<FeatureKey>>(new Set());
  const [types, setTypes] = useState<Set<ToiletType>>(new Set());
  const value: Filters = {
    features,
    types,
    toggleFeature: (k) => setFeatures((s) => toggled(s, k)),
    toggleType: (t) => setTypes((s) => toggled(s, t)),
    reset: () => {
      setFeatures(new Set());
      setTypes(new Set());
    },
    activeCount: features.size + types.size,
  };
  return <FiltersContext value={value}>{children}</FiltersContext>;
}

export function useFilters() {
  const ctx = use(FiltersContext);
  if (!ctx) throw new Error('useFilters outside FiltersProvider');
  return ctx;
}

export function useFilteredToilets(): Toilet[] {
  const { features, types } = useFilters();
  return useMemo(
    () =>
      toilets.filter(
        (t) => (types.size === 0 || types.has(t.toiletType)) && [...features].every((k) => t[k]),
      ),
    [features, types],
  );
}

export type ToiletWithDistance = Toilet & { distance: number | null };

export function sortByDistance(list: Toilet[], from: LatLng | null): ToiletWithDistance[] {
  if (!from) return list.map((t) => ({ ...t, distance: null }));
  return list
    .map((t) => ({ ...t, distance: distance(from, t) }))
    .sort((a, b) => a.distance - b.distance);
}

/** Case- and diacritics-insensitive name search. */
export function searchToilets(list: Toilet[], query: string) {
  const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  const q = norm(query.trim());
  if (!q) return [];
  return list.filter((t) => norm(t.placeName).includes(q) || t.bonusCategory.some((b) => norm(b).includes(q)));
}
