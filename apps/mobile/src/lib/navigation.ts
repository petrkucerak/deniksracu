import { Linking, Platform, Share } from 'react-native';

import type { Toilet } from '@/lib/toilet';

/** Opens turn-by-turn walking navigation in the platform's map app. */
export function navigateTo(t: Toilet) {
  const { latitude: lat, longitude: lng } = t;
  const label = encodeURIComponent(t.placeName);
  const url = Platform.select({
    ios: `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=w&q=${label}`,
    android: `google.navigation:q=${lat},${lng}&mode=w`,
    default: `https://mapy.cz/zakladni?planovani-trasy&rc=${lng}_${lat}&rt=chodec&x=${lng}&y=${lat}&z=17`,
  });
  return Linking.openURL(url).catch(() =>
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`),
  );
}

export function openInMapyCz(t: Toilet) {
  return Linking.openURL(`https://mapy.cz/zakladni?x=${t.longitude}&y=${t.latitude}&z=18&source=coor&id=${t.longitude},${t.latitude}`);
}

export function shareToilet(t: Toilet) {
  const url = `https://deniksracu.cz/toilet/${t.id}`;
  return Share.share({ message: `${t.placeName} – trůn v Deníku sráčů 🧻 ${url}`, url, title: t.placeName });
}
