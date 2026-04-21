import { cn } from "@/lib/utils";

type PillCtaAsButton = {
  href?: undefined;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type PillCtaAsAnchor = {
  href: string;
  children: React.ReactNode;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type PillCtaProps = PillCtaAsButton | PillCtaAsAnchor;

const pillClasses =
  "inline-flex justify-center items-center h-10 px-5 bg-bjj-primary rounded-pill font-heading font-[800] text-[13px] leading-[1.4] tracking-[-0.025em] text-bjj-primary-light no-underline border-none cursor-pointer";

export function PillCta({ className, children, href, ...rest }: PillCtaProps) {
  const classes = cn(pillClasses, className);

  if (href !== undefined) {
    return (
      <a
        href={href}
        className={classes}
        data-component="ui-pill-cta"
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      data-component="ui-pill-cta"
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
