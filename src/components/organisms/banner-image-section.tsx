import { cn } from "@/lib/utils";

interface BannerImageSectionProps {
  className?: string;
}

export function BannerImageSection({ className }: BannerImageSectionProps) {
  return (
    <section
      className={cn("hero__bg service-page__banner", className)}
      data-component="organism-banner-image-section"
    >
      <img
        src="/images/hero-image-1a35f6.png"
        alt="아가잼잼 배너"
        className="hero__bg-image"
        data-component="organism-banner-image-section-image"
      />
      <span
        className="h3 hero-image__text"
        data-component="organism-banner-image-section-text"
      >
        검증 됐으니까. 믿을 수 있으니까.
      </span>
    </section>
  );
}
