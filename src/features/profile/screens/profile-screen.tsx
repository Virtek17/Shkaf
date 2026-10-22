import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/ui/screen-header";
import { View } from "react-native";

export function ProfileScreen() {
  return (
    <ThemedView>
      <ScreenHeader title="Профиль" />
      <View>
        <ThemedText>Здесь будет инфа о пользователе</ThemedText>
      </View>
    </ThemedView>
  );
}
