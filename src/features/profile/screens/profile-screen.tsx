import { ThemedText } from "@/shared/ui/themed-text";
import { ThemedView } from "@/shared/ui/themed-view";
import { ScreenHeader } from "@/shared/ui/screen-header";
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
