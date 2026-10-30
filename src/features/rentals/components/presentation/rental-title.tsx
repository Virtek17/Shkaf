import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TeremText } from '@/shared/ui/terem-text';
import { fitDisplayText } from '../../constants/display-text-width';

export function RentalTitle({ children, small = false }: { children: string; small?: boolean }) {
  const [width, setWidth] = useState(0);
  const lines = children.split('\n');
  const fontSize = Math.min(...lines.map((line) => fitDisplayText(line, small ? 31 : 40, width - 8)));
  return <View accessibilityRole="header" style={s.title} onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
    {lines.map((line, index) => <TeremText key={index} variant="section" numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.5} style={[s.titleLine, { fontSize, lineHeight: Math.ceil(fontSize * 1.18) }]}>{line}</TeremText>)}
  </View>;
}

const s = StyleSheet.create({
  title: { paddingHorizontal: 4 },
  titleLine: { fontSize: 40, lineHeight: 46, transform: [{ skewX: '-9deg' }], includeFontPadding: false },
});

