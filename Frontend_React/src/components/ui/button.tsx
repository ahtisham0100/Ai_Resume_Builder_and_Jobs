import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/20 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 border-2 border-solid !border-black hover:!p-4" ,
  {
    variants: {
      variant: {
        default:
          "!bg-white text-black shadow-xs p-2 hover:bg-white/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80 dark:hover:text-white dark:shadow-xs dark:hover:shadow-sm",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-background dark:border-border dark:hover:bg-accent/30 dark:hover:text-accent-foreground",
        secondary:
          "text-white shadow-xs hover:bg-secondary/80 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/70 bg-secondary",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 dark:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:underline dark:text-primary",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);


function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
 
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
   

  )
}

export { Button, buttonVariants }
