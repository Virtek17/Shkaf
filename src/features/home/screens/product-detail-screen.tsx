import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GridBackground } from '@/components/ui/grid-background';
import { TeremText } from '@/components/ui/terem-text';
import { uiColors, uiSpacing } from '@/constants/terem-tokens';
import { getCatalogProduct } from '@/features/home/data/catalog-products';

export function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const product = getCatalogProduct(id ?? '');

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  return (
    <View style={styles.screen}>
      <GridBackground />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + uiSpacing.lg, paddingBottom: insets.bottom + uiSpacing.xl },
        ]}
      >
        <Pressable onPress={goBack} accessibilityRole="button" accessibilityLabel="Назад в каталог" style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backLabel}>КАТАЛОГ</Text>
        </Pressable>

        {product ? (
          <>
            <TeremText variant="caption" style={styles.id}>ВЕЩЬ / ID_{product.id.padStart(3, '0')}</TeremText>
            <TeremText variant="section" style={styles.title}>{product.name}</TeremText>
            <View style={styles.imageFrame}>
              <Image source={product.photo} style={styles.image} contentFit="contain" alt={product.name} />
            </View>
            <TeremText variant="section" accent style={styles.price}>{product.price} ₽ / час</TeremText>
            {product.description ? (
              <View style={styles.descriptionSection}>
                <TeremText variant="label">О ТОВАРЕ</TeremText>
                <TeremText>{product.description}</TeremText>
              </View>
            ) : null}
          </>
        ) : (
          <TeremText variant="section">Товар не найден</TeremText>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: uiColors.paper },
  content: { paddingHorizontal: uiSpacing.xl, gap: uiSpacing.lg },
  backButton: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: uiSpacing.md, alignSelf: 'flex-start' },
  backArrow: { fontSize: 30, color: uiColors.ink },
  backLabel: { fontSize: 14, fontWeight: '700', color: uiColors.ink },
  id: { color: uiColors.muted },
  title: { color: uiColors.ink },
  imageFrame: { width: '100%', aspectRatio: 1, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  price: { borderTopWidth: 2, borderTopColor: uiColors.ink, paddingTop: uiSpacing.md },
  descriptionSection: { borderTopWidth: 1, borderTopColor: uiColors.ink, paddingTop: uiSpacing.md, gap: uiSpacing.sm },
});
