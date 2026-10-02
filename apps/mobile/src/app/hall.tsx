import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { buildHall, RANKS, thronesLabel } from '@/lib/hall';
import { toilets } from '@/lib/toilets';
import { useTheme } from '@/hooks/use-theme';

const hall = buildHall(toilets);

export default function HallScreen() {
  const theme = useTheme();
  return (
    <Screen title="Síň sráčů">
      <View style={styles.list}>
        {hall.map((p, i) => (
          <View key={p.nickName} style={[styles.row, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText style={styles.pos}>{i + 1}.</ThemedText>
            <View style={styles.grow}>
              <ThemedText type="smallBold">{p.nickName}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">{p.title}</ThemedText>
            </View>
            <ThemedText type="small">{thronesLabel(p.score)}</ThemedText>
          </View>
        ))}
      </View>
      <ThemedText type="smallBold">Ranky</ThemedText>
      {[...RANKS].reverse().map((r) => (
        <ThemedText key={r.title} type="small">
          {r.title}: {r.min}+ trůnů
        </ThemedText>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { gap: Spacing.two },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, padding: Spacing.three, borderRadius: 12 },
  pos: { width: 32, fontWeight: 700 },
  grow: { flex: 1 },
});
