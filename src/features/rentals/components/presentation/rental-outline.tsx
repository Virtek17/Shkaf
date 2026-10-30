import { StyleSheet, View } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import { uiColors } from '@/shared/theme/terem-tokens';
import { useTheme } from '@/shared/theme/use-theme';

export function RentalOutline({ text, success = false }: { text: string; success?: boolean }) {
  const theme = useTheme();
  // Системный SVG-шрифт обеспечивает контур и на Android, и на iOS.
  const long = text.length > 2;
  return <View accessible accessibilityLabel={success ? 'Получение подтверждено' : text} style={success ? s.success : [s.outline, long && { aspectRatio: 320 / 120 }]}>
    <Svg width="100%" height="100%" viewBox={success ? '0 0 310 118' : long ? '0 0 320 120' : '0 0 210 120'}>
      <SvgText x={5} y={104} fill="none" stroke={theme.text} strokeWidth={1.3} fontFamily="sans-serif" fontWeight="900" fontStyle="italic" fontSize={118} textLength={success ? 212 : long ? 308 : 192} lengthAdjust="spacingAndGlyphs">{text}</SvgText>
      {success ? <Path d="m224 68 18 18 43-47" fill="none" stroke={uiColors.orange} strokeWidth={18} strokeLinecap="square" /> : null}
    </Svg>
  </View>;
}

const s = StyleSheet.create({
  outline: { width: '100%', aspectRatio: 210 / 120 },
  success: { width: '100%', aspectRatio: 310 / 118 },
});

