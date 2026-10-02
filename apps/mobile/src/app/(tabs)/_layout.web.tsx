import type { SymbolViewProps } from 'expo-symbols';
import { Tabs, TabList, TabSlot, TabTrigger, type TabListProps, type TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Brand } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const TABS: { name: string; href: '/' | '/nearby' | '/hall' | '/more'; label: string; icon: SymbolViewProps['name'] }[] = [
  { name: 'index', href: '/', label: 'Mapa', icon: { web: 'map' } },
  { name: 'nearby', href: '/nearby', label: 'Nejbližší', icon: { web: 'near_me' } },
  { name: 'hall', href: '/hall', label: 'Síň sráčů', icon: { web: 'emoji_events' } },
  { name: 'more', href: '/more', label: 'Více', icon: { web: 'more_horiz' } },
];

// Web counterpart of the native tab bar: a floating bottom bar like the mobile apps.
// TabTrigger elements must be direct children of TabList, so the styling lives in FloatingBar.
export default function TabsLayout() {
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />
      <TabList asChild>
        <FloatingBar>
          {TABS.map((t) => (
            <TabTrigger key={t.name} name={t.name} href={t.href} asChild>
              <TabButton icon={t.icon}>{t.label}</TabButton>
            </TabTrigger>
          ))}
        </FloatingBar>
      </TabList>
    </Tabs>
  );
}

function FloatingBar({ children, style, ...props }: TabListProps) {
  const theme = useTheme();
  return (
    <View {...props} style={styles.wrap} pointerEvents="box-none">
      <View style={[styles.bar, { backgroundColor: theme.overlay, borderColor: theme.separator }]}>{children}</View>
    </View>
  );
}

function TabButton({ children, isFocused, icon, ...props }: TabTriggerSlotProps & { icon: SymbolViewProps['name'] }) {
  const theme = useTheme();
  const color = isFocused ? Brand.brown : theme.textSecondary;
  return (
    <Pressable {...props} style={styles.button}>
      <Icon name={icon} size={22} color={color} />
      <Text style={[styles.label, { color }]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 12, alignItems: 'center', paddingHorizontal: 16 },
  bar: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 480,
    borderRadius: 28,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 6,
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    backdropFilter: 'blur(20px)',
  } as never,
  button: { flex: 1, alignItems: 'center', gap: 2, paddingVertical: 4 },
  label: { fontSize: 11, fontWeight: '600' },
});
