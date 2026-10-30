import { TeremButton } from "@/shared/ui/terem-button";
import { useState, type ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import { fitDisplayText } from "../../constants/display-text-width";

export function RentalAction(props: ComponentProps<typeof TeremButton>) {
  const [width, setWidth] = useState(0);
  const padding =
    (props.trailingArrow && !props.disabled ? 96 : 32) + (props.icon ? 28 : 0);
  return (
    <View
      style={s.action}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
    >
      <TeremButton
        {...props}
        labelStyle={[
          s.actionLabel,
          { fontSize: fitDisplayText(props.label ?? "", 16, width - padding) },
        ]}
      />
    </View>
  );
}

const s = StyleSheet.create({
  actionLabel: { fontSize: 16, transform: [{ skewX: "-9deg" }] },
  action: { width: "100%" },
});
