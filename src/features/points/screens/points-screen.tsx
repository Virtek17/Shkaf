import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/ui/screen-header";
import { View } from "react-native";

export function PointsScreen() {
  return (
    <ThemedView>
      <ScreenHeader title="Пункты выдачи" />
      <View>
        <ThemedText>Здесь будут пункты выдачи</ThemedText>
      </View>
    </ThemedView>
  );
}
