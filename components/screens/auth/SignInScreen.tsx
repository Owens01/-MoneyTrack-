import { storage } from "@/base/libs/mmkvStore";
import { ErrorToast } from "@/base/libs/toast";
import { signInSchema } from "@/base/libs/validation/auth.schema";
import { useAuthStore } from "@/base/store/authStore";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useRouter } from "expo-router";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export function SignInScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (data: any) => {
    const storedUser = storage.getString("registeredUser");

    if (!storedUser) {
      ErrorToast();
      return;
    }

    const savedUser = JSON.parse(storedUser);

    if (
      savedUser.email === data.email &&
      savedUser.password === data.password
    ) {
      useAuthStore.getState().login(savedUser);
      router.replace("./OnboardingScreen");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <ScreenWrapper className="flex-1 justify-center px-6 bg-white">
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1 justify-center"
      >
        <Text className="text-3xl font-bold font-sans text-center mb-8 text-slate-500">
          Welcome Back
        </Text>
        <Text className="text-muted-foreground mt-2 text-center">
          Sign in to continue managing your budget
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <Mail size={20} className="text-muted-foreground mr-3" />
              <TextInput
                className="flex-1 text-foreground"
                placeholder="Enter your email"
                placeholderTextColor="#94a3b8"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && (
                <Text className="text-red-500 font-sans-light-italic text-sm mb-4 pl-2">
                  {errors.email.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <Lock size={20} className="text-muted-foreground mr-3" />
              <TextInput
                className="flex-1 text-foreground"
                placeholder="Enter your password"
                placeholderTextColor="#94a3b8"
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} className="text-muted-foreground" />
                ) : (
                  <Eye size={20} className="text-muted-foreground" />
                )}
              </TouchableOpacity>
              {errors.password && (
                <Text className="text-red-500 font-sans-light-italic text-sm mb-6 pl-2">
                  {errors.password.message}
                </Text>
              )}
            </>
          )}
        />

        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="bg-slate-600 p-4 rounded-2xl active:opacity-80"
        >
          <Text className="text-white text-center font-sans-semibold">
            Sign In
          </Text>
        </Pressable>

        <Link href="/sign-up" className="mt-4 self-center">
          <Text className="text-sm font-sans-italic">
            Don’t have an account?{" "}
            <Text className="font-sans-semibold">Sign Up</Text>
            <ArrowRight size={20} color="white" />
          </Text>
        </Link>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
