import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center w-full gap-25 pb-50",
        className
      )}
      data-component="organism-hero-section"
    >
      <div
        className="relative w-full h-190 rounded-b-card overflow-hidden"
        data-component="organism-hero-section-bg"
      >
        <img
          src="/images/hero-bg-22ebe1.png"
          alt="Hero background"
          className="w-full h-full object-cover"
          data-component="organism-hero-section-image"
        />
      </div>
      <h1
        className="text-h1 font-extrabold font-heading text-bjj-primary whitespace-pre-line leading-tight tracking-widest w-full"
        data-component="organism-hero-section-text"
      >
        {"엄마의 설레는 첫 만남.\n아기의 완벽한 첫 걸음."}
      </h1>
    </section>
  );
}
