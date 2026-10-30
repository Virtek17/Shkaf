import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { TeremText } from '@/shared/ui/terem-text';
import type { Product } from '@/entities/product';
import { useTheme } from '@/shared/theme/use-theme';
import { formatRentalPrice } from '../constants/rental-options';

export function RentalProductSummary({ product, description, status, framed = true }: { product: Product; description?: string; status?: string; framed?: boolean }) {
  const theme = useTheme();
  return <View style={[styles.card, { borderColor: theme.text, backgroundColor: theme.background }, framed ? { boxShadow: `4px 4px 0 ${theme.text}` } : styles.unframed]}>
    <View style={styles.imageFrame}><Image source={product.photo} contentFit="contain" style={styles.photo} alt={product.name} /></View>
    <View style={styles.info}>
      <TeremText variant="cardTitle" numberOfLines={2} style={styles.name}>{product.name.toLocaleUpperCase('ru-RU')}</TeremText>
      <TeremText variant="caption" style={styles.code}>{product.displayCode}</TeremText>
      {status ? <View style={styles.badge}><TeremText variant="label" style={styles.badgeText}>{status}</TeremText></View> : null}
      <TeremText variant="caption" style={styles.details}>{description ?? `${product.pickupPoint.name} · ${product.pickupPoint.address}\n${formatRentalPrice(product.pricePerHour)} / час`}</TeremText>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, padding: 9, flexDirection: 'row', gap: 12, marginRight: 4, marginBottom: 4 },
  imageFrame: { width: '30%', aspectRatio: 1, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  photo: { width: '100%', height: '100%' },
  info: { flex: 1, minWidth: 0, justifyContent: 'center', gap: 4, paddingVertical: 2 },
  name: { fontSize: 16, lineHeight: 21, transform: [{ skewX: '-9deg' }] },
  code: { fontFamily: 'monospace', fontSize: 10 },
  details: { fontSize: 12, lineHeight: 16 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#FF4D00', paddingHorizontal: 6, paddingVertical: 3 },
  badgeText: { color: '#FFFFFF', fontSize: 10 },
  unframed: { borderWidth: 0, marginRight: 0, marginBottom: 0 },
});
