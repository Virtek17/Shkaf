import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenFrame } from '@/shared/layout/screen-frame';
import { environment } from '@/shared/config/environment';
import { RentalAction, RentalDemoCaption, RentalHeading, RentalNotice } from '../components/presentation';
import { RentalStageView } from '../components/stages/rental-stage';
import { s } from '../components/stages/rental-flow.styles';
import { RentalDemoMenu } from '../dev/rental-demo-menu';
import { useRentalFlow } from '../hooks/use-rental-flow';

export function RentalFlowScreen() {
  const flow = useRentalFlow();
  const insets = useSafeAreaInsets();
  const { session, product, period, content, stage } = flow;
  const showStripe = stage !== undefined && ['payment', 'pickup', 'kit', 'active'].includes(stage);
  return <ScreenFrame stripe={showStripe}>
    <KeyboardAvoidingView style={s.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView key={`${session?.rentalId}-${stage}`} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}
        contentContainerStyle={[s.content, { paddingTop: 4, paddingBottom: insets.bottom + 12 }]}>
        <RentalHeading header={content?.header ?? 'АРЕНДА'} code={content?.code ?? 'RENTAL'} step={content?.step ?? 1}
          title={stage === 'active' || stage === 'pickup' ? undefined : session?.operationError ? 'НЕ УДАЛОСЬ\nПРОВЕРИТЬ.' : content?.title} onBack={flow.back}
          onDemo={environment.demoTools ? () => flow.setDemoVisible(true) : undefined} />
        {!session || !product || !period || !content ? <>
          <RentalNotice title="Аренда не найдена" text="Откройте товар и начните оформление. После перезапуска приложения демоданные сбрасываются." />
          <RentalAction label="В каталог" onPress={flow.catalogue} />
        </> : <View style={[s.body, (stage === 'checking' || stage === 'unavailable') && s.expanded]}>
          <RentalStageView {...flow} session={session} product={product} period={period} content={content} />
        </View>}
        <RentalDemoCaption />
      </ScrollView>
      <RentalDemoMenu flow={flow} />
    </KeyboardAvoidingView>
  </ScreenFrame>;
}

