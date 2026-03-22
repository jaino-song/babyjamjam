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
        {/* 상단 흰색 페이드 오버레이 */}
        <div
          className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-white to-transparent"
          aria-hidden="true"
          data-component="organism-hero-section-gradient"
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
