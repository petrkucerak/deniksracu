import { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { FilterBar } from '@/components/filter-bar';
import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { ToiletRow } from '@/components/toilet-row';
import { BottomTabInset } from '@/constants/theme';
import { sortByDistance, useFilteredToilets } from '@/hooks/use-filters';
import { useTheme } from '@/hooks/use-theme';
import { useUserLocation } from '@/hooks/use-user-location';

export default function NearbyScreen() {
  const theme = useTheme();
  const { location, status, request } = useUserLocation();
  const visible = useFilteredToilets();
  const sorted = useMemo(
    () =>
      location
        ? sortByDistance(visible, location).slice(0, 100)
        : sortByDistance(visible, null).sort((a, b) => a.placeName.localeCompare(b.placeName, 'cs')),
    [visible, location],
  );

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={sorted}
      keyExtractor={(t) => t.id}
      renderItem={({ item }) => <ToiletRow toilet={item} distance={item.distance} />}
      ItemSeparatorComponent={() => <View style={[styles.sep, { backgroundColor: theme.separator }]} />}
      contentContainerStyle={{ paddingBottom: BottomTabInset + 24 }}
      style={{ backgroundColor: theme.card }}
      ListHeaderComponent={
        <View style={styles.header}>
          <FilterBar />
          {!location && (
            <Pressable onPress={request} style={[styles.banner, { backgroundColor: theme.backgroundElement }]}>
              <Icon name={{ ios: 'location.slash', android: 'location_off', web: 'location_off' }} color={theme.tint} />
              <ThemedText type="small" style={styles.grow}>
                {status === 'denied'
                  ? 'Bez polohy řadíme podle abecedy. Klepni a povol přístup k poloze.'
                  : 'Zjišťujeme tvoji polohu…'}
              </ThemedText>
            </Pressable>
          )}
        </View>
      }
      ListEmptyComponent={
        <ThemedText themeColor="textSecondary" style={styles.empty}>
          Filtrům neodpovídá žádný trůn.
        </ThemedText>
      }
    />
  );
}

const styles = StyleSheet.create({
  header: { paddingVertical: 8, gap: 8 },
  sep: { height: StyleSheet.hairlineWidth, marginLeft: 68 },
  banner: { marginHorizontal: 16, padding: 12, borderRadius: 12, flexDirection: 'row', gap: 10, alignItems: 'center' },
  grow: { flex: 1 },
  empty: { textAlign: 'center', padding: 32 },
});
