import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { TYPE_META, type ToiletType } from '@/lib/toilet';

export function TypeBadge({ type, size = 40 }: { type: ToiletType; size?: number }) {
  const meta = TYPE_META[type];
  return (
    <View style={[styles.badge, { width: size, height: size, borderRadius: size / 2, backgroundColor: meta.color }]}>
      <Icon name={meta.symbol} size={size * 0.5} color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignItems: 'center', justifyContent: 'center' },
});
