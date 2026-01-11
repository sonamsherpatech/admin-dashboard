"use client";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { ILoginType } from "./login-type";
import loginSchema from "./login-validation";

export default function LoginPage() {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<ILoginType>({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState<Record<string, any>>({});

  function handlePasswordSee() {
    setSeePassword(!seePassword);
  }

  function handleLoginDataChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    if (loginError[name]) {
      setLoginError((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  }

  function handleLoginDataSubmission(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = loginSchema.safeParse(loginData);
    if (!result.success) {
      setLoginError(result.error.format());
    } else {
      setLoginError({});
    }

    console.log("Valid login data: ", loginData);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h3 className="text-2xl font-bold mb-6 text-center">Login</h3>
        <form className="space-y-6" onSubmit={handleLoginDataSubmission}>
          <div>
            <input
              className={`border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-1  transition ${
                loginError.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
              type="email"
              placeholder="Enter e-mail"
              name="email"
              value={loginData.email}
              onChange={handleLoginDataChange}
            />
            {loginError.email && (
              <span className="text-xs text-red-600">
                {loginError.email._errors[0]}
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
              className={`border rounded-md px-4 py-2 w-full focus:outline-none  focus:ring-1 transition ${
                loginError.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
              type={seePassword ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              value={loginData.password}
              onChange={handleLoginDataChange}
            />
            {loginError.password && (
              <span className="text-xs text-red-600">
                {loginError.password._errors[0]}
              </span>
            )}
          </div>
          <div className="flex justify-center">
            <button
              className="w-full px-6 py-2 rounded-md bg-black text-white hover:bg-gray-900 cursor-pointer transition-colors duration-200 font-medium"
              type="submit"
            >
              Login
            </button>
          </div>
          <div>
            <button
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
