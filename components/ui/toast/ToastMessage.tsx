import { Pressable, Text } from 'react-native'
import { SuccessToast } from '@/base/libs/toast'

export function ToastMessage() {

  return (
    <Pressable
      onPress={SuccessToast}
      className="bg-slate-600 p-4 rounded-2xl active:opacity-80"
    >
      <Text className="text-white font-sans-bold">Show toast</Text>
    </Pressable>
  )
}