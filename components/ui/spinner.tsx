import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
}

export function Spinner({ size = "md", label, className, ...props }: SpinnerProps) {
  const sizeMap = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-2", className)}
      {...props}
    >
      <Loader2 className={cn("animate-spin text-[#008767]", sizeMap[size])} />
      {label && (
        <span className="text-xs font-medium text-stone-500 font-sans">
          {label}
        </span>
      )}
    </div>
  );
}
