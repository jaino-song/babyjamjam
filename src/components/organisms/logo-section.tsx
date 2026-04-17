import { cn } from "@/lib/utils";

import { DualColorHeading } from "@/components/molecules/dual-color-heading";

const GOVT_LOGOS = [
  { src: "/images/logo-bokjiro.png", alt: "복지로" },
  { src: "/images/logo-ssis.png", alt: "SSIS", scale: 1.3 },
  { src: "/images/logo-mohw.png", alt: "보건복지부" },
  { src: "/images/logo-cert.png", alt: "인증마크" },
];

const EDU_LOGOS = [
  { src: "/images/edu-logo-1.png", alt: "교육기관 1" },
  { src: "/images/edu-logo-2.png", alt: "교육기관 2", scale: 0.9 },
  { src: "/images/edu-logo-3.png", alt: "교육기관 3" },
];

type LogoSectionVariant = "govt" | "edu";

interface LogoSectionProps {
  variant: LogoSectionVariant;
  className?: string;
}

export function LogoSection({ variant, className }: LogoSectionProps) {
  const isEdu = variant === "edu";
  const logos = isEdu ? EDU_LOGOS : GOVT_LOGOS;

  return (
    <section
      className={cn(
        "flex flex-col items-start gap-12 w-full py-12",
        isEdu ? "pt-12 pb-0" : "",
        className
      )}
      data-component="organism-logo-section"
      data-variant={variant}
    >
      {isEdu ? (
        <h2
          className="text-h2 font-extrabold font-heading text-bjj-text-muted text-left"
          data-component="organism-logo-section-title"
        >
          자격증만 딴다고 다{" "}
          <strong className="text-bjj-primary">전문가</strong>는 아니죠.
        </h2>
      ) : (
        <DualColorHeading
          mutedText="국가인증업체라서"
          primaryText="믿을 수 있으니까."
          align="left"
        />
      )}
      <p
        className="text-big-p font-medium font-body text-bjj-text-dark max-w-[1000px] tracking-wide leading-relaxed text-left"
        data-component="organism-logo-section-description"
      >
        {isEdu
          ? "아가잼잼은 관리사님들이 더 좋은 서비스를 제공할 수 있도록 꾸준히 교육하고 있어요. 자체 컨퍼런스를 통해 다양한 사례를 함께 공부하고, 필수 교육은 물론 공인 기관과 함께 신생아 케어에 맞춘 전문 교육도 이어가고 있어요. 자격증만으로 충분하다고 생각하지 않고, 늘 더 세심하고 믿음직한 서비스를 고민해요."
          : "아가잼잼은 대한민국 정부 인증을 받은 산모·신생아 건강관리 지원사업 제공기관으로, 안심하고 함께하실 수 있어요."}
      </p>
      <div
        className="flex justify-center items-center flex-wrap w-full gap-17 self-center"
        data-component="organism-logo-section-row"
      >
        {logos.map((logo) => (
          <img
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            className="h-[72px] w-auto object-contain"
            style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
            data-component="organism-logo-section-logo"
          />
        ))}
      </div>
    </section>
  );
}
