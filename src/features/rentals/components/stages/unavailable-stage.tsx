import { View } from 'react-native';
import { RentalProductSummary } from '../rental-product-summary';
import { RentalAction, RentalNotice } from '../presentation';
import type { StageProps } from './stage-props';
import { s } from './rental-flow.styles';

export function UnavailableStage({ session, product, actions, catalogue }: StageProps) {
  return <>
          <RentalProductSummary product={product} status={session.operationError ? undefined : 'В АРЕНДЕ'} />
          <RentalNotice title={session.operationError ?? "Кто-то успел оформить аренду раньше."} text="Выберите другую вещь или повторите проверку." />
          {session.operationError ? <RentalAction label="Повторить проверку" onPress={actions.checkAgain} /> : null}
          <View style={s.bottom}><RentalAction label="В каталог" trailingArrow onPress={catalogue} /></View>
        </>;
}
