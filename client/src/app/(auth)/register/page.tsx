"use client";

import Button from "@/components/ui/Button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import registerSchema from "./register-validation";
import { useAppDispatch } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/store/auth/auth-thunks";
import { toast } from "sonner";

type RegisterFormType = z.infer<typeof registerSchema>;

export default function RegisterUser() {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function handleTogglePassword() {
    if (isSubmitting) return;
    setSeePassword(!seePassword);
  }

  function handleToggleConfirmPassword() {
    if (isSubmitting) return;
    setSeeConfirmPassword(!seeConfirmPassword);
  }

  async function onSubmit(data: RegisterFormType) {
    const result = await dispatch(registerUser(data));

    if (registerUser.fulfilled.match(result)) {
      toast.success("Register Sucessfull 🎉");
      reset();
      router.push("/login");
    }

    if (registerUser.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h3 className="font-bold text-2xl mb-2">Register</h3>
        <p className="text-xs text-gray-400 mb-6">Become part of us</p>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("username")}
              disabled={isSubmitting}
              className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-1 transition border-gray-300 focus:border-blue-500 focus:ring-blue-200 "
              type="text"
              placeholder="Enter username"
            />
            {errors.username && (
              <span className="text-xs text-red-600">
                {errors.username.message}
              </span>
            )}
          </div>

          <div>
            <input
              {...register("email")}
              disabled={isSubmitting}
              className="border rounded-md px-4 py-2 w-full focus: outline-none focus:ring-1 transition border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              type="email"
              placeholder="Enter Email"
            />
            {errors.email && (
              <span className="text-xs text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="relative">
            {seePassword ? (
              <Eye
                className="absolute top-3 right-3 cursor-pointer text-gray-700"
                onClick={handleTogglePassword}
                size={20}
              />
            ) : (
              <EyeOff
                className="absolute top-3 right-3 cursor-pointer text-gray-700"
                onClick={handleTogglePassword}
                size={20}
              />
            )}

            <input
              {...register("password")}
              disabled={isSubmitting}
              className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-1 transition border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              type={seePassword ? "text" : "password"}
              placeholder="Enter Password"
            />

            {errors.password && (
              <span className="text-xs text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="relative">
            {seeConfirmPassword ? (
              <Eye
                className="absolute top-3 right-3 text-gray-700 cursor-pointer"
                onClick={handleToggleConfirmPassword}
                size={20}
              />
            ) : (
              <EyeOff
                className="absolute top-3 right-3 text-gray-700 cursor-pointer"
                onClick={handleToggleConfirmPassword}
                size={20}
              />
            )}

            <input
              {...register("confirmPassword")}
              disabled={isSubmitting}
              className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-1 transition border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              type={seeConfirmPassword ? "text" : "password"}
              placeholder="Enter Confirm-Password"
            />

            {errors.confirmPassword && (
              <span className="text-xs text-red-600">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div>
            <Button
              type="submit"
              text={isSubmitting ? "Registering... " : "Register"}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
