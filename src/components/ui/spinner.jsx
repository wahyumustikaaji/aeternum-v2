"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function LoadingSpinner({ size = "lg", color = "primary", className }) {
  const sizeMap = {
    sm: "size-4",
    md: "size-6",
    lg: "size-8",
    xl: "size-12",
  }

  const colorMap = {
    default: "text-muted-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
    destructive: "text-destructive",
  }

  return <Loader2 className={cn("animate-spin", sizeMap[size], colorMap[color], className)} />
}
