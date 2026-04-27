
import * as React from "react";


const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = "w-1/2 min-w-[410px] border-2 border-red-500", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={className}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };