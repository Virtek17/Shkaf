import { Pressable, View } from 'react-native';
import { TeremText } from '@/shared/ui/terem-text';
import { useTheme } from '@/shared/theme/use-theme';
import { RentalProductSummary } from '../rental-product-summary';
import { formatRentalPrice } from '../../constants/rental-options';
import { RentalAction, RentalLoading, RentalNotice, RentalTimer, RentalIcon } from '../presentation';
import type { StageProps } from './stage-props';
import { s } from './rental-flow.styles';

export function PaymentStage({ product, period, stage, countdown, total, paymentMethod, setPaymentMethod, actions }: StageProps) {
  const theme = useTheme();
  const border = { borderColor: theme.text };
  return <>
          {stage === 'payment-error' ? <RentalNotice title="Банк отклонил платёж." text="Попробуйте ещё раз или выберите другой способ." /> : null}
          <RentalTimer value={countdown} />
          <RentalProductSummary product={product} description={`${product.pickupPoint.name} / ${product.pickupPoint.address}\n${period.label} · ${formatRentalPrice(product.pricePerHour)} / час`} />
          <Pressable accessibilityRole="button" accessibilityLabel="Изменить способ оплаты" disabled={stage === 'paying'} onPress={() => setPaymentMethod((method) => method === 'Карта' ? 'СБП' : 'Карта')} style={[s.paymentMethod, border, { backgroundColor: theme.background }]}>
            <RentalIcon name="card" size={19} /><TeremText style={s.small}>Способ оплаты</TeremText><TeremText style={s.methodValue}>{paymentMethod === 'Карта' ? 'Банковская карта' : 'СБП'}</TeremText><TeremText>›</TeremText>
          </Pressable>
          <View style={[s.total, border, { backgroundColor: theme.background }]}><TeremText variant="label">К оплате</TeremText><TeremText variant="section" accent style={s.amount}>{formatRentalPrice(total)}</TeremText></View>
          {stage === 'paying' ? <RentalLoading label="Проверяем результат оплаты…" compact /> : null}
          <RentalAction label={stage === 'paying' ? 'Проверяем' : stage === 'payment-error' ? 'Повторить оплату' : `Оплатить ${formatRentalPrice(total)}`} trailingArrow disabled={stage === 'paying'} onPress={actions.pay} />
          {stage === 'payment-error' ? <RentalAction label="Другой способ" variant="secondary" compact trailingArrow onPress={() => { setPaymentMethod((method) => method === 'Карта' ? 'СБП' : 'Карта'); actions.retryPayment(); }} /> : null}
          <TeremText variant="caption" style={[s.caption, { color: theme.textSecondary }]}>Аренда начнётся после получения вещи.</TeremText>
        </>;
}
