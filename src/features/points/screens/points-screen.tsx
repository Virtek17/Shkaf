import { filterPickupPoints, usePickupPoints } from '@/entities/pickup-point';
import { useProducts } from '@/entities/product';
import { useTheme } from '@/shared/theme/use-theme';
import { FailureState } from '@/shared/ui/failure-state';
import { ScreenHeader } from '@/shared/ui/screen-header';
import { TeremButton } from '@/shared/ui/terem-button';
import { TeremText } from '@/shared/ui/terem-text';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { PointCard } from '../components/point-card';
export function PointsScreen() {
 const { points, loading, error, reload } = usePickupPoints();
 const { products } = useProducts();
 const [query, setQuery] = useState('');
 const theme = useTheme(); const router = useRouter();
 if (loading && !points.length) return <FailureState title="Загружаем пункты…" />;
 if (error && !points.length) return <FailureState title="Пункты недоступны" message={error} onRetry={reload} />;
 return <FlatList data={filterPickupPoints(points, query)} keyExtractor={point => point.id}
  style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag"
  ListHeaderComponent={<View style={styles.header}>
   <ScreenHeader title="Пункты выдачи" />
   <TextInput value={query} onChangeText={setQuery} placeholder="Название или адрес" accessibilityLabel="Поиск пункта выдачи" returnKeyType="search" placeholderTextColor={theme.textSecondary} style={[styles.search, { color: theme.text, borderColor: theme.text, backgroundColor: theme.background }]} />
   {error ? <FailureState title="Не удалось обновить пункты" message={error} onRetry={reload} /> : null}
  </View>}
  ItemSeparatorComponent={() => <View style={styles.separator} />}
  ListEmptyComponent={<View style={styles.empty}>
   <TeremText variant="label">{query.trim() ? 'Пункты не найдены' : 'Пока нет пунктов выдачи'}</TeremText>
   <TeremText>{query.trim() ? 'Попробуйте другое название или адрес.' : 'Новые пункты появятся здесь.'}</TeremText>
   {query ? <TeremButton label="Сбросить поиск" variant="secondary" onPress={() => setQuery('')} /> : null}
  </View>}
  renderItem={({ item }) => {
   const items = products.filter(product => product.pickupPointId === item.id);
   const categories = [...new Set(items.map(product => product.category === 'technology' ? 'Техника' : 'Для отдыха'))];
   return <PointCard point={item} inventory={items.length ? `${categories.join(' · ')} · доступно ${items.filter(product => product.status === 'available').length} из ${items.length}` : 'Каталог пока пуст'} onOpen={() => router.navigate({ pathname: '/', params: { point: item.id } })} />;
  }} />;
}
const styles = StyleSheet.create({
 screen: { flex: 1 }, content: { paddingBottom: 12, paddingLeft: 3, paddingTop: 3 }, header: { gap: 16, marginBottom: 20 },
 search: { minHeight: 48, borderWidth: 1, paddingHorizontal: 12, fontSize: 16 }, separator: { height: 16 }, empty: { gap: 12, paddingVertical: 20 },
});
