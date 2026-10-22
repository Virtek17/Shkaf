import { Pressable, StyleSheet, Text, View } from 'react-native';
import { uiColors, uiSizes, uiSpacing, uiType } from '@/constants/terem-tokens';

type Choice<T extends string> = { value: T; label: string };
type TeremChoiceGroupProps<T extends string> = { options: readonly Choice<T>[]; value: T; onChange: (value: T) => void; accessibilityLabel: string };

export function TeremChoiceGroup<T extends string>({ options, value, onChange, accessibilityLabel }: TeremChoiceGroupProps<T>) {
  return <View accessibilityLabel={accessibilityLabel} style={styles.row}>
    {options.map((option) => {
      const selected = option.value === value;
      return <Pressable key={option.value} accessibilityRole="radio" accessibilityState={{ selected }} onPress={() => onChange(option.value)} style={[styles.option, selected && styles.selected]}>
        <Text style={[styles.label, selected && styles.selectedLabel]}>{option.label}</Text>
      </Pressable>;
    })}
  </View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: uiSpacing.sm },
  option: { minHeight: uiSizes.touch, flex: 1, borderWidth: 1, borderColor: uiColors.ink, backgroundColor: uiColors.paper, justifyContent: 'center', alignItems: 'center', paddingHorizontal: uiSpacing.xs },
  selected: { backgroundColor: uiColors.ink },
  label: { ...uiType.label, color: uiColors.ink, textAlign: 'center' },
  selectedLabel: { color: uiColors.paper },
});
