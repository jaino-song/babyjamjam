import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex justify-center items-center no-underline border-none cursor-pointer font-heading font-extrabold tracking-tight",
  {
    variants: {
      variant: {
        primary:
          "w-64 h-16 rounded-pill bg-bjj-primary text-bjj-primary-light text-btn",
        cta: "px-[24px] py-[16px] rounded-pill bg-bjj-primary text-bjj-bg text-nav",
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
};

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsAnchor = ButtonBaseProps & {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({ variant, className, children, href, ...rest }: ButtonProps) {
  const classes = cn(buttonVariants({ variant }), className);

  if (href !== undefined) {
    return (
      <a
        href={href}
        className={classes}
        data-component="ui-button"
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      data-component="ui-button"
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
