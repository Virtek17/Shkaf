import { useId } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, LinearGradient, Path, Rect, Stop, Text } from 'react-native-svg';

export function LockerPreview() {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return <View accessible accessibilityLabel="Схема шкафа: ваша ячейка 03, справа сверху" style={styles.frame}>
    <Svg width="100%" height="100%" viewBox="0 0 320 310">
      <Defs>
        <LinearGradient id={`metal-${id}`} x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#F0EFEB" /><Stop offset="0.45" stopColor="#C9C8C4" /><Stop offset="1" stopColor="#8E8F8C" /></LinearGradient>
        <LinearGradient id={`wall-${id}`} x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#595A57" /><Stop offset="0.5" stopColor="#777874" /><Stop offset="1" stopColor="#41423F" /></LinearGradient>
        <LinearGradient id={`orange-${id}`} x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#FF6813" /><Stop offset="1" stopColor="#F04600" /></LinearGradient>
      </Defs>
      <Rect width={320} height={310} fill={`url(#wall-${id})`} />
      {Array.from({ length: 32 }, (_, i) => <Path key={i} d={`M${(i * 53) % 320} ${(i * 79) % 310}h${5 + i % 7}`} stroke={i % 2 ? '#D6D4CC' : '#181A18'} opacity={0.16} strokeWidth={1} />)}
      <Rect x={18} y={14} width={287} height={282} fill="#1A1B19" stroke="#333531" strokeWidth={5} />
      <Rect x={26} y={22} width={271} height={264} fill="#080908" />
      {Array.from({ length: 6 }, (_, i) => {
        const number = i + 1;
        return <G key={number} transform={`translate(${30 + (i % 3) * 89}, ${26 + Math.floor(i / 3) * 130})`}>
          <Rect width={84} height={125} fill={number === 3 ? `url(#orange-${id})` : `url(#metal-${id})`} stroke="#111310" />
          <Path d="M2 123V2h80" stroke="#FFFFFF" strokeOpacity={0.45} strokeWidth={1} fill="none" />
          <Text x={14} y={32} fontFamily="sans-serif" fontWeight="900" fontStyle="italic" fontSize={24} fill="#0B0C0B">{`0${number}`}</Text>
          {number === 3 ? <Text x={9} y={50} fontFamily="sans-serif" fontWeight="700" fontSize={7} fill="#111111">ВАША ЯЧЕЙКА</Text> : null}
          <Rect x={10} y={67} width={6} height={29} rx={1} fill="#171916" />
          <Rect x={11} y={68} width={1} height={26} fill="#636661" />
          {[0, 1, 2, 3].map((vent) => <Path key={vent} d={`M36 ${103 + vent * 3}h24`} stroke="#575A54" strokeWidth={1} />)}
          <Circle cx={76} cy={8} r={1} fill="#858880" />
        </G>;
      })}
      <Path d="M18 298h286" stroke="#11120F" strokeWidth={5} />
    </Svg>
  </View>;
}
const styles = StyleSheet.create({
  frame: { width: '100%', aspectRatio: 320 / 310 },
});
