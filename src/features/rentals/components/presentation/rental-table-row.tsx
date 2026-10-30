import { StyleSheet, View } from 'react-native';
import { TeremText } from '@/shared/ui/terem-text';
import { useTheme } from '@/shared/theme/use-theme';
import { RentalIcon, type RentalIconName } from './rental-icon';

export function RentalTableRow({ label, value, icon, last = false }: { label: string; value: string; icon?: RentalIconName; last?: boolean }) {
  const theme = useTheme();
  return <View style={[s.tableRow, { borderBottomColor: theme.backgroundSelected }, last && { borderBottomWidth: 0 }]}>
    {icon ? <RentalIcon name={icon} size={17} /> : null}
    <TeremText variant="caption" style={s.rowLabel}>{label}</TeremText>
    <TeremText variant="caption" style={s.rowValue}>{value}</TeremText>
  </View>;
}

const s = StyleSheet.create({
  tableRow: { flexDirection: 'row', alignItems: 'center', minHeight: 35, borderBottomWidth: 1, paddingHorizontal: 10, paddingVertical: 7, gap: 8 },
  rowLabel: { width: '24%', fontSize: 12 },
  rowValue: { flex: 1, fontSize: 12, lineHeight: 17 },
});

