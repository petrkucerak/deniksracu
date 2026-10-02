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
