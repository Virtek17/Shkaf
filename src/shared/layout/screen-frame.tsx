import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "../hooks/use-color-scheme";
import { useTheme } from "../theme/use-theme";
import { GridBackground } from "./grid-background";
import { HazardStripe, hazardStripeHeight } from "./hazard-stripe";

/** Декор у края экрана; содержимое защищено safe area независимо от декора. */
export function ScreenFrame({
  children,
  stripe = true,
  grid = true,
  safeTop = true,
  bodyStyle,
}: {
  children: ReactNode;
  stripe?: boolean;
  grid?: boolean;
  safeTop?: boolean;
  bodyStyle?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const scheme = useColorScheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      {grid ? <GridBackground dark={scheme === "dark"} /> : null}
      {stripe ? (
        <View pointerEvents="none" style={styles.decoration}>
          <HazardStripe />
        </View>
      ) : null}
      <View
        style={[
          styles.root,
          {
            // На web без системной строки контент тоже не перекроет полосу.
            paddingTop: Math.max(safeTop ? insets.top : 0, stripe ? hazardStripeHeight : 0),
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        ]}
      >
        {bodyStyle ? (
          <View style={[styles.root, bodyStyle]}>{children}</View>
        ) : (
          children
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1 },
  decoration: { position: "absolute", top: 0, left: 0, right: 0 },
});
