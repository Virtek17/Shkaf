import { View } from 'react-native';
import { TeremText } from '@/shared/ui/terem-text';
import { uiColors } from '@/shared/theme/terem-tokens';
import { useTheme } from '@/shared/theme/use-theme';
import { LockerPreview } from '../locker-preview';
import { RentalAction, RentalLoading, RentalNotice, RentalOutline, RentalTimer, RentalTitle, RentalIcon } from '../presentation';
import type { StageProps } from './stage-props';
import { s } from './rental-flow.styles';

export function PickupStage({ product, stage, content, countdown, actions }: StageProps) {
  const theme = useTheme();
  return <>
          {stage === 'pickup' ? <View style={s.pickupHeading}><View style={s.flex}><RentalTitle small>{content.title}</RentalTitle></View><RentalTimer value={countdown} compact /></View> : null}
          <View style={s.lockerHero}>
            <View style={s.lockerInfo}>
              <RentalOutline text="03" />
              <TeremText variant="cardTitle" style={s.lockerLabel}>{'ВАША\nЯЧЕЙКА'}</TeremText>
              <View style={s.location}><RentalIcon name="pin" size={17} color={uiColors.orange} /><View style={s.flex}><TeremText variant="caption" style={s.small}>{product.pickupPoint.name}</TeremText><TeremText variant="caption" style={s.address}>{product.pickupPoint.address}</TeremText></View></View>
            </View>
            <View style={s.lockerImage}><LockerPreview />{stage === 'locker-error' ? <View style={[s.lockerWarning, { backgroundColor: theme.background }]}><RentalIcon name="warning" size={54} color={uiColors.orange} /></View> : null}</View>
          </View>
          {stage === 'opening' ? <RentalLoading label="Дождитесь открытия дверцы." /> : null}
          {stage === 'locker-error' ? <RentalNotice title="Попробуйте ещё раз." text="Если дверца не откроется, обратитесь в поддержку." /> : null}
          <View style={s.bottom}>
            <RentalAction label={stage === 'opening' ? 'Открываем…' : stage === 'locker-error' ? 'Повторить' : 'Открыть ячейку 03'} disabled={stage === 'opening'} trailingArrow onPress={actions.openLocker} />
            <RentalAction label={stage === 'locker-error' ? 'Связаться с поддержкой' : 'Нужна помощь?'} variant="secondary" compact onPress={actions.openProblem} />
          </View>
        </>;
}
