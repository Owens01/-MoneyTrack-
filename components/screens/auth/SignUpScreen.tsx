import ScreenWrapper from "@/components/global/ScreenWrapper";
import { Text, TextInput, Pressable, KeyboardAvoidingView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/base/libs/validation/auth.schema";
import { useAuthStore } from "@/base/store/authStore";
import { Link, useRouter } from "expo-router";


export function SignUpScreen() {
  const { login } = useAuthStore();
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: any) => { 
    login(data); 
    router.replace("/(tabs)");
  };

  return (
    <ScreenWrapper className="flex-1 justify-center px-6 bg-white">
      <KeyboardAvoidingView behavior="padding" className="flex-1 justify-center">
      <Text className="text-3xl font-bold font-sans text-center mb-8 text-slate-500 ">Create Account</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              className="border border-gray-300 rounded-xl p-4 mb-2"
            />
            {errors.email && (
              <Text className="text-red-500 font-sans-light-italic text-sm mb-4 pl-2">{errors.email.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              className="border border-gray-300 rounded-xl p-4 mb-2"
            />
            {errors.password && (
              <Text className="text-red-500 font-sans-light-italic text-sm mb-6 pl-2">{errors.password.message}</Text>
            )}
          </>
        )}
      />

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="bg-slate-600 p-4 rounded-xl"
      >
        <Text className="text-white text-center font-sans-semibold">Sign Up</Text>
      </Pressable>

      <Link href="/sign-in" className="mt-6 self-center">
        <Text className="text-center font-sans-italic">
          Already have an account? <Text className="font-sans-semibold">Sign In</Text>
        </Text>
      </Link>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}