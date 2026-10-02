import type { SymbolViewProps } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export function ListGroup({ title, children }: { title?: string; children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <View style={styles.group}>
      {title && (
        <ThemedText type="smallBold" themeColor="textSecondary" style={styles.title}>
          {title.toUpperCase()}
        </ThemedText>
      )}
      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>{children}</View>
    </View>
  );
}

type ItemProps = {
  label: string;
  icon: SymbolViewProps['name'];
  color: string;
  detail?: string;
  onPress?: () => void;
  first?: boolean;
};

export function ListItem({ label, icon, color, detail, onPress, first }: ItemProps) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.item, pressed && { backgroundColor: theme.backgroundSelected }]}>
      <View style={[styles.icon, { backgroundColor: color }]}>
        <Icon name={icon} size={16} color="#fff" />
      </View>
      <View style={[styles.itemBody, !first && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.separator }]}>
        <ThemedText style={styles.grow}>{label}</ThemedText>
        {detail && (
          <ThemedText type="small" themeColor="textSecondary">
            {detail}
          </ThemedText>
        )}
        {onPress && <Icon name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }} size={14} color={theme.textSecondary} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  group: { gap: 6 },
  title: { fontSize: 12, letterSpacing: 0.6, marginLeft: 16 },
  card: { borderRadius: 14, overflow: 'hidden' },
  item: { flexDirection: 'row', alignItems: 'center', paddingLeft: 14, gap: 12 },
  icon: { width: 30, height: 30, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  itemBody: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 13, paddingRight: 14 },
  grow: { flex: 1 },
});
