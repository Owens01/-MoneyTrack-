import { X } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { magicModal } from "react-native-magic-modal";

interface ModalButton {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
}

interface CustomModalProps {
  modalId: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  buttons?: ModalButton[];
  onClose?: () => void;
  closeOnBackdrop?: boolean;
  cardClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  bodyClassName?: string;
}

const BUTTON_CLASSES: Record<
  NonNullable<ModalButton["variant"]>,
  { wrapper: string; text: string }
> = {
  primary: { wrapper: "bg-primary", text: "text-white" },
  secondary: {
    wrapper: "border border-border bg-transparent",
    text: "text-foreground",
  },
  danger: { wrapper: "bg-red-500", text: "text-white" },
};

export function CustomModal({
  modalId,
  title,
  description,
  children,
  buttons,
  onClose,
  closeOnBackdrop = true,
  cardClassName,
  titleClassName,
  descriptionClassName,
  bodyClassName,
}: CustomModalProps) {
  const handleClose = () => {
    onClose?.();
    magicModal.hide(modalId);
  };

  return (
    <View className="flex-1 justify-center items-center px-6 bg-black/50">
      {/* Backdrop */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={closeOnBackdrop ? handleClose : undefined}
        className="absolute inset-0"
      />

      <View
        className={`bg-background w-full rounded-3xl overflow-hidden max-h-[85%] ${cardClassName ?? ""}`}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-6 pb-4 border-b border-border">
          <View className="flex-1 pr-4 gap-1">
            <Text
              className={`text-xl font-sans-bold text-foreground ${titleClassName ?? ""}`}
            >
              {title}
            </Text>
            {description && (
              <Text
                className={`text-sm font-sans-regular text-muted-foreground leading-5 ${descriptionClassName ?? ""}`}
              >
                {description}
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={handleClose}
            activeOpacity={0.7}
            className="p-2 rounded-full bg-muted items-center justify-center"
          >
            <X size={18} className="text-muted-foreground" />
          </TouchableOpacity>
        </View>

        {/* Body */}
        {children && (
          <ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerClassName={`px-6 py-5 ${bodyClassName ?? ""}`}
          >
            {children}
          </ScrollView>
        )}

        {/* Buttons */}
        {buttons && buttons.length > 0 && (
          <View className="px-6 py-5 border-t border-border gap-3">
            {buttons.map((btn, index) => {
              const style = BUTTON_CLASSES[btn.variant ?? "primary"];
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    magicModal.hide(modalId);
                    btn.onPress();
                  }}
                  activeOpacity={0.7}
                  className={`py-3.5 rounded-2xl items-center ${style.wrapper}`}
                >
                  <Text className={`text-sm font-sans-semibold ${style.text}`}>
                    {btn.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
}
