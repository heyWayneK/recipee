"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/recipee/formgen/_util/utils2";

// FIXME: I dont think we use this
// TODO: Merging Tailwind Classes
// import { tailwindMerge } from "@/utils/tailwindMerge";
// className={tailwindMerge("mb-2 p-3 overflow-hidden w-full rounded-3xl border border-dotted border-slate-600 shadow-md grid grid-cols-1 justify-center items-stretch", className)}

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>>(
  ({ className, ...props }, ref) => <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
