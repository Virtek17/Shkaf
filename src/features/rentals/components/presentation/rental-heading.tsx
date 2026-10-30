import { Fonts } from "@/shared/theme/theme";
import { useTheme } from "@/shared/theme/use-theme";
import { StepProgress } from "@/shared/ui/step-progress";
import { TeremText } from "@/shared/ui/terem-text";
import { Pressable, StyleSheet, View } from "react-native";
import { RentalIcon } from "./rental-icon";
import { RentalTitle } from "./rental-title";

export function RentalHeading({
  title,
  step,
  header,
  code,
  onBack,
  onDemo,
}: {
  title?: string;
  step: number;
  header: string;
  code: string;
  onBack: () => void;
  onDemo?: () => void;
}) {
  const theme = useTheme();
  return (
    <View style={s.heading}>
      <View style={s.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Назад"
          onPress={onBack}
          style={s.back}
        >
          <View style={{ transform: [{ rotate: "180deg" }] }}>
            <RentalIcon name="arrow" size={21} />
          </View>
        </Pressable>
        <TeremText
          variant="label"
          numberOfLines={1}
          adjustsFontSizeToFit
          style={s.headerLabel}
        >
          {header}
        </TeremText>
        <TeremText
          variant="caption"
          style={[s.code, { color: theme.textSecondary }]}
        >
          {code}
        </TeremText>
        {onDemo ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Открыть демосценарии"
            onPress={onDemo}
            style={s.demo}
          >
            <TeremText variant="caption" accent style={s.demoText}>
              ДЕМО
            </TeremText>
          </Pressable>
        ) : null}
      </View>
      <View style={s.progress}>
        <StepProgress current={step} total={6} />
      </View>
      {title ? <RentalTitle>{title}</RentalTitle> : null}
    </View>
  );
}

const s = StyleSheet.create({
  heading: { gap: 12 },
  header: { minHeight: 40, flexDirection: "row", alignItems: "center", gap: 6 },
  back: {
    width: 34,
    minHeight: 44,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerLabel: { fontSize: 11, flexShrink: 1 },
  code: { fontFamily: Fonts.mono, fontSize: 9, marginLeft: "auto" },
  demo: { minHeight: 44, justifyContent: "center", paddingLeft: 4 },
  demoText: { fontSize: 8, fontWeight: "700" },
  progress: { maxWidth: 260 },
});
