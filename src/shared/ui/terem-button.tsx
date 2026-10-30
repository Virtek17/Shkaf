import {
  uiColors,
  uiFonts,
  uiSizes,
  uiSpacing,
} from "@/shared/theme/terem-tokens";
import { useTheme } from "@/shared/theme/use-theme";
import type { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type TextStyle,
} from "react-native";

type TeremButtonProps = Omit<
  PressableProps,
  "children" | "style" | "accessibilityLabel"
> & {
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "mini";
  trailingArrow?: boolean;
  compact?: boolean;
  labelStyle?: StyleProp<TextStyle>;
} & (
    | { label: string; accessibilityLabel?: string }
    | { label?: undefined; accessibilityLabel: string }
  );

export function TeremButton({
  label,
  icon,
  accessibilityLabel,
  variant = "primary",
  trailingArrow = false,
  compact = false,
  disabled,
  labelStyle,
  ...props
}: TeremButtonProps) {
  const theme = useTheme();
  const iconOnly = !label;
  const showArrow = trailingArrow && !iconOnly && !disabled;
  const isDark = theme.background === "#000000";
  const backgroundColor = disabled
    ? uiColors.disabled
    : variant === "accent"
      ? uiColors.orange
      : variant === "secondary"
        ? theme.background
        : isDark
          ? theme.backgroundElement
          : uiColors.ink;
  const borderColor = disabled
    ? uiColors.disabled
    : variant === "accent"
      ? uiColors.orange
      : theme.text;
  const labelColor = disabled
    ? uiColors.paper
    : variant === "secondary"
      ? theme.text
      : uiColors.paper;

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
        showArrow && styles.withArrow,
        pressed && !disabled && styles.pressed,
      ]}
      {...props}
    >
      {icon}
      {label ? (
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
          style={[styles.label, { color: labelColor }, labelStyle]}
        >
          {label.toLocaleUpperCase("ru-RU")}
        </Text>
      ) : null}
      {showArrow ? (
        <Text
          style={[
            styles.arrow,
            { color: variant === "accent" ? uiColors.paper : uiColors.orange },
          ]}
        >
          →
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: uiSizes.button,
    backgroundColor: uiColors.ink,
    borderColor: uiColors.ink,
    borderWidth: uiSizes.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: uiSpacing.lg,
    gap: uiSpacing.sm,
  },
  compact: { minHeight: 30 },
  iconOnly: {
    width: uiSizes.touch,
    height: uiSizes.touch,
    minHeight: uiSizes.touch,
    paddingHorizontal: 0,
  },
  withArrow: { paddingHorizontal: uiSizes.touch },
  pressed: { opacity: 0.78 },
  label: {
    color: uiColors.paper,
    fontFamily: uiFonts.display,
    fontSize: 18,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    textAlign: "center",
    includeFontPadding: true,
  },
  arrow: {
    color: uiColors.orange,
    fontSize: 30,
    lineHeight: 32,
    position: "absolute",
    right: uiSpacing.lg,
  },
});
