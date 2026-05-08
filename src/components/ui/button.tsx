import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex justify-center items-center no-underline border-none cursor-pointer font-heading font-extrabold tracking-tight disabled:opacity-45 disabled:cursor-default [color:var(--bjj-color-primary-light)]",
  {
    variants: {
      variant: {
        primary:
          "w-[164px] h-10 px-5 rounded-[640px] bg-bjj-primary text-[0.8125rem]",
        cta: "px-5 h-10 rounded-pill bg-bjj-primary text-[0.8125rem]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  children: React.ReactNode;
  className?: string;
  ["data-component"]?: string;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsAnchor = ButtonBaseProps & {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({
  variant,
  className,
  children,
  href,
  "data-component": dataComponent,
  ...rest
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant }), className);

  if (href !== undefined) {
    return (
      <a
        href={href}
        className={classes}
        data-component={dataComponent}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      data-component={dataComponent}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
