import { TabList, TabSlot, TabTrigger, Tabs, type TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabIcon, type TabIconName } from '@/components/tab-icon';
import { GridBackground } from '@/components/ui/grid-background';
import { screenLayout } from '@/constants/screen-layout';
import { Colors, MaxContentWidth } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const tabs = [
  { name: 'points', href: '/points', label: 'Пункты', icon: 'points' },
  { name: 'catalog', href: '/', label: 'Каталог', icon: 'catalog' },
  { name: 'rental', href: '/rental', label: 'Аренды', icon: 'rentals' },
  { name: 'profile', href: '/profile', label: 'Профиль', icon: 'profile' },
] as const;

export default function AppTabs() {
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return <Tabs style={styles.root}>
    <View style={[styles.content, {
      backgroundColor: colors.background,
      paddingTop: insets.top + screenLayout.top,
    }]}>
      <GridBackground dark={scheme === 'dark'} />
      <TabSlot style={styles.slot} />
    </View>
    <TabList asChild>
      <View style={StyleSheet.flatten([styles.bar, { backgroundColor: colors.background, paddingBottom: Math.max(insets.bottom, 8) }])}>
        {tabs.map((tab) => <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
          <TabButton icon={tab.icon} color={colors.text}>{tab.label}</TabButton>
        </TabTrigger>)}
      </View>
    </TabList>
  </Tabs>;
}

function TabButton({ children, icon, color, isFocused, ...props }: TabTriggerSlotProps & { icon: TabIconName; color: string }) {
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
    paddingBottom: screenLayout.bottom,
  },
  slot: { flex: 1 },
  bar: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', borderTopWidth: 1, borderTopColor: '#111111', flexDirection: 'row' },
  button: { flex: 1, minWidth: 0, minHeight: 64, alignItems: 'center', justifyContent: 'center', gap: 4 },
  raised: { transform: [{ translateY: -4 }] },
  label: { fontSize: 12, lineHeight: 16, fontWeight: '500' },
});
