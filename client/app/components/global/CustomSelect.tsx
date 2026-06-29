import {
    type Control,
    Controller,
    type FieldValues,
    type Path,
} from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export interface SelectOption {
    label: string;
    value: string;
}

interface CustomSelectProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    options: SelectOption[];
    disabled?: boolean;
    loading?: boolean;
}

export function CustomSelect<T extends FieldValues>({
    control,
    name,
    label,
    placeholder = "Select...",
    options,
    disabled,
    loading = false,
}: CustomSelectProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                    <FieldLabel htmlFor={name} className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">{label}</FieldLabel>
                    <Select
                        onValueChange={field.onChange}
                        // Handle empty strings gracefully so placeholder shows
                        value={field.value || undefined}
                        disabled={disabled}
                    >
                        <SelectTrigger 
                            id={name}
                            className={cn(
                                "w-full rounded-xl py-6 bg-muted/20 border-border/50 backdrop-blur-md",
                                "text-sm font-medium transition-all duration-300 outline-none shadow-sm",
                                "hover:bg-muted/30 hover:border-border",
                                "focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-background",
                                "disabled:opacity-50 disabled:cursor-not-allowed",
                                fieldState.invalid && "border-destructive focus:border-destructive focus:ring-destructive/20 text-destructive"
                            )}
                        >
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-border/50 bg-card/95 backdrop-blur-xl shadow-xl">
                            {loading && <SelectItem value="loading">Loading...</SelectItem>}
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value} className="rounded-lg cursor-pointer focus:bg-muted/50 hover:bg-muted/50 transition-colors my-1">
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError className="ml-1 text-xs" errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}