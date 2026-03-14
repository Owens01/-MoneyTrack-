import { useAuthStore } from "@/base/store/authStore";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { MagicModalScreen } from "@/components/ui/modal/MagicModel";
import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { magicModal } from "react-native-magic-modal";

export default function HomeScreen() {
  const handleOpenMagicModal = () => {
    magicModal.show(MagicModalScreen);
  };

  const { logout } = useAuthStore();
  const router = useRouter();

  return (
    <ScreenWrapper className="flex-1 items-center">
      <Text className="text-xl font-sans-semibold-italic mb-4 text-white">
        Hello, Welcome to Dashboard
      </Text>

      <Pressable
        onPress={handleOpenMagicModal}
        className="bg-slate-600 px-6 py-3 rounded-xl mb-4"
      >
        <Text className="text-white font-sans-semibold">Open Magic Modal</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          logout();
          router.replace("./sign-in");
        }}
        className="bg-slate-600 px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-sans-semibold">Logout</Text>
      </Pressable>
    </ScreenWrapper>
  );
}
