import { useProduct, useProducts } from "@/entities/product";
import { ScreenFrame } from "@/shared/layout/screen-frame";
import { uiColors } from "@/shared/theme/terem-tokens";
import { useTheme } from "@/shared/theme/use-theme";
import { FailureState } from "@/shared/ui/failure-state";
import { TeremText } from "@/shared/ui/terem-text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  RentalAction,
  RentalDemoCaption,
  RentalHeading,
  RentalIcon,
  RentalNotice,
  RentalPanel,
  RentalTableRow,
} from "../components/presentation";
import { RentalProductSummary } from "../components/rental-product-summary";
import {
  formatRentalPrice,
  getRentalPeriod,
} from "../constants/rental-options";
import { useRentalSessions } from "../hooks/use-rental-sessions";
import { createRentalId } from "../model/rental-id";
import { resolveRental } from "../model/rental-session";

export function RentalCheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string | string[];
    period?: string | string[];
  }>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [agreed, setAgreed] = useState(false);
  const [rulesVisible, setRulesVisible] = useState(false);
  // Одна попытка экрана использует один id даже при двух нажатиях до следующего render.
  const [attemptId] = useState(createRentalId);
  const { sessions, dispatch } = useRentalSessions();
  const liveProduct = useProduct(
    typeof params.id === "string" ? params.id : "",
  );
  const { loading, error, reload } = useProducts();
  const existingSession = liveProduct
    ? resolveRental(sessions, liveProduct.id)
    : undefined;
  const product = existingSession?.product ?? liveProduct;
  const period = getRentalPeriod(
    existingSession?.period ??
      (params.period === undefined
        ? "hour"
        : typeof params.period === "string"
          ? params.period
          : ""),
  );
  const available = product?.status === "available";
  const total =
    existingSession?.total ??
    (product && period ? product.pricePerHour * period.hours : 0);
  const back = () => {
    if (router.canGoBack()) router.back();
    else if (product)
      router.replace({ pathname: "/product/[id]", params: { id: product.id } });
    else router.replace("/");
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
          title="Оформление недоступно"
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
          s.content,
          { paddingTop: 4, paddingBottom: insets.bottom + 16 },
        ]}
      >
        <RentalHeading
          header="ОФОРМЛЕНИЕ / 01"
          code="CHECKOUT / 01"
          step={1}
          title={"ПРОВЕРЬТЕ\nАРЕНДУ."}
          onBack={back}
          onDemo={() => setRulesVisible(true)}
        />
        {!product || !period ? (
          <>
            <RentalNotice
              title="Не удалось открыть аренду"
              text="Товар или выбранный срок не найдены. Выберите вещь в каталоге заново."
            />
            <RentalAction
              label="В каталог"
              onPress={() => router.replace("/")}
            />
          </>
        ) : (
          <>
            <RentalProductSummary
              product={product}
              description={`Комплект: ${product.included.join(", ")}.`}
            />
            {existingSession ? (
              <RentalNotice
                info
                text={`Есть начатая демоаренда. Продолжите её с сохранённым сроком: ${period.label}.`}
              />
            ) : null}
            {!available ? (
              <RentalNotice
                title="Вещь уже занята"
                text="Сейчас оформить её нельзя. Выберите другую вещь в каталоге."
              />
            ) : null}
            <RentalPanel>
              <RentalTableRow
                icon="pin"
                label="Пункт"
                value={`${product.pickupPoint.name} / ${product.pickupPoint.address}`}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Изменить срок аренды"
                disabled={!!existingSession}
                onPress={back}
              >
                <RentalTableRow
                  icon="clock"
                  label="Срок"
                  value={`${period.label}${existingSession ? "" : "  ›"}`}
                />
              </Pressable>
              <RentalTableRow
                icon="card"
                label="Тариф"
                value={`${formatRentalPrice(product.pricePerHour)} / час`}
              />
              <RentalTableRow
                icon="kit"
                label="Комплект"
                value={product.included.join(", ")}
                last
              />
            </RentalPanel>

            <View
              style={[
                s.consent,
                { borderColor: theme.text, backgroundColor: theme.background },
              ]}
            >
              <Pressable
                accessibilityRole="checkbox"
                accessibilityLabel="Я ознакомился с условиями аренды"
                accessibilityState={{ checked: agreed, disabled: !available }}
                disabled={!available}
                onPress={() => setAgreed(!agreed)}
                style={s.consentControl}
              >
                <View
                  style={[
                    s.checkbox,
                    {
                      borderColor: agreed ? uiColors.orange : theme.text,
                      backgroundColor: agreed
                        ? uiColors.orange
                        : theme.background,
                    },
                  ]}
                >
                  {agreed ? (
                    <RentalIcon name="check" color={uiColors.paper} size={19} />
                  ) : null}
                </View>
                <TeremText style={s.consentText}>
                  Принимаю правила аренды
                </TeremText>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Читать правила аренды"
                onPress={() => setRulesVisible(true)}
                style={s.rulesButton}
              >
                <TeremText style={{ fontSize: 24 }}>›</TeremText>
              </Pressable>
            </View>

            <View style={s.bottom}>
              <View
                style={[
                  s.total,
                  {
                    borderColor: theme.text,
                    backgroundColor: theme.background,
                  },
                ]}
              >
                <TeremText variant="cardTitle" style={s.totalLabel}>
                  ИТОГО
                </TeremText>
                <TeremText variant="section" accent style={s.totalPrice}>
                  {formatRentalPrice(total)}
                </TeremText>
              </View>
              <RentalAction
                label={
                  existingSession
                    ? "Продолжить"
                    : available
                      ? "Подтвердить"
                      : "В каталог"
                }
                trailingArrow
                disabled={!existingSession && available && !agreed}
                onPress={() => {
                  if (!available && !existingSession) {
                    router.replace("/");
                    return;
                  }
                  if (!existingSession && !agreed) return;
                  const rentalId =
                    existingSession?.rentalId ?? `${attemptId}-${product.id}`;
                  if (!existingSession)
                    dispatch({
                      type: "START",
                      rentalId,
                      product,
                      period: period.value,
                      agreed,
                    });
                  router.push({
                    pathname: "/rental-flow/[id]",
                    params: { id: product.id, rentalId },
                  });
                }}
              />
            </View>
            <TeremText
              variant="caption"
              style={[s.caption, { color: theme.textSecondary }]}
            >
              Срок начнётся после получения вещи.
            </TeremText>
            <RentalDemoCaption />
          </>
        )}
      </ScrollView>
      <Modal
        visible={rulesVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setRulesVisible(false)}
      >
        <View style={s.overlay}>
          <View
            accessibilityViewIsModal
            style={[
              s.dialog,
              { backgroundColor: theme.background, borderColor: theme.text },
            ]}
          >
            <ScrollView contentContainerStyle={s.rulesContent}>
              <TeremText variant="section">ПРАВИЛА АРЕНДЫ</TeremText>
              <TeremText>
                01 Проверьте вещь и весь комплект при получении.
              </TeremText>
              <TeremText>
                02 Верните вещь в срок, в тот же пункт и в полном комплекте.
              </TeremText>
              <TeremText>
                03 Если обнаружили неисправность, не используйте вещь и
                обратитесь в поддержку.
              </TeremText>
              <RentalNotice
                info
                text="Это деморежим: оплата не списывается, шкаф и поддержка не подключены. Данные хранятся до перезапуска приложения."
              />
              <RentalAction
                label="Понятно"
                onPress={() => setRulesVisible(false)}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScreenFrame>
  );
}

const s = StyleSheet.create({
  content: {
    flexGrow: 1,
    gap: 12,
    paddingHorizontal: 16,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
  },
  consent: {
    minHeight: 48,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  consentControl: {
    flex: 1,
    minHeight: 48,
    padding: 10,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  consentText: { flex: 1, fontSize: 13, lineHeight: 18 },
  rulesButton: {
    width: 40,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: { marginTop: 0 },
  total: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: 10,
    gap: 12,
  },
  totalLabel: { fontSize: 25, transform: [{ skewX: "-9deg" }] },
  totalPrice: { fontSize: 29, lineHeight: 36, transform: [{ skewX: "-9deg" }] },
  caption: { fontSize: 12, textAlign: "center" },
  overlay: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "center",
    padding: 20,
  },
  dialog: {
    borderWidth: 1,
    maxHeight: "85%",
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  rulesContent: { padding: 20, gap: 16 },
});
