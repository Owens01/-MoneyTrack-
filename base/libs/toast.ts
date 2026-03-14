import Toast from 'react-native-toast-message';

 export const SuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: 'Your action was successful. 👋',
      text1Style: { fontSize: 18, fontWeight: 'bold' },
      text2Style: { fontSize: 14 },
    });
  }

  export const ErrorToast = () => {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'No account found. Please Sign Up first.',
        text1Style: { fontSize: 18, fontWeight: 'bold' },
        text2Style: { fontSize: 14 },
      });
    }
  