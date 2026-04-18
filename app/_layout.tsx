import { toastConfig } from "@/components/global/toast/CustomToast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MagicModalPortal } from "react-native-magic-modal";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ScreenWrapper from "@/components/global/wrapper/ScreenWrapper";
import "@/global.css";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function RootLayout() {
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
