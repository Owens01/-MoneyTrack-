import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { lightTheme } from '@/components/global/theme';
import type { ToastConfig } from 'react-native-toast-message';

const COLORS = lightTheme;

const FONTS = {
  bold: 'InterTight-Bold',
  regular: 'InterTight-Regular',
};

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: COLORS.vibrantGreen,
        backgroundColor: COLORS.mintCream,
        shadowColor: COLORS.black,
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
      }}
      contentContainerStyle={{}}
      text1Style={{
        fontSize: 14,
        fontFamily: FONTS.bold,
        color: COLORS.black900,
      }}
      text2Style={{
        fontSize: 12,
        fontFamily: FONTS.regular,
        color: COLORS.black600,
        marginTop: 1,
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: COLORS.destructive,
        backgroundColor: COLORS.paleRed,
        shadowColor: COLORS.black,
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
      }}
      contentContainerStyle={{}}
      text1Style={{
        fontSize: 14,
        fontFamily: FONTS.bold,
        color: COLORS.black900,
      }}
      text2Style={{
        fontSize: 12,
        fontFamily: FONTS.regular,
        color: COLORS.black600,
        marginTop: 1,
      }}
    />
  ),
};
