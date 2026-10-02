import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { TypeBadge } from '@/components/type-badge';
import { useTheme } from '@/hooks/use-theme';
import { formatDistance, formatWalk } from '@/lib/geo';
import { FEATURES, TYPE_META, type Toilet } from '@/lib/toilet';

export function ToiletRow({ toilet, distance, onPress }: { toilet: Toilet; distance?: number | null; onPress?: () => void }) {
  const theme = useTheme();
  const features = FEATURES.filter((f) => toilet[f.key]).map((f) => f.label);
  return (
    <Pressable
      onPress={onPress ?? (() => router.push(`/toilet/${toilet.id}`))}
      style={({ pressed }) => [styles.row, { backgroundColor: pressed ? theme.backgroundSelected : theme.card }]}>
      <TypeBadge type={toilet.toiletType} />
      <View style={styles.body}>
        <ThemedText type="smallBold" numberOfLines={1}>
          {toilet.placeName}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
          {features.length ? features.join(' · ') : TYPE_META[toilet.toiletType].label}
        </ThemedText>
      </View>
      {distance != null && (
        <View style={styles.distance}>
          <ThemedText type="smallBold">{formatDistance(distance)}</ThemedText>
          {formatWalk(distance) && (
            <ThemedText type="small" themeColor="textSecondary" style={styles.walk}>
              {formatWalk(distance)}
            </ThemedText>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12 },
  body: { flex: 1, gap: 2 },
  distance: { alignItems: 'flex-end' },
  walk: { fontSize: 12, lineHeight: 16 },
});
