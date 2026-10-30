import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';

export function RentalPanel({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return <View style={[s.panel, { borderColor: theme.text, backgroundColor: theme.background, boxShadow: `4px 4px 0 ${theme.text}` }]}>{children}</View>;
}

const s = StyleSheet.create({
  panel: { borderWidth: 1, marginRight: 4, marginBottom: 4 },
});

