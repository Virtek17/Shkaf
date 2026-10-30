import { StyleSheet, Text, type TextProps } from 'react-native';
import { uiColors, uiType } from '@/shared/theme/terem-tokens';
import { useTheme } from '@/shared/theme/use-theme';

type TeremTextProps = TextProps & { variant?: keyof typeof uiType; accent?: boolean };

export function TeremText({ variant = 'body', accent = false, style, ...props }: TeremTextProps) {
  const theme = useTheme();
  return <Text style={[{ color: theme.text }, uiType[variant], accent && styles.accent, style]} {...props} />;
}

const styles = StyleSheet.create({ accent: { color: uiColors.orange } });
