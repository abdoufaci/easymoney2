import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        brandOutline:
          "border border-brand hover:bg-brand hover:text-white text-brand bg-transparent",
        whiteOutline:
          "border border-white hover:bg-white hover:text-black text-white bg-transparent",
        brand_link: "text-brand underline-offset-4 hover:underline",
        white_link: "text-white underline-offset-4 hover:underline",
        white_reply: "text-white/90 hover:text-white",
        red_link: "text-[#FF4242] underline",
        dark_brand: "bg-brand/95 text-white hover:bg-brand",
        brand: "bg-brand/90 text-white hover:bg-brand",
        addSection:
          "bg-[#D9D9D91A] text-[#1FB4AB] border border-[#1FB4AB4A] hover:bg-[#D9D9D91A]",
        gradient_brand: "bg-brand/90 text-white hover:bg-brand",
        delete:
          "border border-[#FF3B30] hover:bg-[#FF3B30] hover:text-white text-[#FF3B30] bg-transparent",
        white: "bg-white hover:bg-white/90 text-[#0C1418]",
        active: "bg-[#24C26D42] text-[#24C26D]",
        hidden: "bg-[#FAD81642] text-[#FAD816]",
        expand: "bg-black/50 hover:bg-black/80 text-[#5ae33e]",
        open: "bg-[#11C86638] text-[#11C866] hover:bg-[#11C86638]",
        close: "bg-[#FF000038] text-[#FF0000] hover:bg-[#FF000038]",
        private: "bg-[#C88E113D] text-[#C88E11] hover:bg-[#C88E113D]",
        success: "radialGradient text-white hover:radialGradient",
        successPage:
          "successRadialGradient text-white hover:successRadialGradient",
        cancelPage:
          "cancelRadialGradient text-white hover:cancelRadialGradient",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
