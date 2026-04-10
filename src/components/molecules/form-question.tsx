import { cn } from "@/lib/utils";
import {
  SelectDropdown,
  type SelectOption,
} from "@/components/ui/select-dropdown";

interface FormQuestionProps {
  label: string;
  helperText?: React.ReactNode;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  visible?: boolean;
}

export function FormQuestion({
  label,
  helperText,
  options,
  value,
  placeholder,
  onChange,
  visible = true,
}: FormQuestionProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 transition-[opacity,max-height] duration-300",
        visible ? "opacity-100" : "opacity-0 max-h-0 overflow-hidden pointer-events-none",
      )}
      data-component="molecule-form-question"
    >
      <div className="flex flex-col gap-1">
        <span className="font-heading font-extrabold text-[24px] leading-[1.2] text-bjj-text-dark">
          {label}
        </span>
        {helperText && (
          <span className="font-body font-medium text-[16px] leading-[1.5] text-bjj-text-muted">
            {helperText}
          </span>
        )}
      </div>
      <SelectDropdown
        options={options}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
