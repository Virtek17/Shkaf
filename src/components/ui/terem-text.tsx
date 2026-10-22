import { StyleSheet, Text, type TextProps } from 'react-native';
import { uiColors, uiType } from '@/constants/terem-tokens';

type TeremTextProps = TextProps & { variant?: keyof typeof uiType; accent?: boolean };

export function TeremText({ variant = 'body', accent = false, style, ...props }: TeremTextProps) {
  return <Text style={[styles.base, uiType[variant], accent && styles.accent, style]} {...props} />;
}

const styles = StyleSheet.create({ base: { color: uiColors.ink }, accent: { color: uiColors.orange } });
