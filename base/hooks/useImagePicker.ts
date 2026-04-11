import { ErrorToast } from "@/base/libs/toast";
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";

type PickerResponse = Asset | null;

const options: ImageLibraryOptions & CameraOptions = {
  mediaType: "photo",
  quality: 0.8,
  includeBase64: false,
};

export const useImagePicker = () => {
  const pickFromGallery = async (): Promise<PickerResponse> => {
    try {
      const result = await launchImageLibrary(options);

      if (result.didCancel) return null;

      if (result.errorCode) {
        ErrorToast("Error", result.errorMessage || "Something went wrong");
        return null;
      }

      return result.assets?.[0] || null;
    } catch (error) {
      ErrorToast("Error", "Failed to open gallery");
      return null;
    }
  };

  const takePhoto = async (): Promise<PickerResponse> => {
    try {
      const result = await launchCamera(options);

      if (result.didCancel) return null;

      if (result.errorCode) {
        ErrorToast("Error", result.errorMessage || "Camera error");
        return null;
      }

      return result.assets?.[0] || null;
    } catch (error) {
      ErrorToast("Error", "Failed to open camera");
      return null;
    }
  };

  return {
    pickFromGallery,
    takePhoto,
  };
};
