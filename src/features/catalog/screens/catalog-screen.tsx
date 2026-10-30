import { usePickupPoints } from '@/entities/pickup-point';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useProducts, type Product } from "@/entities/product";
import { useTheme } from "@/shared/theme/use-theme";
import { FailureState } from "@/shared/ui/failure-state";
import { SearchIcon } from "@/shared/ui/icons";
import { ScreenHeader } from "@/shared/ui/screen-header";
import { TeremButton } from "@/shared/ui/terem-button";
import { TeremText } from "@/shared/ui/terem-text";
import { useMemo, useState } from "react";
import {
  Keyboard,
  SectionList,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ProductCard } from "../components/product-card";
import {
  catalogCategories,
  filterProducts,
  productRows,
  type CatalogCategory,
} from "../model/catalog-filter";

export function CatalogScreen() {
  const { products, loading, error, reload } = useProducts();
  const theme = useTheme();
  const params = useLocalSearchParams<{ point?: string | string[] }>();
  const pointId = typeof params.point === 'string' ? params.point : undefined;
  const { points, loading: pointsLoading, error: pointsError, reload: reloadPoints } = usePickupPoints();
  const selectedPoint = points.find(point => point.id === pointId);
  const router = useRouter();
  const [category, setCategory] = useState<CatalogCategory>("all");
  const [query, setQuery] = useState("");
  const rows = useMemo(
    () => productRows(filterProducts(products, category, query, pointId)),
    [products, category, query, pointId],
  );
  const sections = useMemo(() => [{ key: "catalog", data: rows }], [rows]);

  if (!products.length && loading)
    return <FailureState title="Загружаем товары…" />;
  if (!products.length && error)
    return (
      <FailureState
        title="Каталог недоступен"
        message={error}
        onRetry={reload}
      />
    );

  if (pointId && !selectedPoint) return <FailureState
    title={pointsLoading ? 'Загружаем пункт…' : pointsError ? 'Не удалось загрузить пункт' : 'Пункт не найден'}
    onRetry={pointsError ? reloadPoints : () => router.setParams({ point: undefined })} />;
  if (selectedPoint?.status === 'unavailable') return <FailureState title="Пункт временно недоступен"
    message={selectedPoint.unavailableReason} onRetry={() => router.navigate('/points')} />;
  return (
    <SectionList<Product[]>
      style={styles.screen}
      sections={sections}
      stickySectionHeadersEnabled
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      keyExtractor={(row) => row.map((product) => product.id).join(":")}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <View style={styles.cardGap} />}
      ListHeaderComponent={
        <View style={styles.banner}>
          <ScreenHeader
            title="Бери."
            titleText2="Пользуйся."
            titleText3="Возвращай."
          />
        </View>
      }
      renderSectionHeader={() => (
        <View style={[styles.filters, { backgroundColor: theme.background }]}>
          {selectedPoint ? <View style={{ gap: 8 }}>
            <TeremText variant="label" accent>{selectedPoint.name} · {selectedPoint.address}</TeremText>
            <TeremButton compact label="Сменить пункт" variant="secondary" onPress={() => router.navigate('/points')} />
            <TeremButton compact label="Все пункты" variant="secondary" onPress={() => router.setParams({ point: undefined })} />
          </View> : null}
          <View style={styles.searchBar}>
            <TextInput
              accessibilityLabel="Найти вещь"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={Keyboard.dismiss}
              returnKeyType="search"
              style={[
                styles.input,
                { color: theme.text, borderColor: theme.text },
              ]}
              placeholder="Найти вещь"
              placeholderTextColor={theme.textSecondary}
            />
            <TeremButton
              icon={<SearchIcon width={24} height={24} />}
              accessibilityLabel="Поиск"
              onPress={Keyboard.dismiss}
            />
          </View>
          <View style={styles.buttonRow}>
            {catalogCategories.map((option) => (
              <TeremButton
                key={option.value}
                variant={category === option.value ? "accent" : "secondary"}
                accessibilityState={{ selected: category === option.value }}
                compact
                label={option.label}
                onPress={() => setCategory(option.value)}
              />
            ))}
          </View>
        </View>
      )}
      renderSectionFooter={() =>
        rows.length ? null : (
          <View style={styles.empty}>
            <TeremText variant="label">Ничего не найдено</TeremText>
            <TeremText>
              Попробуйте другую категорию или измените запрос.
            </TeremText>
            <TeremButton
              label="Сбросить фильтры"
              variant="secondary"
              onPress={() => {
                setCategory("all");
                setQuery("");
              }}
            />
          </View>
        )
      }
      renderItem={({ item }) => (
        <View style={styles.cardRow}>
          {item.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {item.length === 1 ? <View style={styles.placeholder} /> : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  listContent: { paddingBottom: 8 },
  banner: { marginBottom: 12 },
  filters: { gap: 12, paddingBottom: 12 },
  searchBar: { flexDirection: "row", gap: 8 },
  input: { flex: 1, minWidth: 0, padding: 10, borderWidth: 1 },
  buttonRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  cardRow: { flexDirection: "row", gap: 12, alignItems: "stretch" },
  cardGap: { height: 12 },
  placeholder: { flex: 1 },
  empty: { paddingVertical: 20, gap: 12 },
});
