import type { LatLng } from '@/lib/geo';
import type { Toilet } from '@/lib/toilet';

export type MapFocus = LatLng & { zoom?: number; key: number };

export type ToiletMapProps = {
  toilets: Toilet[];
  selectedId?: string | null;
  onSelect: (t: Toilet) => void;
  userLocation: LatLng | null;
  /** Each new `key` animates the camera to the given point. */
  focus: MapFocus | null;
  /** Extra space at the top and bottom covered by overlays, so markers stay visible. */
  insets: { top: number; bottom: number };
};
