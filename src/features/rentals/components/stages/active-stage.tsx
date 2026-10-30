import { View } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { RentalProductSummary } from '../rental-product-summary';
import { formatRentalPrice } from '../../constants/rental-options';
import { formatRentalTime } from '../../model/format';
import { RentalAction, RentalOutline, RentalPanel, RentalTableRow, RentalTitle } from '../presentation';
import type { StageProps } from './stage-props';
import { s } from './rental-flow.styles';

export function ActiveStage({ session, product, period, content, total, catalogue, openRentals }: StageProps) {
  const theme = useTheme();
  const startedAt = session.stage === 'active' ? session.startedAt : 0;
  return <>
          <View style={s.success}><RentalOutline text="OK" success /><RentalTitle small>{content.title}</RentalTitle></View>
          <RentalPanel>
            <RentalProductSummary product={product} description={`${period.label} · ${formatRentalPrice(product.pricePerHour)} / час`} framed={false} />
            <View style={[s.receiptDivider, { backgroundColor: theme.text }]} />
            <RentalTableRow icon="clock" label="Начало" value={formatRentalTime(startedAt)} />
            <RentalTableRow icon="clock" label="Вернуть до" value={`${formatRentalTime(startedAt + period.hours * 3600000)} · ${new Date(startedAt + period.hours * 3600000).toLocaleDateString('ru-RU')}`} />
            <RentalTableRow icon="pin" label="Пункт" value={`${product.pickupPoint.name} / ${product.pickupPoint.address}`} />
            <RentalTableRow icon="card" label="Стоимость" value={formatRentalPrice(total)} last />
          </RentalPanel>
          <View style={s.bottom}><RentalAction label="Открыть аренду" trailingArrow onPress={openRentals} /><RentalAction label="В каталог" compact variant="secondary" trailingArrow onPress={catalogue} /></View>
        </>;
}
