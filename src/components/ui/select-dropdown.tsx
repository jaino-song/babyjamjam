"use client";

import { useState, useRef, useEffect } from "react";

import { cn } from "@/lib/utils";

export type SelectOption = {
  label: string;
  value: string;
};

interface SelectDropdownProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function SelectDropdown({
  options,
  value,
  placeholder = "항목을 선택해 주세요",
  onChange,
  className,
  disabled = false,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      data-component="ui-select-dropdown"
    >
      <button
        type="button"
        className={cn(
          "flex justify-between items-center w-full h-12 px-3 bg-bjj-bg border-2 border-bjj-divider rounded-[32px] cursor-pointer font-body text-[16px] font-medium leading-[1.5] tracking-[0.03em] text-bjj-text-headline transition-[border-color] duration-200",
          "hover:border-bjj-primary",
          isOpen && "border-bjj-primary",
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "flex-1 text-left overflow-hidden text-ellipsis whitespace-nowrap",
            !selectedOption && "text-[#9ca3af]",
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={cn(
            "shrink-0 w-4 h-4 text-[#9ca3af] transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.33"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute top-[calc(100%+4px)] left-0 right-0 bg-bjj-bg border border-bjj-divider rounded-xl py-1 list-none z-20 shadow-[0_4px_12px_rgba(0,0,0,0.08)] max-h-[200px] overflow-y-auto"
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={cn(
                "py-2 px-3 cursor-pointer font-body text-[16px] font-medium leading-[1.5] tracking-[0.03em] text-bjj-text-headline transition-colors duration-150",
                "hover:bg-[rgba(0,74,173,0.04)]",
                option.value === value && "text-bjj-primary font-bold",
              )}
              onClick={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
