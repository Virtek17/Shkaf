import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { uiColors, uiSizes, uiSpacing, uiType } from '@/constants/terem-tokens';
import { useTheme } from '@/hooks/use-theme';

type TeremInputProps = TextInputProps & { label?: string; error?: string };

export function TeremInput({ label, error, onFocus, onBlur, style, ...props }: TeremInputProps) {
  const [focused, setFocused] = useState(false);
  const theme = useTheme();
  return <View style={styles.wrapper}>
    {label ? <Text style={[styles.label, { color: theme.text }]}>{label}</Text> : null}
    <TextInput
      {...props}
      accessibilityLabel={label ?? props.placeholder}
      placeholderTextColor={theme.textSecondary}
      style={[styles.input, { borderColor: theme.text, backgroundColor: theme.background, color: theme.text }, focused && styles.focused, !!error && styles.errorInput, style]}
      onFocus={(event) => { setFocused(true); onFocus?.(event); }}
      onBlur={(event) => { setFocused(false); onBlur?.(event); }}
    />
    {error ? <Text accessibilityRole="alert" style={[styles.error, theme.background === '#000000' && styles.darkError]}>{error}</Text> : null}
  </View>;
}

const styles = StyleSheet.create({
  wrapper: { gap: uiSpacing.xs },
  label: { ...uiType.label },
  input: { minHeight: uiSizes.input, borderWidth: 1, paddingHorizontal: uiSpacing.lg, fontSize: 16 },
  focused: { borderWidth: 2, borderColor: uiColors.orange },
  errorInput: { borderWidth: 2, borderColor: uiColors.danger },
  error: { ...uiType.caption, color: uiColors.danger },
  darkError: { color: '#FF8A80' },
});
