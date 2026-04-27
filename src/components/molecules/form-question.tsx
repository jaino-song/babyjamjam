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
  "data-component"?: string;
}

export function FormQuestion({
  label,
  helperText,
  options,
  value,
  placeholder,
  onChange,
  visible = true,
  "data-component": dataComponent,
}: FormQuestionProps) {
  return (
    <div
      className={`form-question ${visible ? "form-question--visible" : "form-question--hidden"}`}
      data-component={dataComponent}
    >
      <div
        className="form-question__header"
        data-component={dataComponent ? `${dataComponent}-header` : undefined}
      >
        <span
          className="form-question__label"
          data-component={dataComponent ? `${dataComponent}-label` : undefined}
        >
          {label}
        </span>
        {helperText && (
          <span
            className="form-question__helper"
            data-component={dataComponent ? `${dataComponent}-helper` : undefined}
          >
            {helperText}
          </span>
        )}
      </div>
      <SelectDropdown
        options={options}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        data-component={dataComponent ? `${dataComponent}-select` : undefined}
      />
    </div>
  );
}
