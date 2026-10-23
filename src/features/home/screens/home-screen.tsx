import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/ui/screen-header";
import { TeremButton } from "@/components/ui/terem-button";
import { TeremCard } from "@/components/ui/terem-card";
import { TeremText } from "@/components/ui/terem-text";
import { FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";
import { router } from "expo-router";

import { SearchIcon } from "@/components/icons";
import { Image } from "expo-image";
import { catalogProducts } from "@/features/home/data/catalog-products";
import { useTheme } from "@/hooks/use-theme";

export function HomeScreen() {
  const theme = useTheme();
  return (
    <ThemedView style={styles.screen}>
      <FlatList
        data={catalogProducts}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.cardRow}
        ItemSeparatorComponent={() => <View style={styles.cardGap} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <View style={styles.block}>
              <ScreenHeader
                title="Бери."
                titleText2="Пользуйся."
                titleText3="Возвращай."
              />
            </View>
            <View style={[styles.searchBar, styles.block]}>
              <TextInput
                style={[styles.input, { color: theme.text, borderColor: theme.text }]}
                placeholder="Найти вещь"
                placeholderTextColor={theme.textSecondary}
              />
              <TeremButton
                icon={<SearchIcon width={24} height={24} />}
                accessibilityLabel="Поиск"
              />
            </View>
            <View style={[styles.buttonRow, styles.block]}>
              <TeremButton variant="secondary" compact label="все" />
              <TeremButton variant="secondary" compact label="техника" />
              <TeremButton variant="secondary" compact label="для отдыха" />
            </View>
          </>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemCard}
            accessibilityRole="button"
            accessibilityLabel={`${item.name}, ${item.price} рублей в час`}
            onPress={() =>
              router.push({ pathname: '/product/[id]', params: { id: item.id } })
            }
          >
            <TeremCard style={styles.cardContent}>
              <View style={styles.productImage}>
                <Image
                  source={item.photo}
                  style={styles.productImageContent}
                  contentFit="contain"
                  alt={item.name}
                />
              </View>

              <TeremText
                style={styles.name}
                variant="cardTitle"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.name}
              </TeremText>
              <TeremText style={styles.price} accent>
                {item.price} ₽ / час
              </TeremText>
            </TeremCard>
          </Pressable>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  listContent: { paddingBottom: 8 },
  cardRow: { gap: 12, alignItems: "stretch" },
  cardGap: { height: 12 },
  itemCard: { flex: 1, minWidth: 0, gap: 8 },
  cardContent: { flex: 1, gap: 8 },
  productImage: { width: "100%", aspectRatio: 1 },
  productImageContent: { width: "100%", height: "100%" },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  block: {
    marginBottom: 12,
  },
  name: {
    fontSize: 14,
  },
  price: {
    marginTop: "auto",
    fontSize: 14,
    fontWeight: "bold",
  },
});
