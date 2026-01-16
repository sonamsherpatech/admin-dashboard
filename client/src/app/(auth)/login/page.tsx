"use client";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import loginSchema from "./login-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { loginUser } from "@/lib/store/auth/auth-thunks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

type LoginFormType = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((store) => store.auth);
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  function handlePasswordSee() {
    if (isSubmitting) return;
    setSeePassword(!seePassword);
  }

  async function onSubmit(data: LoginFormType) {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      toast.success("Logged in sucessfully 🎉");
      reset();
      router.push("/dashboard");
    }

    if (loginUser.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  }

  if (checkingAuth) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h3 className="text-2xl font-bold mb-6 text-center">Login</h3>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              disabled={isSubmitting}
              className={`border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-1  transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
              {...register("email")}
              type="email"
              placeholder="Enter e-mail"
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
                onClick={handlePasswordSee}
                className="absolute top-3 right-3 text-gray-700 cursor-pointer transition"
                size={20}
              />
            ) : (
              <EyeClosed
                onClick={handlePasswordSee}
                className="absolute top-3 right-3 text-gray-700 cursor-pointer transition"
                size={20}
              />
            )}

            <input
              disabled={isSubmitting}
              className={`border rounded-md px-4 py-2 w-full focus:outline-none  focus:ring-1 transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
              {...register("password")}
              type={seePassword ? "text" : "password"}
              placeholder="Enter password"
            />
            {errors.password && (
              <span className="text-xs text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              text={isSubmitting ? "Loggin in..." : "Login"}
            />
          </div>
          <div>
            <button
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full bg-gray-100 px-5 py-2 rounded-md hover:bg-gray-200 cursor-pointer transition-colors duration-200 font-medium"
              type="button"
            >
              <Image
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              Sign-in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
