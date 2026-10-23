import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';
import { uiColors, uiFonts, uiSizes, uiSpacing } from '@/constants/terem-tokens';
import { useTheme } from '@/hooks/use-theme';

type TeremButtonProps = Omit<PressableProps, 'children' | 'style' | 'accessibilityLabel'> & {
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  trailingArrow?: boolean;
  compact?: boolean;
} & ({ label: string; accessibilityLabel?: string } | { label?: undefined; accessibilityLabel: string });

export function TeremButton({ label, icon, accessibilityLabel, variant = 'primary', trailingArrow = false, compact = false, disabled, ...props }: TeremButtonProps) {
  const theme = useTheme();
  const iconOnly = !label;
  const isDark = theme.background === '#000000';
  const backgroundColor = disabled
    ? uiColors.disabled
    : variant === 'accent'
      ? uiColors.orange
      : variant === 'secondary'
        ? theme.background
        : isDark ? theme.backgroundElement : uiColors.ink;
  const borderColor = disabled ? uiColors.disabled : variant === 'accent' ? uiColors.orange : theme.text;
  const labelColor = disabled ? uiColors.paper : variant === 'secondary' ? theme.text : uiColors.paper;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor, borderColor },
        compact && styles.compact,
        iconOnly && styles.iconOnly,
        pressed && !disabled && styles.pressed,
      ]}
      {...props}>
      {icon}
      {label ? <Text style={[styles.label, { color: labelColor }]}>{label}</Text> : null}
      {trailingArrow && !iconOnly ? <Text style={[styles.arrow, { color: variant === 'accent' || disabled ? uiColors.paper : uiColors.orange }]}>→</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: uiSizes.button, backgroundColor: uiColors.ink, borderColor: uiColors.ink, borderWidth: uiSizes.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: uiSpacing.lg, gap: uiSpacing.sm },
  compact: { minHeight: uiSizes.touch },
  iconOnly: { width: uiSizes.touch, height: uiSizes.touch, minHeight: uiSizes.touch, paddingHorizontal: 0 },
  pressed: { opacity: 0.78 },
  label: { color: uiColors.paper, fontFamily: uiFonts.display, fontSize: 18, lineHeight: 22, textTransform: 'uppercase', textAlign: 'center' },
  arrow: { color: uiColors.orange, fontSize: 30, lineHeight: 32, position: 'absolute', right: uiSpacing.lg },
});
