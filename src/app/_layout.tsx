import { AppProviders } from "@/core/providers/app-providers";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { AnimatedSplashOverlay } from "@/core/splash/animated-icon";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Lozung: require("../../assets/fonts/Lozung.otf"),
  });

  if (!fontsLoaded && !fontError) return null;

  return (
    <AppProviders>
      <AnimatedSplashOverlay />
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="checkout/[id]" />
        <Stack.Screen name="rental-flow/[id]" />
      </Stack>
    </AppProviders>
  );
}
