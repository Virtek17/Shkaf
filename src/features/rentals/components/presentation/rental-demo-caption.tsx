import { StyleSheet } from 'react-native';
import { TeremText } from '@/shared/ui/terem-text';
import { useTheme } from '@/shared/theme/use-theme';

export function RentalDemoCaption() {
  const theme = useTheme();
  return <TeremText variant="caption" style={[s.caption, { color: theme.textSecondary }]}>Деморежим · без списаний и реальной брони</TeremText>;
}

const s = StyleSheet.create({
  caption: { fontSize: 10, lineHeight: 15, textAlign: 'center' },
});

