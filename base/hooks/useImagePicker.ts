import { Alert } from "react-native";
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import toast from "@/components/ui/toast/CustomToast";

type PickerResponse = Asset | null;

const options = {
  mediaType: "photo" as const,
  quality: 0.8,
  includeBase64: false,
};

export const useImagePicker = () => {
  const pickFromGallery = async (): Promise<PickerResponse> => {
    try {
      const result = await launchImageLibrary(options);

      if (result.didCancel) return null;

      if (result.errorCode) {
        toast.error("Error", result.errorMessage || "Something went wrong");
        return null;
      }

      return result.assets?.[0] || null;
    } catch (error) {
      toast.error("Error", "Failed to open gallery");
      return null;
    }
  };

  const takePhoto = async (): Promise<PickerResponse> => {
    try {
      const result = await launchCamera(options);

      if (result.didCancel) return null;

      if (result.errorCode) {
        toast.error("Error", result.errorMessage || "Camera error");
        return null;
      }

      return result.assets?.[0] || null;
    } catch (error) {
      toast.error("Error", "Failed to open camera");
      return null;
    }
  };

  return {
    pickFromGallery,
    takePhoto,
  };
};
