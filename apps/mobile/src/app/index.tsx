import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Brand, Spacing } from '@/constants/theme';
import { toilets } from '@/lib/toilets';

// Placeholder until the map lands in phase 1.
export default function MapScreen() {
  return (
    <Screen title="Deník sráčů">
      <View style={styles.card}>
        <ThemedText style={styles.big}>{toilets.length}</ThemedText>
        <ThemedText style={styles.light}>trůnů v databázi</ThemedText>
      </View>
      <ThemedText themeColor="textSecondary">Mapa trůnů se tu objeví ve Fázi 1.</ThemedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: Brand.brown, borderRadius: 16, padding: Spacing.four, alignItems: 'center' },
  big: { color: '#fff', fontSize: 56, lineHeight: 64, fontWeight: 700 },
  light: { color: '#fff' },
});
