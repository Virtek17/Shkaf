import { StyleSheet, Text, View } from 'react-native';
import { uiColors, uiSpacing, uiType } from '@/shared/theme/terem-tokens';
import { useTheme } from '@/shared/theme/use-theme';

type StepProgressProps = { current: number; total: number };

export function StepProgress({ current, total }: StepProgressProps) {
  const theme = useTheme();
  const safeTotal = Math.max(1, Math.floor(total));
  const safeCurrent = Math.min(safeTotal, Math.max(0, Math.floor(current)));
  return <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: safeTotal, now: safeCurrent }} style={styles.root}>
    <Text style={[styles.label, { color: theme.text }]}>Шаг {safeCurrent} из {safeTotal}</Text>
    <View style={styles.segments}>{Array.from({ length: safeTotal }, (_, index) => <View key={index} style={[styles.segment, { backgroundColor: theme.backgroundSelected }, index < safeCurrent && styles.complete]} />)}</View>
  </View>;
}

const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignItems: 'center', gap: uiSpacing.md },
  label: { ...uiType.label },
  segments: { flex: 1, flexDirection: 'row', gap: uiSpacing.xs },
  segment: { height: 6, flex: 1, borderRadius: 3 },
  complete: { backgroundColor: uiColors.orange },
});
