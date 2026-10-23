import { StyleSheet, Text, View } from 'react-native';
import { uiColors, uiSpacing, uiType } from '@/constants/terem-tokens';

type StatusBadgeProps = { label: string; tone: 'available' | 'active' | 'unavailable' };

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return <View style={[styles.badge, tone === 'available' && styles.available, tone === 'active' && styles.active, tone === 'unavailable' && styles.unavailable]}>
    <Text style={[styles.label, tone === 'unavailable' && styles.unavailableLabel]}>{label}</Text>
  </View>;
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', paddingHorizontal: uiSpacing.sm, paddingVertical: uiSpacing.xs },
  available: { backgroundColor: uiColors.success },
  active: { backgroundColor: uiColors.orange },
  unavailable: { backgroundColor: uiColors.disabled },
  label: { ...uiType.label, color: uiColors.paper, textTransform: 'uppercase' },
  unavailableLabel: { color: uiColors.ink },
});
