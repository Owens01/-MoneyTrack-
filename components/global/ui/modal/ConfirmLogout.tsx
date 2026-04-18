import { useAuthStore } from "@/base/store/authStore";
import React from "react";
import { CustomModal } from "@/components/global/modal/CustomModal";

interface ConfirmLogoutProps {
  modalId: string;
}

export function ConfirmLogout({ modalId }: ConfirmLogoutProps) {
  const { logout } = useAuthStore();

  return (
    <CustomModal
      modalId={modalId}
      title="Log Out"
      description="Are you sure you want to log out? You will need to sign in again to access your data."
      buttons={[
        {
          label: "Log Out",
          variant: "danger",
          onPress: logout,
        },
        {
          label: "Cancel",
          variant: "secondary",
          onPress: () => {},
        },
      ]}
    />
  );
}
