import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { uiColors, uiSizes, uiSpacing, uiType } from '@/constants/terem-tokens';

type TeremInputProps = TextInputProps & { label?: string; error?: string };

export function TeremInput({ label, error, onFocus, onBlur, style, ...props }: TeremInputProps) {
  const [focused, setFocused] = useState(false);
  return <View style={styles.wrapper}>
    {label ? <Text style={styles.label}>{label}</Text> : null}
    <TextInput
      {...props}
      accessibilityLabel={label ?? props.placeholder}
      placeholderTextColor={uiColors.muted}
      style={[styles.input, focused && styles.focused, !!error && styles.errorInput, style]}
      onFocus={(event) => { setFocused(true); onFocus?.(event); }}
      onBlur={(event) => { setFocused(false); onBlur?.(event); }}
    />
    {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
  </View>;
}

const styles = StyleSheet.create({
  wrapper: { gap: uiSpacing.xs },
  label: { ...uiType.label, color: uiColors.ink },
  input: { minHeight: uiSizes.input, borderWidth: 1, borderColor: uiColors.ink, backgroundColor: uiColors.paper, color: uiColors.ink, paddingHorizontal: uiSpacing.lg, fontSize: 16 },
  focused: { borderWidth: 2, borderColor: uiColors.orange },
  errorInput: { borderWidth: 2, borderColor: uiColors.danger },
  error: { ...uiType.caption, color: uiColors.danger },
});
