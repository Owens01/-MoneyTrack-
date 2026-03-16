import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {GestureHandlerRootView} from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context";
import "@/global.css";

export default function RootLayout() {
  return (
    <QueryClientProvider client={new QueryClient()}>
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
    </QueryClientProvider>
  );
}