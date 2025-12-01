'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthForm } from "@/components/auth-form"

export default function RegisterPage() {
  const router = useRouter()

  useEffect(() => {
    async function check() {
      const res = await fetch("/api/auth/me")
      if (res.ok) router.push("/") // already logged in → go Home
    }
    check()
  }, [])

  return (
    <div className="py-14">
      <h1 className="text-3xl font-bold text-center mb-6">Register & Join MediaShare</h1>
      <AuthForm />
    </div>
  )
}
