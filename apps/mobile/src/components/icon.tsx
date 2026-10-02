import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import type { ColorValue } from 'react-native';

export function Icon({ name, size = 20, color }: { name: SymbolViewProps['name']; size?: number; color?: ColorValue }) {
  return <SymbolView name={name} size={size} tintColor={color} />;
}
