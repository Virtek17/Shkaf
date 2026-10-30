import { StyleSheet, View } from 'react-native';
import { TeremText } from '@/shared/ui/terem-text';
import { uiColors } from '@/shared/theme/terem-tokens';
import { useTheme } from '@/shared/theme/use-theme';
import { RentalIcon } from './rental-icon';

export function RentalNotice({ title, text, info = false }: { title?: string; text: string; info?: boolean }) {
  const theme = useTheme();
  const dark = theme.background === '#000000';
  return <View accessibilityRole={info ? undefined : 'alert'} style={[s.notice, { backgroundColor: info ? theme.backgroundElement : dark ? '#301A13' : '#FFF0EB' }]}>
    <RentalIcon name={info ? 'info' : 'warning'} size={info ? 24 : 42} color={info ? theme.text : uiColors.orange} />
    <View style={s.noticeCopy}>{title ? <TeremText variant="label">{title}</TeremText> : null}<TeremText style={s.noticeText}>{text}</TeremText></View>
  </View>;
}

const s = StyleSheet.create({
  notice: { padding: 10, gap: 10, flexDirection: 'row', alignItems: 'center' },
  noticeCopy: { flex: 1, minWidth: 0, gap: 3 },
  noticeText: { fontSize: 13, lineHeight: 18 },
});

