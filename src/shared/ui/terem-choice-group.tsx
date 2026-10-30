import { Pressable, StyleSheet, Text, View } from 'react-native';
import { uiSizes, uiSpacing, uiType } from '@/shared/theme/terem-tokens';
import { useTheme } from '@/shared/theme/use-theme';

type Choice<T extends string> = { value: T; label: string };
type TeremChoiceGroupProps<T extends string> = { options: readonly Choice<T>[]; value: T; onChange: (value: T) => void; accessibilityLabel: string };

export function TeremChoiceGroup<T extends string>({ options, value, onChange, accessibilityLabel }: TeremChoiceGroupProps<T>) {
  const theme = useTheme();
  return <View accessibilityLabel={accessibilityLabel} style={styles.row}>
    {options.map((option) => {
      const selected = option.value === value;
      return <Pressable key={option.value} accessibilityRole="radio" accessibilityState={{ selected }} onPress={() => onChange(option.value)} style={[styles.option, { borderColor: theme.text, backgroundColor: selected ? theme.text : theme.background }]}>
        <Text style={[styles.label, { color: selected ? theme.background : theme.text }]}>{option.label}</Text>
      </Pressable>;
    })}
  </View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: uiSpacing.sm },
  option: { minHeight: uiSizes.touch, flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: uiSpacing.xs },
  label: { ...uiType.label, textAlign: 'center' },
});
