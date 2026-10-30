import { View } from 'react-native';
import { RentalProductSummary } from '../rental-product-summary';
import { formatRentalPrice } from '../../constants/rental-options';
import { RentalAction, RentalLoading } from '../presentation';
import type { StageProps } from './stage-props';
import { s } from './rental-flow.styles';

export function CheckingStage({ product, period }: StageProps) {
  return <>
          <RentalLoading label="Проверяем вещь и готовим бронирование." />
          <RentalProductSummary product={product} description={`${product.pickupPoint.name} / ${product.pickupPoint.address}\n${period.label} · ${formatRentalPrice(product.pricePerHour)} / час`} />
          <View style={s.bottom}><RentalAction label="Подождите…" disabled /></View>
        </>;
}
