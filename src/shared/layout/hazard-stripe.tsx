import { uiColors } from "@/shared/theme/terem-tokens";
import { useId } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Defs, Path, Pattern, Rect } from "react-native-svg";

export const hazardStripeHeight = 12;

/** Повторяющийся рисунок сохраняет размер диагоналей при любой ширине экрана. */
export function HazardStripe() {
  const id = `hazard-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <View
      pointerEvents="none"
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={styles.stripe}
    >
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern id={id} width={40} height={12} patternUnits="userSpaceOnUse">
            <Rect width={40} height={12} fill={uiColors.orange} />
            <Path d="M-12 0H8L20 12H0ZM28 0H48L60 12H40Z" fill={uiColors.ink} />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  stripe: {
    height: hazardStripeHeight,
    flexShrink: 0,
    overflow: "hidden",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: uiColors.orange,
  },
});
