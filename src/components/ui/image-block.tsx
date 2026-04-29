import { cn } from "@/lib/utils";

const IMAGE_BLOCK_VARIANT_CLASSES = {
  hero: "w-full h-190 rounded-b-card object-cover",
  banner: "w-full h-254 rounded-card object-cover",
  phone: "w-[452px] h-[924px] object-contain",
  partner: "h-[72px] w-auto object-contain",
  careCard: "h-full w-full object-cover",
} as const;

type ImageBlockVariant = keyof typeof IMAGE_BLOCK_VARIANT_CLASSES;

interface ImageBlockProps {
  variant: ImageBlockVariant;
  src: string;
  alt: string;
  className?: string;
  ["data-component"]?: string;
}

export function ImageBlock({
  variant,
  src,
  alt,
  className,
  "data-component": dataComponent,
}: ImageBlockProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(IMAGE_BLOCK_VARIANT_CLASSES[variant], className)}
      data-component={dataComponent}
    />
  );
}
