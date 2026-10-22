import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/ui/screen-header";
import { View } from "react-native";

export function RentalsScreen() {
  return (
    <ThemedView>
      <ScreenHeader title="Аренды" />
      <View>
        <ThemedText>Здесь будет инфа о ваших арендах</ThemedText>
      </View>
    </ThemedView>
  );
}
