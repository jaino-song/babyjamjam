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
      className={`form-question ${visible ? "form-question--visible" : "form-question--hidden"}`}
      data-component="molecule-form-question"
    >
      <div className="form-question__header">
        <span className="form-question__label">{label}</span>
        {helperText && (
          <span className="form-question__helper">{helperText}</span>
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
