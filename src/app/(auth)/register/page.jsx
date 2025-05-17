"use client"

import { RegisterForm } from "@/components/auth/form-register"
import Image from "next/image"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/">
                <Image src="/assets/images/logo.png" alt="Logo Aeternum" width={150} height={150} />
            </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/assets/images/register.webp"
          alt="Image"
          className="absolute grayscale inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
