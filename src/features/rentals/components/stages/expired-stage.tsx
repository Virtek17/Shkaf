import { View } from 'react-native';
import { uiColors } from '@/shared/theme/terem-tokens';
import { RentalProductSummary } from '../rental-product-summary';
import { RentalAction, RentalNotice, RentalOutline, RentalIcon } from '../presentation';
import type { StageProps } from './stage-props';
import { s } from './rental-flow.styles';

export function ExpiredStage({ product, actions }: StageProps) {
  return <>
          <View style={s.expiredHero}><View style={s.flex}><RentalOutline text="00:00" /></View><RentalIcon name="clock" color={uiColors.orange} size={54} /></View>
          <RentalProductSummary product={product} />
          <RentalNotice title="Вещь больше не зарезервирована." text="Проверьте доступность заново." />
          <View style={s.bottom}><RentalAction label="Проверить снова" trailingArrow onPress={actions.checkAgain} /></View>
        </>;
}
