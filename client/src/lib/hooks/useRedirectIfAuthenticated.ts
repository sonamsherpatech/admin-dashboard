"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useRedirectIfAuthenticated(redirectTo = "/dashboard") {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace(redirectTo);
    } else {
      setCheckingAuth(false);
    }
  }, [router, redirectTo]);

  return checkingAuth;
}
