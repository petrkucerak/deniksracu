import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { TypeBadge } from '@/components/type-badge';
import { Brand } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useUserLocation } from '@/hooks/use-user-location';
import { distance, formatDistance, formatWalk } from '@/lib/geo';
import { navigateTo, openInMapyCz, shareToilet } from '@/lib/navigation';
import { FEATURES, formatDate, TYPE_META } from '@/lib/toilet';
import { getToilet, toilets } from '@/lib/toilets';

// Pre-render one page per toilet for the static web build.
export function generateStaticParams() {
  return toilets.map((t) => ({ id: t.id }));
}

export default function ToiletDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const toilet = getToilet(id);
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { location } = useUserLocation();

  if (!toilet) {
    return (
      <View style={[styles.missing, { backgroundColor: theme.background }]}>
        <ThemedText type="smallBold">Tenhle trůn jsme nenašli.</ThemedText>
        <Pressable onPress={() => router.replace('/')}>
          <ThemedText style={{ color: theme.tint }}>Zpět na mapu</ThemedText>
        </Pressable>
      </View>
    );
  }

  const meta = TYPE_META[toilet.toiletType];
  const dist = location ? distance(location, toilet) : null;

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}>
      <Stack.Screen options={{ title: toilet.placeName }} />

      <View style={styles.header}>
        <TypeBadge type={toilet.toiletType} size={52} />
        <View style={styles.headerText}>
          <ThemedText style={styles.title}>{toilet.placeName}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {meta.label}
            {dist != null && ` · ${formatDistance(dist)}`}
            {dist != null && formatWalk(dist) && ` · ${formatWalk(dist)}`}
          </ThemedText>
        </View>
      </View>

      <View style={styles.actions}>
        <Action primary label="Navigovat" icon={{ ios: 'arrow.triangle.turn.up.right.diamond.fill', android: 'directions', web: 'directions' }} onPress={() => navigateTo(toilet)} />
        <Action label="Mapy.cz" icon={{ ios: 'map', android: 'map', web: 'map' }} onPress={() => openInMapyCz(toilet)} />
        <Action label="Sdílet" icon={{ ios: 'square.and.arrow.up', android: 'share', web: 'share' }} onPress={() => shareToilet(toilet)} />
      </View>

      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
        {FEATURES.map((f, i) => {
          const yes = toilet[f.key];
          return (
            <View
              key={f.key}
              style={[styles.feature, i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.separator }]}>
              <Icon name={f.symbol} size={18} color={theme.textSecondary} />
              <ThemedText style={styles.grow}>{f.question}</ThemedText>
              <View style={[styles.pill, { backgroundColor: yes ? '#16A34A22' : '#DC262622' }]}>
                <ThemedText type="smallBold" style={{ color: yes ? '#15803D' : '#DC2626' }}>
                  {yes ? 'Ano' : 'Ne'}
                </ThemedText>
              </View>
            </View>
          );
        })}
      </View>

      {toilet.bonusCategory.length > 0 && (
        <Section title="Bonusy">
          <View style={styles.tags}>
            {toilet.bonusCategory.map((b) => (
              <View key={b} style={[styles.tag, { backgroundColor: theme.backgroundElement }]}>
                <Icon name={{ ios: 'star.fill', android: 'star', web: 'star' }} size={13} color={Brand.yellow} />
                <ThemedText type="small">{b}</ThemedText>
              </View>
            ))}
          </View>
        </Section>
      )}

      {toilet.wayDescription !== '' && (
        <Section title="Jak se tam dostat">
          <ThemedText>{toilet.wayDescription}</ThemedText>
        </Section>
      )}

      {toilet.comment !== '' && (
        <Section title="Komentář">
          <View style={[styles.quote, { borderLeftColor: Brand.brown }]}>
            <ThemedText>{toilet.comment}</ThemedText>
          </View>
        </Section>
      )}

      <ThemedText type="small" themeColor="textSecondary" style={styles.footer}>
        Přidal {toilet.nickName} · {formatDate(toilet.createdAt)}
      </ThemedText>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
        {title.toUpperCase()}
      </ThemedText>
      {children}
    </View>
  );
}

function Action({
  label,
  icon,
  onPress,
  primary,
}: {
  label: string;
  icon: React.ComponentProps<typeof Icon>['name'];
  onPress: () => void;
  primary?: boolean;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.action,
        { backgroundColor: primary ? Brand.brown : theme.backgroundElement, opacity: pressed ? 0.8 : 1 },
      ]}>
      <Icon name={icon} size={20} color={primary ? '#fff' : theme.tint} />
      <ThemedText type="smallBold" style={{ color: primary ? '#fff' : theme.text }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingTop: 28, gap: 20 },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  headerText: { flex: 1, gap: 2 },
  title: { fontSize: 22, lineHeight: 28, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: 10 },
  action: { flex: 1, height: 64, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 4 },
  card: { borderRadius: 16, paddingHorizontal: 16 },
  feature: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  grow: { flex: 1 },
  pill: { paddingHorizontal: 10, paddingVertical: 2, borderRadius: 10 },
  section: { gap: 8 },
  sectionTitle: { fontSize: 12, letterSpacing: 0.6 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 },
  quote: { borderLeftWidth: 3, paddingLeft: 12 },
  footer: { textAlign: 'center' },
});
