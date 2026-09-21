import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#008767]/10 text-[#008767] hover:bg-[#008767]/20",
        secondary:
          "border-transparent bg-stone-100 text-stone-800 hover:bg-stone-200",
        destructive:
          "border-transparent bg-rose-100 text-rose-700 hover:bg-rose-200",
        outline: "text-[#181A1B] border-[#E5E0D8]",
        emerald: "border-transparent bg-emerald-100 text-emerald-800",
        rose: "border-transparent bg-rose-100 text-rose-800",
        amber: "border-transparent bg-amber-100 text-amber-800",
        teal: "border-transparent bg-teal-100 text-teal-800",
        blue: "border-transparent bg-blue-100 text-blue-800",
        indigo: "border-transparent bg-indigo-100 text-indigo-800",
        slate: "border-transparent bg-slate-100 text-slate-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
