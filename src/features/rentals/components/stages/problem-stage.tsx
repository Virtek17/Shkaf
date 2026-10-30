import { Pressable, View } from 'react-native';
import { TeremInput } from '@/shared/ui/terem-input';
import { TeremText } from '@/shared/ui/terem-text';
import { uiColors } from '@/shared/theme/terem-tokens';
import { useTheme } from '@/shared/theme/use-theme';
import { RentalProductSummary } from '../rental-product-summary';
import { RentalAction, RentalNotice, RentalIcon } from '../presentation';
import type { StageProps } from './stage-props';
import { s } from './rental-flow.styles';

export function ProblemStage({ session, product, attachmentNotice, setAttachmentNotice, actions }: StageProps) {
  const theme = useTheme();
  const border = { borderColor: theme.text };
  const reasons = ['Не хватает части комплекта', 'Вещь повреждена', 'Другая проблема'];
  return <>
          <RentalProductSummary product={product} />
          <View accessibilityRole="radiogroup" style={[s.reasonGroup, border, { backgroundColor: theme.background }]}>{reasons.map((reason) => <Pressable key={reason} accessibilityRole="radio" accessibilityState={{ checked: session.problemReason === reason }} style={s.reason} onPress={() => actions.changeProblem({ reason })}>
            <View style={[s.radio, { borderColor: reason === session.problemReason ? uiColors.orange : theme.text }]}>{reason === session.problemReason ? <View style={s.radioDot} /> : null}</View><TeremText style={s.reasonText}>{reason}</TeremText>
          </Pressable>)}</View>
          <TeremInput placeholder="Опишите проблему…" multiline maxLength={1000} value={session.problemDescription} onChangeText={(description) => actions.changeProblem({ description })} style={s.textarea} />
          <RentalAction label="Добавить фото" icon={<RentalIcon name="camera" />} variant="secondary" compact trailingArrow onPress={() => setAttachmentNotice(true)} />
          {attachmentNotice ? <TeremText accessibilityRole="alert" variant="caption">Прикрепление фото будет доступно после подключения поддержки.</TeremText> : null}
          <RentalNotice title="Не начинайте пользоваться вещью." text="Обратитесь в поддержку." />
          <View style={s.bottom}>
            <RentalAction label="Подготовить обращение" onPress={actions.prepareProblem} />
            <Pressable accessibilityRole="button" onPress={actions.closeProblem} style={s.textButton}><TeremText style={s.textLink}>Назад к получению</TeremText></Pressable>
          </View>
        </>;
}
