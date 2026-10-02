import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Brand, BottomTabInset } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const COMMANDMENTS = [
  'Do jednoho záchodu sráti budeš!',
  'Během sraní nebudeš záchody střídati!',
  'Pomni, abys záchod spláchnul i v den sváteční!',
  'Budeš ctít ostatní sráče!',
  'Po potřebě splachovati budeš!',
  'Nebudeš nakukovati do kabinky vedlejší!',
  'Nebudeš krást papír toaletní!',
  'Budeš hodnotit vždy pravdivě a objektivně!',
  'Nebudeš žádostivě dychtit po roličce toaletního papíru svého bližního!',
  'Aniž požádáš štětky jeho!',
];

export default function DesateroScreen() {
  const theme = useTheme();
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[styles.content, { paddingBottom: BottomTabInset + 24 }]}>
      <Stack.Screen options={{ title: 'Sráčovo desatero', headerLargeTitle: false }} />
      <ThemedText themeColor="textSecondary" style={styles.prolog}>
        Jsou dny, kdy se všechno otáčí jako dobře promazaný držák na toaletní papír. Pak se ale stane, že se ani v klidu
        nevysereš. Právě pro tyto dny slouží desatero, které ti ukáže cestu skrz temný tunel.
      </ThemedText>
      {COMMANDMENTS.map((c, i) => (
        <View key={c} style={[styles.item, { backgroundColor: theme.backgroundElement }]}>
          <ThemedText style={styles.num}>{i + 1}</ThemedText>
          <ThemedText style={styles.grow}>{c}</ThemedText>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 10 },
  prolog: { fontStyle: 'italic', marginBottom: 8 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: 14 },
  num: { width: 28, fontSize: 22, lineHeight: 28, fontWeight: '800', color: Brand.brown, textAlign: 'center' },
  grow: { flex: 1 },
});
