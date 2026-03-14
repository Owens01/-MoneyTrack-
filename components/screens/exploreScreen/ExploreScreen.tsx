import ScreenWrapper from "@/components/global/ScreenWrapper";
import { Text, Image, ActivityIndicator, View, Pressable } from "react-native";
import { useGetDogs } from "@/base/hooks/useDogs";

export function ExploreScreen() {
  const { data, isLoading, error, refetch } = useGetDogs();

  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center px-6">

        {isLoading && <ActivityIndicator size="large" color="#f2f2f2"/>}

        {error && (
          <Text className="text-red-500 mb-4">
            Failed to load dog image
          </Text>
        )}

        {data && (
          <>
            <Image
              source={{ uri: data.image }}
              style={{ width: 300, height: 300, borderRadius: 16 }}
              resizeMode="cover"
            />

            <Text className="text-lg font-sans-bold mt-4 text-amber-50">
              {data.breed}
            </Text>

            <Pressable
              onPress={() => refetch()}
              className="mt-6 bg-slate-600 px-6 py-3 rounded-xl"
            >
              <Text className="text-white font-sans-semibold text-center">
                Get Another Dog
              </Text>
            </Pressable>
          </>
        )}

      </View>
    </ScreenWrapper>
  );
}