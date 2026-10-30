import { useEffect, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { TeremText } from '@/shared/ui/terem-text';
import { uiColors } from '@/shared/theme/terem-tokens';
import { useTheme } from '@/shared/theme/use-theme';

export function RentalLoading({ label, compact = false }: { label: string; compact?: boolean }) {
  const theme = useTheme();
  const [rotation] = useState(() => new Animated.Value(0));
  useEffect(() => {
    const loop = Animated.loop(Animated.timing(rotation, { toValue: 1, duration: 1300, easing: Easing.linear, useNativeDriver: Platform.OS !== 'web' }));
    loop.start();
    return () => loop.stop();
  }, [rotation]);
  const size = compact ? 30 : 108;
  return <View accessibilityRole="progressbar" accessibilityLabel={label} style={[s.loading, compact && s.loadingCompact]}>
    <Animated.View style={{ width: size, height: size, transform: [{ rotate: rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Circle cx={50} cy={50} r={42} fill="none" stroke={theme.backgroundSelected} strokeWidth={10} />
        <Path d="M50 8a42 42 0 0 1 34 67" fill="none" stroke={uiColors.orange} strokeWidth={10} strokeLinecap="round" />
      </Svg>
    </Animated.View>
    <TeremText style={[s.loadingText, compact && s.compactText]}>{label}</TeremText>
  </View>;
}

const s = StyleSheet.create({
  loading: { alignItems: 'center', gap: 18, paddingVertical: 12 },
  loadingCompact: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 0, gap: 10 },
  loadingText: { textAlign: 'center', maxWidth: 280, fontSize: 16, lineHeight: 22 },
  compactText: { fontSize: 13, fontWeight: '600', flexShrink: 1 },
});

