import { TabList, TabSlot, TabTrigger, Tabs, type TabTriggerSlotProps } from 'expo-router/ui';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabIcon, type TabIconName } from '@/core/navigation/tab-icon';
import { ScreenFrame } from '@/shared/layout/screen-frame';
import { screenLayout } from '@/shared/theme/screen-layout';
import { Colors, MaxContentWidth } from '@/shared/theme/theme';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';

const tabs = [
  { name: 'points', href: '/points', label: 'Пункты', icon: 'points' },
  { name: 'catalog', href: '/', label: 'Каталог', icon: 'catalog' },
  { name: 'rental', href: '/rental', label: 'Аренды', icon: 'rentals' },
  { name: 'profile', href: '/profile', label: 'Профиль', icon: 'profile' },
] as const;

export default function AppTabs() {
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return <Tabs style={styles.root}>
    <ScreenFrame bodyStyle={styles.content}>
      <TabSlot style={styles.slot} />
    </ScreenFrame>
    <TabList asChild>
      <View style={StyleSheet.flatten([styles.bar, { backgroundColor: colors.background, borderTopColor: colors.text, paddingBottom: Math.max(insets.bottom, 8) }])}>
        {tabs.map((tab) => <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
          <TabButton icon={tab.icon} color={colors.text}>{tab.label}</TabButton>
        </TabTrigger>)}
      </View>
    </TabList>
  </Tabs>;
}

type TabButtonProps = Omit<TabTriggerSlotProps, 'ref'> &
  Pick<ComponentProps<typeof Pressable>, 'ref'> & { icon: TabIconName; color: string };

function TabButton({ children, icon, color, isFocused, ...props }: TabButtonProps) {
  const tint = isFocused ? '#FF4D00' : color;
  return <Pressable {...props} style={styles.button}>
    <View style={isFocused && styles.raised}><TabIcon name={icon} color={tint} /></View>
    <Text style={StyleSheet.flatten([styles.label, { color: tint }])}>{children}</Text>
  </Pressable>;
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: screenLayout.horizontal,
    paddingTop: screenLayout.top,
    paddingBottom: screenLayout.bottom,
  },
  slot: { flex: 1 },
  bar: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', borderTopWidth: 1, flexDirection: 'row' },
  button: { flex: 1, minWidth: 0, minHeight: 64, alignItems: 'center', justifyContent: 'center', gap: 4 },
  raised: { transform: [{ translateY: -4 }] },
  label: { fontSize: 12, lineHeight: 16, fontWeight: '500' },
});
