import { StyleSheet, View } from 'react-native';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export function ExploreScreen() {
  return <ThemedView style={styles.root}>
    <ScreenHeader title="Разделы" />
    <ThemedText themeColor="textSecondary">Место для следующего экрана</ThemedText>
    <View style={styles.body}><ThemedText>Добавляйте функции в src/features, а маршруты — в src/app.</ThemedText></View>
  </ThemedView>;
}

const styles = StyleSheet.create({ root: { flex: 1 }, body: { marginTop: Spacing.five } });
