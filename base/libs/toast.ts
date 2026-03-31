import Toast from 'react-native-toast-message';

export const SuccessToast = (title?: string, message?: string) => {
    Toast.show({
      type: 'success',
      text1: title || 'Success!',
      text2: message || 'Your action was successful. 👋',
      text1Style: { fontSize: 18, fontWeight: 'bold' },
      text2Style: { fontSize: 14 },
    });
  }

  export const ErrorToast = (title?: string, message?: string) => {
      Toast.show({
        type: 'error',
        text1: title || 'Error!',
        text2: message || 'An error occurred. Please try again.',
        text1Style: { fontSize: 18, fontWeight: 'bold' },
        text2Style: { fontSize: 14 },
      });
    }
  