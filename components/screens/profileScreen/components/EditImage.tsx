import { useImagePicker } from "@/base/hooks/useImagePicker";
import { User } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

export function EditImage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { pickFromGallery, takePhoto } = useImagePicker();

  const handleImagePick = () => {
    Alert.alert("Profile Picture", "Choose an option", [
      {
        text: "Take Photo",
        onPress: async () => {
          const res = await takePhoto();
          if (res?.uri) setProfileImage(res.uri);
        },
      },
      {
        text: "Choose from Gallery",
        onPress: async () => {
          const res = await pickFromGallery();
          if (res?.uri) setProfileImage(res.uri);
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <TouchableOpacity
      onPress={handleImagePick}
      className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 items-center justify-center mb-4 border-4 border-emerald-500/20 overflow-hidden relative"
    >
      {profileImage ? (
        <Image
          source={{ uri: profileImage }}
          className="w-full h-full"
          resizeMode="cover"
        />
      ) : (
        <User size={40} className="text-emerald-600 dark:text-emerald-400" />
      )}
      <View className="absolute bottom-0 w-full bg-black/40 py-1 items-center">
        <Text className="text-[10px] text-white font-medium uppercase tracking-wider">
          Edit
        </Text>
      </View>
    </TouchableOpacity>
  );
}
