"use client";

import { useEffect } from "react";

export default function AuthLayout({ children }) {
  useEffect(() => {
    document.body.classList.remove("dark");
  }, [])

  return <>{children}</>;
}