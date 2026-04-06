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

export function PillCta({ className, children, href, ...rest }: PillCtaProps) {
  const classes = cn("pill-cta medium-p", className);

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
