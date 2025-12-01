'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    async function check() {
      const res = await fetch("/api/auth/me");
      if (res.ok) router.push("/"); // already logged in → redirect to Feed
    }
    check();
  }, []);

  return (
    <div className="py-14">
      <h1 className="text-3xl font-bold text-center mb-6">Login to PhotoShare</h1>
      <AuthForm isLogin />
    </div>
  )
}
