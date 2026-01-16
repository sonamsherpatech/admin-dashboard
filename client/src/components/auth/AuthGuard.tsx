"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}
export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) return null;

  return <>{children}</>;
}
