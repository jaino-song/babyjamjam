import { cn } from "@/lib/utils";

type RadioPillProps = {
  name: string;
  value: string;
  children: React.ReactNode;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultChecked?: boolean;
  checked?: boolean;
  "data-component"?: string;
};

export function RadioPill({
  name,
  value,
  children,
  className,
  onChange,
  defaultChecked,
  checked,
  "data-component": dataComponent,
}: RadioPillProps) {
  return (
    <label className={cn("radio-pill", className)} data-component={dataComponent}>
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
        checked={checked}
        data-component={dataComponent ? `${dataComponent}_input` : undefined}
      />
      <span
        className="radio-pill__label medium-p"
        data-component={dataComponent ? `${dataComponent}_label` : undefined}
      >
        {children}
      </span>
    </label>
  );
}
