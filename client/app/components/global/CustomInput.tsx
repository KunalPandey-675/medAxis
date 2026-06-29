import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CustomInputProps<T extends FieldValues> extends Omit<
  ComponentProps<typeof Input>,
  "name"
> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  startIcon?: ReactNode;
}

export function CustomInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
  startIcon,
  className,
  ...props
}: CustomInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="space-y-1.5">
          <FieldLabel
            htmlFor={name}
            className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1"
          >
            {label}
          </FieldLabel>

          <div className="relative group">
            {startIcon && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300 pointer-events-none z-10">
                {startIcon}
              </div>
            )}

            <Input
              id={name}
              disabled={disabled}
              {...field}
              {...props}
              className={cn(
                // Base Layout
                "w-full rounded-xl py-6 bg-muted/20 border-border/50", 
                startIcon ? "pl-12" : "pl-4",
                "pr-4 text-sm font-medium transition-all duration-300 outline-none shadow-sm",
                "backdrop-blur-md",

                // Focus/Hover States
                "hover:bg-muted/30 hover:border-border",
                "focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary focus-visible:bg-background",

                // Disabled State
                "disabled:opacity-50 disabled:cursor-not-allowed",

                // Error State
                fieldState.invalid &&
                "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20 text-destructive placeholder:text-destructive/50",

                className,
              )}
            />
          </div>

          {description && (
            <p className="text-[11px] font-medium text-muted-foreground ml-1">{description}</p>
          )}

          {fieldState.invalid && <FieldError className="ml-1 text-xs" errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}