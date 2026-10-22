import { StyleSheet, View, type ViewProps } from "react-native";

export function TeremCard({ style, ...props }: ViewProps) {
  return <View style={[styles.card, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    // borderColor: "red",
    // borderWidth: 1,
    // backgroundColor: "#ffffff",
  },
});
