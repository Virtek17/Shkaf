import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@/shared/theme/use-theme';

export type RentalIconName = 'arrow' | 'pin' | 'clock' | 'kit' | 'card' | 'camera' | 'check' | 'info' | 'warning';
const iconPaths: Record<RentalIconName, string> = {
  arrow: 'M4 12h16M14 5l7 7-7 7',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM12 7v5M9.5 9.5h5',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 6v6l4 2',
  kit: 'M4 7h16v13H4ZM8 7V4h8v3M4 12h16M10 12v3h4v-3',
  card: 'M3 5h18v14H3ZM3 9h18M6 15h4',
  camera: 'M3 7h5l2-3h4l2 3h5v13H3ZM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  check: 'M4 12l5 5L21 5',
  info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 11v6M12 7v1',
  warning: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 6v8M12 17v1',
};
export function RentalIcon({ name, size = 22, color }: { name: RentalIconName; size?: number; color?: string }) {
  const theme = useTheme();
  return <Svg width={size} height={size} viewBox="0 0 24 24"><Path d={iconPaths[name]} fill="none" stroke={color ?? theme.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
}
