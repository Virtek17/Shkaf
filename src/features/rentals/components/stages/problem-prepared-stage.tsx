import { View } from 'react-native';
import { TeremText } from '@/shared/ui/terem-text';
import { RentalAction, RentalNotice, RentalPanel, RentalTableRow } from '../presentation';
import type { StageProps } from './stage-props';
import { s } from './rental-flow.styles';

export function ProblemPreparedStage({ session, previewStage, actions, openRentals }: StageProps) {
  return <>
          <RentalNotice title="Обращение не отправлено." text="Это демо. Сервис поддержки ещё не подключён." />
          <RentalPanel><RentalTableRow label="Причина" value={session.problemReason} last /></RentalPanel>
          {session.problemDescription ? <TeremText>{session.problemDescription}</TeremText> : null}
          <TeremText>{previewStage ? 'Описание доступно только в предпросмотре. Рабочая аренда не изменена.' : 'Описание сохранено до перезапуска приложения. Аренда не начата.'}</TeremText>
          <View style={s.bottom}><RentalAction label="Изменить обращение" onPress={actions.editProblem} /><RentalAction label="Мои аренды" variant="secondary" onPress={openRentals} /></View>
        </>;
}
