import { StyleSheet, View } from "react-native";
import { TeremButton } from "./terem-button";
import { TeremText } from "./terem-text";

export function FailureState({
  title,
  message,
  onRetry,
}: {
  title: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <View accessibilityRole="alert" style={styles.content}>
      <TeremText variant="section">{title}</TeremText>
      {message ? <TeremText>{message}</TeremText> : null}
      {onRetry ? <TeremButton label="Повторить" onPress={onRetry} /> : null}
    </View>
  );
}
const styles = StyleSheet.create({ content: { padding: 16, gap: 16 } });
