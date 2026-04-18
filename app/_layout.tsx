import { toastConfig } from "@/components/global/toast/CustomToast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MagicModalPortal } from "react-native-magic-modal";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ScreenWrapper from "@/components/global/wrapper/ScreenWrapper";
import "@/global.css";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "InterTight-Regular": require("../assets/fonts/InterTight-Regular.ttf"),
    "InterTight-Bold": require("../assets/fonts/InterTight-Bold.ttf"),
    "InterTight-SemiBold": require("../assets/fonts/InterTight-SemiBold.ttf"),
    "InterTight-Medium": require("../assets/fonts/InterTight-Medium.ttf"),
    "InterTight-Light": require("../assets/fonts/InterTight-Light.ttf"),
    "InterTight-Thin": require("../assets/fonts/InterTight-Thin.ttf"),
    "InterTight-ExtraBold": require("../assets/fonts/InterTight-ExtraBold.ttf"),
    "InterTight-Black": require("../assets/fonts/InterTight-Black.ttf"),
    "InterTight-Italic": require("../assets/fonts/InterTight-Italic.ttf"),
    "InterTight-BoldItalic": require("../assets/fonts/InterTight-BoldItalic.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ScreenWrapper>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
            </Stack>
            <MagicModalPortal />
          </ScreenWrapper>
        </SafeAreaProvider>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}
