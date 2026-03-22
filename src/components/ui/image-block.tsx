import { cn } from "@/lib/utils";

const IMAGE_BLOCK_VARIANT_CLASSES = {
  hero: "w-full h-190 rounded-b-card object-cover",
  banner: "w-full h-254 rounded-card object-cover",
  phone: "w-[453px] h-[925px] object-contain",
  partner: "h-[72px] w-auto object-contain",
} as const;

type ImageBlockVariant = keyof typeof IMAGE_BLOCK_VARIANT_CLASSES;

interface ImageBlockProps {
  variant: ImageBlockVariant;
  src: string;
  alt: string;
  className?: string;
}

export function ImageBlock({ variant, src, alt, className }: ImageBlockProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(IMAGE_BLOCK_VARIANT_CLASSES[variant], className)}
      data-component="ui-image-block"
    />
  );
}
