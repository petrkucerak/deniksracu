import * as Haptics from 'expo-haptics';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Keyboard, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FilterBar } from '@/components/filter-bar';
import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { ToiletMap } from '@/components/toilet-map';
import type { MapFocus } from '@/components/toilet-map.types';
import { ToiletRow } from '@/components/toilet-row';
import { Brand, BottomTabInset } from '@/constants/theme';
import { searchToilets, sortByDistance, useFilteredToilets, useFilters } from '@/hooks/use-filters';
import { useTheme } from '@/hooks/use-theme';
import { useUserLocation } from '@/hooks/use-user-location';
import { formatDistance } from '@/lib/geo';
import type { Toilet } from '@/lib/toilet';

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { location, status, request } = useUserLocation();
  const { activeCount } = useFilters();
  const visible = useFilteredToilets();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focus, setFocus] = useState<MapFocus | null>(null);
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);

  // the detail sheet was closed: drop the highlighted marker
  useFocusEffect(useCallback(() => setSelectedId(null), []));

  const nearest = useMemo(() => (location ? sortByDistance(visible, location)[0] : null), [visible, location]);
  const results = useMemo(() => sortByDistance(searchToilets(visible, query), location).slice(0, 8), [visible, query, location]);

  const topOverlay = insets.top + 108;
  const bottomOverlay = insets.bottom + BottomTabInset + 76;

  function open(t: Toilet) {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedId(t.id);
    setFocus({ latitude: t.latitude, longitude: t.longitude, key: Date.now() });
    router.push(`/toilet/${t.id}`);
  }

  function closeSearch() {
    Keyboard.dismiss();
    setSearching(false);
    setQuery('');
  }

  return (
    <View style={styles.root}>
      <ToiletMap
        toilets={visible}
        selectedId={selectedId}
        onSelect={open}
        userLocation={location}
        focus={focus}
        insets={{ top: topOverlay, bottom: bottomOverlay }}
      />

      <View style={[styles.top, { paddingTop: insets.top + 8 }]} pointerEvents="box-none">
        <View style={[styles.search, { backgroundColor: theme.overlay }]}>
          <Icon name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }} size={18} color={theme.textSecondary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            onFocus={() => setSearching(true)}
            placeholder={`Hledat mezi ${visible.length} trůny`}
            placeholderTextColor={theme.textSecondary}
            style={[styles.input, { color: theme.text }]}
            returnKeyType="search"
            autoCorrect={false}
          />
          {searching && (
            <Pressable onPress={closeSearch} hitSlop={10}>
              <ThemedText type="smallBold" style={{ color: theme.tint }}>
                Zrušit
              </ThemedText>
            </Pressable>
          )}
        </View>
        {!searching && <FilterBar elevated />}
      </View>

      {searching && query.trim() !== '' && (
        <View style={[styles.results, { top: insets.top + 64, backgroundColor: theme.card }]}>
          <ScrollView keyboardShouldPersistTaps="handled">
            {results.length === 0 ? (
              <ThemedText themeColor="textSecondary" style={styles.empty}>
                Nic jsme nenašli. Zkus jiný název.
              </ThemedText>
            ) : (
              results.map((t) => (
                <ToiletRow
                  key={t.id}
                  toilet={t}
                  distance={t.distance}
                  onPress={() => {
                    closeSearch();
                    open(t);
                  }}
                />
              ))
            )}
          </ScrollView>
        </View>
      )}

      {!searching && (
        <View style={[styles.bottom, { bottom: insets.bottom + BottomTabInset + 12 }]} pointerEvents="box-none">
          {nearest ? (
            <Pressable
              onPress={() => open(nearest)}
              style={({ pressed }) => [styles.cta, { opacity: pressed ? 0.9 : 1 }]}
              accessibilityLabel={`Nejbližší trůn ${nearest.placeName}`}>
              <Icon name={{ ios: 'figure.walk', android: 'directions_walk', web: 'directions_walk' }} size={20} color="#fff" />
              <View style={styles.ctaText}>
                <ThemedText type="smallBold" style={styles.white} numberOfLines={1}>
                  Nejbližší trůn · {formatDistance(nearest.distance ?? 0)}
                </ThemedText>
                <ThemedText type="small" style={styles.whiteDim} numberOfLines={1}>
                  {nearest.placeName}
                </ThemedText>
              </View>
            </Pressable>
          ) : (
            <View style={[styles.cta, styles.ctaMuted]}>
              <ThemedText type="small" style={styles.white} numberOfLines={2}>
                {status === 'denied'
                  ? 'Povol polohu a ukážeme ti nejbližší trůn.'
                  : activeCount > 0 && location
                    ? 'Filtrům neodpovídá žádný trůn.'
                    : 'Zjišťujeme polohu…'}
              </ThemedText>
            </View>
          )}
          <Pressable
            onPress={() => {
              if (!location) return request();
              setFocus({ ...location, zoom: 16, key: Date.now() });
            }}
            style={[styles.fab, { backgroundColor: theme.overlay }]}
            accessibilityLabel="Moje poloha">
            <Icon name={{ ios: 'location.fill', android: 'my_location', web: 'my_location' }} size={20} color={theme.tint} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const shadow = { boxShadow: '0 4px 16px rgba(0,0,0,0.16)' } as const;

const styles = StyleSheet.create({
  root: { flex: 1 },
  top: { position: 'absolute', left: 0, right: 0, gap: 10 },
  search: {
    marginHorizontal: 16,
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...shadow,
  },
  input: { flex: 1, fontSize: 16, height: '100%', outlineStyle: 'none' } as never,
  results: { position: 'absolute', left: 16, right: 16, maxHeight: 420, borderRadius: 20, overflow: 'hidden', ...shadow },
  empty: { padding: 20, textAlign: 'center' },
  bottom: { position: 'absolute', left: 16, right: 16, flexDirection: 'row', gap: 12, alignItems: 'center' },
  cta: {
    flex: 1,
    height: 60,
    borderRadius: 30,
    backgroundColor: Brand.brown,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...shadow,
  },
  ctaMuted: { backgroundColor: 'rgba(60,60,67,0.85)' },
  ctaText: { flex: 1 },
  white: { color: '#fff' },
  whiteDim: { color: 'rgba(255,255,255,0.85)' },
  fab: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', ...shadow },
});
