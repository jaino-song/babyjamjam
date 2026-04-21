import { cn } from "@/lib/utils";

type RadioPillProps = {
  name: string;
  value: string;
  children: React.ReactNode;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultChecked?: boolean;
  checked?: boolean;
};

export function RadioPill({ name, value, children, className, onChange, defaultChecked, checked }: RadioPillProps) {
  return (
    <label className={cn("radio-pill", className)} data-component="ui-radio-pill">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
        checked={checked}
      />
      <span className="radio-pill__label medium-p">{children}</span>
    </label>
  );
}
