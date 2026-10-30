import type { PickupPoint } from '@/entities/pickup-point';
import { useTheme } from '@/shared/theme/use-theme';
import { uiColors } from '@/shared/theme/terem-tokens';
import { TeremButton } from '@/shared/ui/terem-button';
import { TeremText } from '@/shared/ui/terem-text';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';
export function PointCard({ point, inventory, onOpen }: { point: PickupPoint; inventory: string; onOpen: () => void }) {
 const theme = useTheme();
 const available = point.status === 'available';
 return <View style={[styles.shadow, { backgroundColor: theme.text }]}>
  <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.text }]}>
   <View style={styles.heading}>
    <Svg width={32} height={40} viewBox="0 0 24 24"><Path fill={available ? uiColors.orange : theme.textSecondary} d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" /></Svg>
    <View style={styles.details}><TeremText variant="cardTitle">{point.name.toLocaleUpperCase('ru-RU')}</TeremText><TeremText>{point.address}</TeremText></View>
   </View>
   <View style={styles.status}><View style={[styles.dot, { backgroundColor: available ? uiColors.success : theme.textSecondary }]} /><TeremText variant="label">{available ? 'Доступен' : 'Временно недоступен'}</TeremText></View>
   <TeremText style={{ color: theme.textSecondary }}>{point.hours}</TeremText>
   <TeremText>{available ? inventory : point.unavailableReason ?? 'Выберите другой пункт.'}</TeremText>
   <TeremButton label={available ? 'Открыть каталог' : 'Недоступно'} labelStyle={styles.buttonLabel} trailingArrow disabled={!available} onPress={onOpen} />
  </View>
 </View>;
}
const styles = StyleSheet.create({
 shadow: { marginRight: 4, marginBottom: 4 },
 card: { borderWidth: 1, padding: 12, gap: 10, transform: [{ translateX: -3 }, { translateY: -3 }] },
 heading: { flexDirection: 'row', gap: 10, alignItems: 'center' }, marker: { fontSize: 38, lineHeight: 42 },
 details: { flex: 1, minWidth: 0 }, status: { flexDirection: 'row', gap: 8, alignItems: 'center' },
 dot: { width: 10, height: 10, borderRadius: 5 }, buttonLabel: { fontSize: 14 },
});
