import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import { TeremText } from '@/shared/ui/terem-text';
import { uiColors } from '@/shared/theme/terem-tokens';
import { useTheme } from '@/shared/theme/use-theme';
import { RentalAction, RentalLoading, RentalNotice, RentalPanel, RentalIcon } from '../presentation';
import type { StageProps } from './stage-props';
import { s } from './rental-flow.styles';

export function KitStage({ session, product, actions }: StageProps) {
  const theme = useTheme();
  return <>
          <View style={s.kitHero}>
            <View style={s.kitProduct}>
              <View style={s.kitPhotoFrame}><Image source={product.photo} contentFit="contain" style={s.kitPhoto} alt={product.name} /></View>
              <TeremText variant="cardTitle" style={s.kitName} numberOfLines={2}>{product.name.toLocaleUpperCase('ru-RU')}</TeremText>
              <TeremText variant="caption" style={s.inventoryCode}>{product.displayCode}</TeremText>
            </View>
            <View style={s.kitList}><RentalPanel>{product.included.map((item, index) => <Pressable key={`${item}-${index}`} accessibilityRole="checkbox" accessibilityLabel={item} accessibilityState={{ checked: session.checked.includes(index) }} style={[s.checkRow, { borderBottomColor: theme.backgroundSelected }, index === product.included.length - 1 && { borderBottomWidth: 0 }]} onPress={() => actions.toggleKit(index)}>
              <View style={[s.checkbox, { borderColor: session.checked.includes(index) ? uiColors.orange : theme.text, backgroundColor: session.checked.includes(index) ? uiColors.orange : theme.background }]}>{session.checked.includes(index) ? <RentalIcon name="check" color={uiColors.paper} size={18} /> : null}</View>
              <TeremText style={s.checkText}>{item}</TeremText>
            </Pressable>)}</RentalPanel></View>
          </View>
          <RentalNotice info text="Заберите вещь и закройте дверцу." />
          <RentalLoading label="Ждём закрытия дверцы…" compact />
          <TeremText variant="caption" style={[s.caption, { color: theme.textSecondary }]}>После проверки комплекта начнётся аренда. В деморежиме подтвердите получение кнопкой.</TeremText>
          <View style={s.bottom}>
            <RentalAction label="Получил и закрыл" disabled={session.checked.length !== product.included.length} onPress={actions.confirmKit} />
            <RentalAction label="Сообщить о проблеме" variant="secondary" compact onPress={actions.openProblem} />
          </View>
        </>;
}
