import type { Toilet } from '@/lib/toilet';

export const RANKS = [
  { min: 200, title: 'Gigasráč' },
  { min: 100, title: 'Megasráč' },
  { min: 50, title: 'Velesráč' },
  { min: 20, title: 'Sráč mazák' },
  { min: 5, title: 'Sráč' },
  { min: 1, title: 'Sráč zelenáč' },
] as const;

// Carried over from the web; replaced by a profile setting once accounts exist (phase 4).
const FEMININE = new Set(['Kajkaj', 'Adélka']);

export type HallEntry = { nickName: string; score: number; title: string };

export function rankFor(score: number) {
  return RANKS.find((r) => score >= r.min)?.title ?? RANKS[RANKS.length - 1].title;
}

// "1 trůn", "2–4 trůny", "5+ trůnů"
export function thronesLabel(score: number) {
  if (score === 1) return '1 trůn';
  if (score < 5) return `${score} trůny`;
  return `${score} trůnů`;
}

export function buildHall(toilets: Toilet[]): HallEntry[] {
  const scores = new Map<string, number>();
  for (const t of toilets) scores.set(t.nickName, (scores.get(t.nickName) ?? 0) + 1);
  return [...scores]
    .map(([nickName, score]) => {
      const title = rankFor(score);
      return { nickName, score, title: FEMININE.has(nickName) ? title.replace('sráč', 'sračka') : title };
    })
    .sort((a, b) => b.score - a.score || a.nickName.localeCompare(b.nickName, 'cs'));
}
