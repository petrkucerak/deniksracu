import * as Haptics from 'expo-haptics';
import type { SymbolViewProps } from 'expo-symbols';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';

import { Icon } from '@/components/icon';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  label: string;
  icon?: SymbolViewProps['name'];
  active?: boolean;
  activeColor?: string;
  onPress: () => void;
  elevated?: boolean;
};

export function Chip({ label, icon, active, activeColor, onPress, elevated }: Props) {
  const theme = useTheme();
  const bg = active ? (activeColor ?? theme.tint) : theme.card;
  const fg = active ? '#fff' : theme.text;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={() => {
        if (Platform.OS !== 'web') Haptics.selectionAsync();
        onPress();
      }}
      style={({ pressed }) => [
        styles.chip,
        { backgroundColor: bg, borderColor: active ? bg : theme.separator, opacity: pressed ? 0.8 : 1 },
        elevated && styles.elevated,
      ]}>
      {icon && <Icon name={icon} size={15} color={fg} />}
      <Text style={[styles.label, { color: fg }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    height: 34,
    borderRadius: 17,
    borderWidth: StyleSheet.hairlineWidth,
  },
  label: { fontSize: 14, fontWeight: '600' },
  elevated: {
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
  },
});
