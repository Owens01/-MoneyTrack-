import ScreenWrapper from "@/components/global/wrapper/ScreenWrapper";
import { ToastMessage } from "@/components/ui/toast/ToastMessage";
import { Pressable, Text, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export function AboutScreen() {
  const handleShowSheet = () => {
    SheetManager.show("about-sheet");
  };

  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-sans-bold mb-4 text-amber-50">
          This is About Screen
        </Text>
        <Pressable
          onPress={handleShowSheet}
          className="bg-slate-600 p-4 rounded-2xl active:opacity-80"
        >
          <Text className="font-sans-bold text-white">View About Sheet</Text>
        </Pressable>
        <View className="mt-6">
          <ToastMessage />
        </View>
      </View>
    </ScreenWrapper>
  );
}
