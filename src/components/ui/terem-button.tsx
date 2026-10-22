import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';
import { uiColors, uiFonts, uiSizes, uiSpacing } from '@/constants/terem-tokens';

type TeremButtonProps = Omit<PressableProps, 'children' | 'style' | 'accessibilityLabel'> & {
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  trailingArrow?: boolean;
  compact?: boolean;
} & ({ label: string; accessibilityLabel?: string } | { label?: undefined; accessibilityLabel: string });

export function TeremButton({ label, icon, accessibilityLabel, variant = 'primary', trailingArrow = false, compact = false, disabled, ...props }: TeremButtonProps) {
  const iconOnly = !label;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        compact && styles.compact,
        iconOnly && styles.iconOnly,
        variant === 'secondary' && styles.secondary,
        variant === 'accent' && styles.accent,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
      {...props}>
      {icon}
      {label ? <Text style={[styles.label, variant === 'secondary' && styles.secondaryLabel, disabled && styles.disabledLabel]}>{label}</Text> : null}
      {trailingArrow && !iconOnly ? <Text style={[styles.arrow, variant === 'accent' && styles.accentArrow, disabled && styles.disabledLabel]}>→</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: uiSizes.button, backgroundColor: uiColors.ink, borderColor: uiColors.ink, borderWidth: uiSizes.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: uiSpacing.lg, gap: uiSpacing.sm },
  compact: { minHeight: uiSizes.touch },
  iconOnly: { width: uiSizes.touch, height: uiSizes.touch, minHeight: uiSizes.touch, paddingHorizontal: 0 },
  secondary: { backgroundColor: uiColors.paper },
  accent: { backgroundColor: uiColors.orange, borderColor: uiColors.orange },
  disabled: { backgroundColor: uiColors.disabled, borderColor: uiColors.disabled },
  pressed: { opacity: 0.78 },
  label: { color: uiColors.paper, fontFamily: uiFonts.display, fontSize: 18, lineHeight: 22, textTransform: 'uppercase', textAlign: 'center' },
  secondaryLabel: { color: uiColors.ink },
  disabledLabel: { color: uiColors.paper },
  arrow: { color: uiColors.orange, fontSize: 30, lineHeight: 32, position: 'absolute', right: uiSpacing.lg },
  accentArrow: { color: uiColors.paper },
});
