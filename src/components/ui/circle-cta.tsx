import { cn } from "@/lib/utils";

type PillCtaBase = {
  children: React.ReactNode;
  className?: string;
  ["data-component"]?: string;
};

type PillCtaAsButton = PillCtaBase & {
  href?: undefined;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type PillCtaAsAnchor = PillCtaBase & {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type PillCtaProps = PillCtaAsButton | PillCtaAsAnchor;

const pillClasses =
  "inline-flex justify-center items-center h-10 px-5 bg-bjj-primary rounded-pill font-heading font-[800] text-[0.8125rem] leading-[1.4] tracking-[-0.025em] text-bjj-primary-light no-underline border-none cursor-pointer";

export function PillCta({
  className,
  children,
  href,
  "data-component": dataComponent,
  ...rest
}: PillCtaProps) {
  const classes = cn(pillClasses, className);

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
