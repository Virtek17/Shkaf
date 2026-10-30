import type { Product } from '@/entities/product';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TeremCard } from '@/shared/ui/terem-card';
import { TeremText } from '@/shared/ui/terem-text';
import { uiColors } from '@/shared/theme/terem-tokens';

export function ProductCard({ product: item }: { product: Product }) {
  const router = useRouter();
  return <Pressable
            style={styles.itemCard}
            accessibilityRole="button"
            accessibilityLabel={`${item.name}, ${item.pricePerHour} рублей в час, ${item.status === "rented" ? "в аренде" : "доступен"}`}
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { id: item.id },
              })
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
                <View
                  style={[
                    styles.bage,
                    item.status === "rented" && styles.rentedBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.bageText,
                      item.status === "rented" && styles.rentedBadgeText,
                    ]}
                  >
                    {item.status === "rented" ? "В АРЕНДЕ" : "ДОСТУПНО"}
                  </Text>
                </View>
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
                {item.pricePerHour} ₽ / час
              </TeremText>
            </TeremCard>
          </Pressable>;
}

const styles = StyleSheet.create({
  itemCard: { flex: 1, minWidth: 0, gap: 8 },
  cardContent: { flex: 1, gap: 8 },
  productImage: { width: "100%", aspectRatio: 1 },
  productImageContent: { width: "100%", height: "100%" },
  name: {
    fontSize: 14,
  },
  price: {
    marginTop: "auto",
    fontSize: 14,
    fontWeight: "bold",
  },
  bage: {
    backgroundColor: "#00C840",
    position: "absolute",
    top: 3,
    right: 3,
    // padding: 5,
    paddingBottom: 3,
    paddingTop: 3,
    paddingLeft: 5,
    paddingRight: 5,
  },
  bageText: {
    fontSize: 12,
    color: "#ffffff",
  },
  rentedBadge: {
    backgroundColor: uiColors.orange,
  },
  rentedBadgeText: {
    fontWeight: "700",
  },

});
