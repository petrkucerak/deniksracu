import type { SymbolViewProps } from 'expo-symbols';

export const TOILET_TYPES = [
  'hospoda, restaurace, ...',
  'nákupní středisko',
  'veřejné toalety, toitoika',
  'přírodní zátiší',
  'škola, firma, ...',
  'úřad, banka, ...',
  'jiné',
] as const;

export type ToiletType = (typeof TOILET_TYPES)[number];

export type Toilet = {
  id: string;
  latitude: number;
  longitude: number;
  placeName: string;
  wayDescription: string;
  toiletType: ToiletType;
  isClean: boolean;
  hasPaper: boolean;
  canLock: boolean;
  hasWater: boolean;
  isFree: boolean;
  bonusCategory: string[];
  comment: string;
  nickName: string;
  createdAt: string;
};

type TypeMeta = {
  label: string;
  color: string;
  symbol: SymbolViewProps['name'];
  marker: number;
  markerSelected: number;
};

export const TYPE_META: Record<ToiletType, TypeMeta> = {
  'hospoda, restaurace, ...': {
    label: 'Hospoda, restaurace',
    color: '#D97706',
    symbol: { ios: 'wineglass', android: 'local_bar', web: 'local_bar' },
    marker: require('@/assets/images/markers/pub.png'),
    markerSelected: require('@/assets/images/markers/pub-selected.png'),
  },
  'nákupní středisko': {
    label: 'Nákupní centrum',
    color: '#7C3AED',
    symbol: { ios: 'cart', android: 'shopping_cart', web: 'shopping_cart' },
    marker: require('@/assets/images/markers/mall.png'),
    markerSelected: require('@/assets/images/markers/mall-selected.png'),
  },
  'veřejné toalety, toitoika': {
    label: 'Veřejné WC',
    color: '#0284C7',
    symbol: { ios: 'toilet', android: 'wc', web: 'wc' },
    marker: require('@/assets/images/markers/public.png'),
    markerSelected: require('@/assets/images/markers/public-selected.png'),
  },
  'přírodní zátiší': {
    label: 'Příroda',
    color: '#16A34A',
    symbol: { ios: 'tree', android: 'park', web: 'park' },
    marker: require('@/assets/images/markers/nature.png'),
    markerSelected: require('@/assets/images/markers/nature-selected.png'),
  },
  'škola, firma, ...': {
    label: 'Škola, firma',
    color: '#475569',
    symbol: { ios: 'building.2', android: 'apartment', web: 'apartment' },
    marker: require('@/assets/images/markers/work.png'),
    markerSelected: require('@/assets/images/markers/work-selected.png'),
  },
  'úřad, banka, ...': {
    label: 'Úřad, banka',
    color: '#0F766E',
    symbol: { ios: 'building.columns', android: 'account_balance', web: 'account_balance' },
    marker: require('@/assets/images/markers/office.png'),
    markerSelected: require('@/assets/images/markers/office-selected.png'),
  },
  jiné: {
    label: 'Jiné',
    color: '#AF8566',
    symbol: { ios: 'questionmark', android: 'question_mark', web: 'question_mark' },
    marker: require('@/assets/images/markers/other.png'),
    markerSelected: require('@/assets/images/markers/other-selected.png'),
  },
};

export type FeatureKey = 'isClean' | 'hasPaper' | 'canLock' | 'hasWater' | 'isFree';

export const FEATURES: { key: FeatureKey; label: string; question: string; symbol: SymbolViewProps['name'] }[] = [
  { key: 'isFree', label: 'Zdarma', question: 'Zdarma', symbol: { ios: 'creditcard.trianglebadge.exclamationmark', android: 'money_off', web: 'money_off' } },
  { key: 'isClean', label: 'Čisto', question: 'Čistota', symbol: { ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' } },
  { key: 'hasPaper', label: 'Toaleťák', question: 'Toaletní papír', symbol: { ios: 'scroll', android: 'receipt_long', web: 'receipt_long' } },
  { key: 'canLock', label: 'Zamykatelné', question: 'Zámek', symbol: { ios: 'lock', android: 'lock', web: 'lock' } },
  { key: 'hasWater', label: 'Voda a mýdlo', question: 'Umyvadlo', symbol: { ios: 'drop', android: 'water_drop', web: 'water_drop' } },
];

/** 0–5 count of the base categories, used as a simple score. */
export function score(t: Toilet) {
  return FEATURES.reduce((n, f) => n + (t[f.key] ? 1 : 0), 0);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
}
