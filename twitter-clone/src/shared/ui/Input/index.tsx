import { cn } from "@shared/utils";
import { Label } from "../Label";
import { ComponentProps, useId } from "react";

function Input({
  className,
  type,
  error,
  touched,
  ...props
}: ComponentProps<"input"> & { error?: string; touched?: boolean }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
        error && touched && "border-destructive",
      )}
      {...props}
    />
  );
}

export function LabeledInput({
  label,
  error,
  touched,
  ...rest
}: Omit<ComponentProps<typeof Input>, "id"> & { label: string }) {
  const id = useId();

  return (
    <div className="grid gap-1">
      <Label
        htmlFor={id}
        className={cn(error && touched && "text-destructive")}
      >
        {error && touched ? error : label}
      </Label>
      <Input id={id} error={error} touched={touched} {...rest} />
    </div>
  );
}

export { Input };
