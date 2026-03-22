import { cn } from "@/lib/utils";

import { DualColorHeading } from "@/components/molecules/dual-color-heading";

const GOVT_LOGOS = [
  { src: "/images/logo-bokjiro.png", alt: "복지로" },
  { src: "/images/logo-ssis.png", alt: "SSIS" },
  { src: "/images/logo-mohw.png", alt: "보건복지부" },
  { src: "/images/logo-cert.png", alt: "인증마크" },
];

const EDU_LOGOS = [
  { src: "/images/edu-logo-1.png", alt: "교육기관 1" },
  { src: "/images/edu-logo-2.png", alt: "교육기관 2" },
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
        "flex flex-col items-start gap-12 p-25 px-50 w-screen max-w-480",
        isEdu ? "pt-15 pb-0" : "",
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
          ? "아가잼잼은 관리사들이 최고의 서비스를 제공할 수 있도록 지속적으로 교육하고 있어요. 자체 컨퍼런스를 통한 케이스 스터디와, 필수 교육에 더해서 공인 기관을 통해 신생아 케어에 최적화된 교육 또한 진행하고 있어요. 자격증만 있다고 산모님께 보내는 주먹구구식 운영은 지양해요."
          : "아가잼잼은 대한민국 정부가 인증한 산모신생아건강관리사업 제공업체 입니다."}
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
            data-component="organism-logo-section-logo"
          />
        ))}
      </div>
    </section>
  );
}
