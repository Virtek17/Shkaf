import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useProduct, useProducts } from "@/entities/product";
import {
  formatRentalPrice as formatPrice,
  rentalPeriods,
  type RentalPeriod,
} from "@/features/rentals";
import { ScreenFrame } from "@/shared/layout/screen-frame";
import { uiColors, uiSpacing } from "@/shared/theme/terem-tokens";
import { Fonts } from "@/shared/theme/theme";
import { useTheme } from "@/shared/theme/use-theme";
import { FailureState } from "@/shared/ui/failure-state";
import { TeremButton } from "@/shared/ui/terem-button";
import { TeremChoiceGroup } from "@/shared/ui/terem-choice-group";
import { TeremText } from "@/shared/ui/terem-text";

export function ProductDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = typeof params.id === "string" ? params.id : "";
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [period, setPeriod] = useState<RentalPeriod>("hour");
  const product = useProduct(id);
  const { loading, error, reload } = useProducts();
  const selectedPeriod =
    rentalPeriods.find((option) => option.value === period) ?? rentalPeriods[0];
  const total = product ? product.pricePerHour * selectedPeriod.hours : 0;
  const available = product?.status === "available";
  const statusColor = available ? uiColors.success : uiColors.orange;
  const sectionBorder = { borderTopColor: theme.text };

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  const openCheckout = () => {
    if (!product || !available) return;
    router.push({
      pathname: "/checkout/[id]",
      params: { id: product.id, period },
    });
  };

  if (!product && loading)
    return (
      <ScreenFrame>
        <FailureState title="Загружаем товар…" />
      </ScreenFrame>
    );
  if (!product && error)
    return (
      <ScreenFrame>
        <FailureState
          title="Товар недоступен"
          message={error}
          onRetry={reload}
        />
      </ScreenFrame>
    );

  return (
    <ScreenFrame>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: uiSpacing.sm,
            paddingBottom: insets.bottom + uiSpacing.xl,
          },
        ]}
      >
        <View style={styles.header}>
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Назад в каталог"
            style={styles.backButton}
          >
            <Text style={[styles.backArrow, { color: theme.text }]}>←</Text>
          </Pressable>
          <TeremText variant="caption" style={styles.headerCode}>
            ВЕЩЬ / {product?.displayCode ?? "—"}
          </TeremText>
          <TeremText
            variant="caption"
            style={[styles.detailCode, { color: theme.textSecondary }]}
          >
            DETAIL / 01
          </TeremText>
        </View>

        {product ? (
          <>
            <TeremText variant="section" style={styles.title}>
              {product.name}
            </TeremText>
            <View style={styles.imageFrame}>
              <Image
                source={product.photo}
                style={styles.image}
                contentFit="contain"
                alt={product.name}
              />
            </View>

            <View style={styles.priceRow}>
              <TeremText variant="section" accent style={styles.hourlyPrice}>
                {formatPrice(product.pricePerHour)} / час
              </TeremText>
              <View style={styles.availability}>
                <View
                  style={[styles.statusDot, { backgroundColor: statusColor }]}
                />
                <TeremText variant="label">
                  {available ? "Доступно" : "В аренде"}
                </TeremText>
              </View>
            </View>
            <TeremText style={styles.description}>
              {product.description}
            </TeremText>

            <View style={[styles.section, styles.heavyBorder, sectionBorder]}>
              <TeremText variant="cardTitle" style={styles.sectionTitle}>
                В комплекте
              </TeremText>
              <TeremText>{product.included.join(", ")}.</TeremText>
            </View>

            <View style={[styles.section, sectionBorder]}>
              <TeremText variant="cardTitle" style={styles.sectionTitle}>
                О вещи
              </TeremText>
              <View style={styles.attributeRow}>
                <TeremText style={{ color: theme.textSecondary }}>
                  Состояние
                </TeremText>
                <TeremText variant="label" style={styles.attributeValue}>
                  {product.condition.label}
                </TeremText>
              </View>
              {product.condition.details ? (
                <TeremText
                  variant="caption"
                  style={{ color: theme.textSecondary }}
                >
                  {product.condition.details}
                </TeremText>
              ) : null}
              {product.notes?.map((note) => (
                <View key={note.label} style={styles.note}>
                  <TeremText variant="label">{note.label}</TeremText>
                  <TeremText style={{ color: theme.textSecondary }}>
                    {note.value}
                  </TeremText>
                </View>
              ))}
            </View>

            <View style={[styles.section, sectionBorder]}>
              <TeremText variant="cardTitle" style={styles.sectionTitle}>
                Срок аренды
              </TeremText>
              <TeremChoiceGroup
                options={rentalPeriods}
                value={period}
                onChange={setPeriod}
                accessibilityLabel="Срок аренды"
              />
            </View>

            <View style={[styles.totalRow, sectionBorder]}>
              <TeremText variant="cardTitle" style={styles.sectionTitle}>
                Итого
              </TeremText>
              <TeremText variant="section" accent>
                {formatPrice(total)}
              </TeremText>
            </View>
            <TeremButton
              label={available ? "Взять в аренду" : "В   аренде"}
              trailingArrow
              disabled={!available}
              onPress={openCheckout}
            />
            <TeremText
              variant="caption"
              style={[styles.footnote, { color: theme.textSecondary }]}
            >
              {available
                ? "Стоимость рассчитана по почасовому тарифу."
                : "Вещь занята. Оформить аренду можно будет после её возврата."}
            </TeremText>
          </>
        ) : (
          <View style={styles.notFound}>
            <TeremText variant="section">Товар не найден</TeremText>
            <TeremButton
              label="В каталог"
              onPress={() => router.replace("/")}
            />
          </View>
        )}
      </ScrollView>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: uiSpacing.md },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: uiSpacing.sm,
    marginBottom: uiSpacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,
  },
  backArrow: { fontSize: 28 },
  headerCode: { fontFamily: Fonts.mono, fontWeight: "700", flex: 1 },
  detailCode: { fontFamily: Fonts.mono, fontSize: 10 },
  title: {
    fontSize: 24,
    lineHeight: 38,
    textTransform: "uppercase",
    marginBottom: uiSpacing.md,
  },
  imageFrame: {
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
    // backgroundColor: uiColors.paper,
  },
  image: { width: "100%", height: "100%" },
  priceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: uiSpacing.sm,
    marginTop: uiSpacing.md,
  },
  hourlyPrice: { fontSize: 25, lineHeight: 36 },

  availability: { flexDirection: "row", alignItems: "center", gap: 6 },
  statusDot: { width: 11, height: 11, borderRadius: 6 },
  description: { marginTop: uiSpacing.xs, marginBottom: uiSpacing.lg },
  section: {
    borderTopWidth: 2,
    paddingVertical: uiSpacing.md,
    gap: uiSpacing.sm,
  },
  heavyBorder: { borderTopWidth: 4 },
  sectionTitle: { fontSize: 18, lineHeight: 24, textTransform: "uppercase" },
  attributeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: uiSpacing.md,
    justifyContent: "space-between",
  },
  attributeValue: { flexShrink: 1, textAlign: "right" },
  note: { gap: uiSpacing.xs, marginTop: uiSpacing.xs },
  totalRow: {
    borderTopWidth: 2,
    paddingVertical: uiSpacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: uiSpacing.md,
  },
  footnote: { marginTop: uiSpacing.md, textAlign: "center" },
  notFound: { gap: uiSpacing.xl },
});
