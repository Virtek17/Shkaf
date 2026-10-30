import { StyleSheet, View } from 'react-native';
import { TeremText } from '@/shared/ui/terem-text';
import { uiColors } from '@/shared/theme/terem-tokens';
import { useTheme } from '@/shared/theme/use-theme';
import { RentalIcon } from './rental-icon';

export function RentalTimer({ value, compact = false }: { value: string; compact?: boolean }) {
  const theme = useTheme();
  return <View style={[s.timer, compact && s.compactTimer, { borderColor: theme.text, backgroundColor: theme.background, boxShadow: `3px 3px 0 ${theme.text}` }]}>
    {!compact ? <RentalIcon name="clock" size={28} color={uiColors.orange} /> : null}
    <TeremText variant={compact ? 'caption' : 'label'}>{compact ? 'Бронь' : 'Бронь действует'}</TeremText>
    <TeremText variant="section" accent style={[s.timerValue, compact && s.compactTimerValue]}>{value}</TeremText>
  </View>;
}

const s = StyleSheet.create({
  timer: { borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, paddingVertical: 9, marginRight: 3, marginBottom: 3 },
  timerValue: { marginLeft: 'auto', fontSize: 28, lineHeight: 34, transform: [{ skewX: '-9deg' }] },
  compactTimer: { flexDirection: 'column', gap: 0, alignItems: 'flex-start', padding: 7, width: 100 },
  compactTimerValue: { marginLeft: 0, alignSelf: 'stretch', fontSize: 18, lineHeight: 28 },
});

