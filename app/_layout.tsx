import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SheetProvider } from "react-native-actions-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Sheets } from "../components/ui/actionSheet/sheet";
import { MagicModalPortal } from "react-native-magic-modal";
import * as SplashScreen from 'expo-splash-screen';
import Toast from "react-native-toast-message";
import "../global.css";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SheetProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <Sheets />
            <Toast />
            <MagicModalPortal />
          </SheetProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
