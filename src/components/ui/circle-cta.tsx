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
  "inline-flex items-center justify-center h-10 px-5 rounded-[640px] border-none shrink-0 bg-bjj-primary text-white no-underline cursor-pointer transition-opacity duration-200 whitespace-nowrap font-body font-medium text-[16px] leading-[27px] tracking-[0.231px] hover:opacity-90";

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
