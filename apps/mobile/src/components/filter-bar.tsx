import { ScrollView, StyleSheet } from 'react-native';

import { Chip } from '@/components/chip';
import { useFilters } from '@/hooks/use-filters';
import { FEATURES, TOILET_TYPES, TYPE_META } from '@/lib/toilet';

export function FilterBar({ elevated, inset = 16 }: { elevated?: boolean; inset?: number }) {
  const { features, types, toggleFeature, toggleType, reset, activeCount } = useFilters();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.row, { paddingHorizontal: inset }]}
      style={styles.scroll}>
      {activeCount > 0 && (
        <Chip label={`Zrušit (${activeCount})`} icon={{ ios: 'xmark', android: 'close', web: 'close' }} onPress={reset} elevated={elevated} />
      )}
      {FEATURES.map((f) => (
        <Chip
          key={f.key}
          label={f.label}
          icon={f.symbol}
          active={features.has(f.key)}
          onPress={() => toggleFeature(f.key)}
          elevated={elevated}
        />
      ))}
      {TOILET_TYPES.map((t) => (
        <Chip
          key={t}
          label={TYPE_META[t].label}
          icon={TYPE_META[t].symbol}
          active={types.has(t)}
          activeColor={TYPE_META[t].color}
          onPress={() => toggleType(t)}
          elevated={elevated}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0, overflow: 'visible' },
  row: { gap: 8, paddingVertical: 4 },
});
