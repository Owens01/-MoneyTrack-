export interface ModalButton {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
}

export interface CustomModalProps {
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