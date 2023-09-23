import React from "react";
import { cn } from "$/utils/cn";
import { cva } from "class-variance-authority";

type Props = React.ComponentPropsWithRef<"form">;

export const formVariants = cva("flex flex-col gap-2 w-full");

export const Form = React.forwardRef<HTMLFormElement, Props>(
  ({ className, ...rest }, ref) => {
    return (
      <form ref={ref} {...rest} className={cn(formVariants(), className)} />
    );
  },
);
Form.displayName = "Form";
