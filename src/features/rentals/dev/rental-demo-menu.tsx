import { Modal, ScrollView, View } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { TeremText } from '@/shared/ui/terem-text';
import { environment } from '@/shared/config/environment';
import { RentalAction } from '../components/presentation';
import type { RentalFlowController } from '../hooks/use-rental-flow';
import type { RentalStage } from '../model/rental-session';
import { s } from '../components/stages/rental-flow.styles';

const scenarios: { stage: RentalStage; label: string }[] = [
  { stage: 'checking', label: 'Проверка доступности' }, { stage: 'payment', label: 'Оплата' },
  { stage: 'unavailable', label: 'Вещь занята' }, { stage: 'payment-error', label: 'Ошибка оплаты' },
  { stage: 'expired', label: 'Бронь истекла' }, { stage: 'pickup', label: 'Вещь ждёт вас' },
  { stage: 'opening', label: 'Открываем ячейку' }, { stage: 'locker-error', label: 'Ошибка замка' },
  { stage: 'kit', label: 'Проверка комплекта' }, { stage: 'problem', label: 'Проблема с вещью' },
];

export function RentalDemoMenu({ flow }: { flow: RentalFlowController }) {
  const theme = useTheme();
  if (!environment.demoTools) return null;
  return <Modal visible={flow.demoVisible} transparent animationType="fade" onRequestClose={() => flow.setDemoVisible(false)}>
    <View style={s.overlay}><View accessibilityViewIsModal style={[s.dialog, { borderColor: theme.text, backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={s.demoContent}>
        <TeremText variant="section">ДЕМОСЦЕНАРИИ</TeremText>
        <TeremText style={s.small}>Изолированный предпросмотр. Рабочая демоаренда не меняется. Без реальных платежей и отправки в поддержку.</TeremText>
        {flow.session ? scenarios.map((scenario) => <RentalAction key={scenario.stage} label={scenario.label} compact variant="secondary" onPress={() => flow.selectPreview(scenario.stage)} />) : null}
        {flow.previewStage && ['checking', 'opening', 'paying'].includes(flow.previewStage) ? <RentalAction label="Продолжить сценарий" onPress={flow.continuePreview} /> : null}
        {flow.previewStage ? <RentalAction label="Вернуться к аренде" variant="secondary" onPress={flow.exitPreview} /> : null}
        <RentalAction label="Закрыть" onPress={() => flow.setDemoVisible(false)} />
      </ScrollView>
    </View></View>
  </Modal>;
}

