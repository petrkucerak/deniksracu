import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Brand, BottomTabInset } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { buildHall, RANKS, thronesLabel } from '@/lib/hall';
import { toilets } from '@/lib/toilets';

const hall = buildHall(toilets);
const MEDALS = ['#E3B53B', '#A8B0B8', '#C2824B'];

export default function HallScreen() {
  const theme = useTheme();
  const podium = hall.slice(0, 3);
  const rest = hall.slice(3);
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[styles.content, { paddingBottom: BottomTabInset + 24 }]}>
      <View style={styles.podium}>
        {[podium[1], podium[0], podium[2]].map((p) => {
          if (!p) return null;
          const place = hall.indexOf(p);
          return (
            <View key={p.nickName} style={[styles.step, { backgroundColor: theme.backgroundElement }, place === 0 && styles.first]}>
              <View style={[styles.medal, { backgroundColor: MEDALS[place] }]}>
                <ThemedText style={styles.medalText}>{place + 1}</ThemedText>
              </View>
              <ThemedText type="smallBold" numberOfLines={1}>
                {p.nickName}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
                {p.title}
              </ThemedText>
              <ThemedText style={styles.score}>{p.score}</ThemedText>
            </View>
          );
        })}
      </View>

      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
        {rest.map((p, i) => (
          <View
            key={p.nickName}
            style={[styles.row, i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.separator }]}>
            <ThemedText type="small" themeColor="textSecondary" style={styles.pos}>
              {i + 4}.
            </ThemedText>
            <View style={styles.grow}>
              <ThemedText type="smallBold">{p.nickName}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {p.title}
              </ThemedText>
            </View>
            <ThemedText type="small">{thronesLabel(p.score)}</ThemedText>
          </View>
        ))}
      </View>

      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.caption}>
        RANKY
      </ThemedText>
      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
        {[...RANKS].reverse().map((r, i) => (
          <View
            key={r.title}
            style={[styles.row, i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.separator }]}>
            <ThemedText style={styles.grow}>{r.title}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {r.min}+ trůnů
            </ThemedText>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 16 },
  podium: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginTop: 8 },
  step: { flex: 1, alignItems: 'center', padding: 12, paddingTop: 16, borderRadius: 18, gap: 2 },
  first: { paddingTop: 28, borderWidth: 2, borderColor: Brand.yellow },
  medal: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  medalText: { color: '#fff', fontWeight: '800' },
  score: { fontSize: 28, lineHeight: 34, fontWeight: '800', marginTop: 4 },
  card: { borderRadius: 16, paddingHorizontal: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  pos: { width: 28 },
  grow: { flex: 1 },
  caption: { fontSize: 12, letterSpacing: 0.6, marginBottom: -8, marginLeft: 16 },
});
