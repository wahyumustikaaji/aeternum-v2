"use client";

import Navbar from "@/components/ui/navbar";
import { useEffect } from "react";

export default function MainLayout({ children }) {
  useEffect(() => {
    document.body.classList.add("dark");
  }, [])

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}