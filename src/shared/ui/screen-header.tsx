import { ThemedText } from "@/shared/ui/themed-text";
import { StyleSheet, View } from "react-native";

export function ScreenHeader({
  title,
  titleText2,
  titleText3,
}: {
  title: string;
  titleText2?: string;
  titleText3?: string;
}) {
  return (
    <View>
      <ThemedText style={styles.title} type="subtitle">
        {title} <ThemedText style={styles.accentTitle}>{titleText2}</ThemedText>{" "}
        {titleText3}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    lineHeight: 30,
  },
  accentTitle: {
    color: "#FD4F03",
    fontSize: 30,
  },
});
