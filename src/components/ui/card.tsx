import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl bg-white/70 dark:bg-zinc-900/70 shadow-lg border border-zinc-200 dark:border-zinc-800 backdrop-blur-md",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };
