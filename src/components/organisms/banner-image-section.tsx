import { cn } from "@/lib/utils";

interface BannerImageSectionProps {
  className?: string;
}

export function BannerImageSection({ className }: BannerImageSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full h-254 rounded-card overflow-hidden",
        className
      )}
      data-component="organism-banner-image-section"
    >
      <img
        src="/images/hero-image-1a35f6.png"
        alt="아가잼잼 배너"
        className="w-full h-full object-cover"
        data-component="organism-banner-image-section-image"
      />
      <span
        className="h2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
        style={{ textShadow: "1px 4px 8px rgba(0,0,0,0.25)", color: "white" }}
        data-component="organism-banner-image-section-text"
      >
        검증 됐으니까. 믿을 수 있으니까.
      </span>
    </section>
  );
}
