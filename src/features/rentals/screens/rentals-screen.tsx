import { useTheme } from "@/shared/theme/use-theme";
import { ScreenHeader } from "@/shared/ui/screen-header";
import { TeremButton } from "@/shared/ui/terem-button";
import { TeremText } from "@/shared/ui/terem-text";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { RentalProductSummary } from "../components/rental-product-summary";
import {
  formatRentalPrice,
  getRentalPeriod,
} from "../constants/rental-options";
import { useRentalSessions } from "../hooks/use-rental-sessions";
import { formatRentalTime } from "../model/format";
import { type RentalStage } from "../model/rental-session";

const labels: Record<RentalStage, string> = {
  checking: "Проверка доступности",
  unavailable: "Вещь недоступна",
  payment: "Ожидает оплаты",
  paying: "Проверка оплаты",
  "payment-error": "Ошибка оплаты",
  expired: "Бронь истекла",
  pickup: "Готово к получению",
  opening: "Получение",
  "locker-error": "Проблема с ячейкой",
  kit: "Проверка комплекта",
  problem: "Проблема при получении",
  "problem-sent": "Обращение подготовлено",
  active: "В аренде",
};

export function RentalsScreen() {
  const { sessions } = useRentalSessions();
  const router = useRouter();
  const theme = useTheme();
  const rentals = Object.values(sessions);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <ScreenHeader title="Мои аренды" />
      <TeremText variant="caption" style={{ color: theme.textSecondary }}>
        Демоаренды сохраняются до перезапуска приложения. Реальные бронирования
        и списания не выполняются.
      </TeremText>
      {!rentals.length ? (
        <View style={styles.empty}>
          <TeremText variant="section">ПОКА ПУСТО.</TeremText>
          <TeremText>Выберите вещь в каталоге и оформите аренду.</TeremText>
          <TeremButton
            label="В каталог"
            trailingArrow
            onPress={() => router.navigate("/")}
          />
        </View>
      ) : (
        rentals.map((session) => {
          const product = session.product;
          const period = getRentalPeriod(session.period);
          if (!product || !period) return null;
          return (
            <View
              key={session.rentalId}
              style={[styles.card, { borderColor: theme.text }]}
            >
              <TeremText variant="label" accent>
                {labels[session.stage]}
              </TeremText>
              <RentalProductSummary product={product} />
              {session.startedAt ? (
                <>
                  <TeremText>Вернуть до</TeremText>
                  <TeremText variant="section" accent>
                    {formatRentalTime(
                      session.startedAt + period.hours * 3600000,
                    )}
                  </TeremText>
                  <TeremText variant="caption">
                    {new Date(
                      session.startedAt + period.hours * 3600000,
                    ).toLocaleDateString("ru-RU")}
                  </TeremText>
                </>
              ) : (
                <TeremText>Выбранный срок: {period.label}</TeremText>
              )}
              <TeremText>
                Стоимость: {formatRentalPrice(session.total)}
              </TeremText>
              <TeremButton
                label={
                  session.stage === "active" ? "Открыть аренду" : "Продолжить"
                }
                trailingArrow
                onPress={() =>
                  router.push({
                    pathname: "/rental-flow/[id]",
                    params: { id: product.id, rentalId: session.rentalId },
                  })
                }
              />
            </View>
          );
        })
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  content: { gap: 16, paddingBottom: 24 },
  empty: { gap: 20, paddingVertical: 24 },
  card: { borderWidth: 1, padding: 12, gap: 12 },
});
