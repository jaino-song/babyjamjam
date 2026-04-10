import { cn } from "@/lib/utils";

type RadioPillProps = {
  name: string;
  value: string;
  children: React.ReactNode;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultChecked?: boolean;
};

export function RadioPill({ name, value, children, className, onChange, defaultChecked }: RadioPillProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer group",
        "[&:hover_span]:border-bjj-primary [&:hover_span]:text-bjj-primary",
        "[&_input:checked+span]:bg-bjj-primary [&_input:checked+span]:border-bjj-primary [&_input:checked+span]:text-white",
        className,
      )}
      data-component="ui-radio-pill"
    >
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
        className="absolute opacity-0 w-0 h-0"
      />
      <span className="inline-flex h-10 px-5 items-center border-2 border-bjj-divider rounded-[32px] text-bjj-text-paragraph transition-all duration-200 bg-bjj-bg font-body font-medium text-[16px] leading-[27px] tracking-[0.231px]">
        {children}
      </span>
    </label>
  );
}
