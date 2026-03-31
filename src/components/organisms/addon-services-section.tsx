"use client";

import { cn } from "@/lib/utils";
import {
  AddonServiceCard,
  type AddonData,
} from "@/components/molecules/addon-service-card";

interface AddonServicesSectionProps {
  addons: AddonData[];
  /** addonId → quantity. Missing = not added. */
  selections: Map<string, number>;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
  blurred?: boolean;
}

export function AddonServicesSection({
  addons,
  selections,
  onAdd,
  onRemove,
  onQuantityChange,
  blurred = false,
}: AddonServicesSectionProps) {
  return (
    <section
      className={cn(
        "addon-services",
        blurred && "pricing-section--blurred"
      )}
      data-component="organism-addon-services-section"
    >
      <div className="addon-services__heading">
        <h2 className="h2-left addon-services__title">
          <span className="addon-services__title-muted">
            내가 원하는 대로 선택 가능.
          </span>
          <br />
          <span className="addon-services__title-primary">
            산후도우미서비스 추가 서비스
          </span>
        </h2>
      </div>

      <p className="addon-services__note">
        *모든 요금은 1인 1일 기준입니다.
      </p>

      <div className="addon-services__list">
        {addons.map((addon) => {
          const qty = selections.get(addon.id);
          const added = qty !== undefined && qty > 0;
          return (
            <AddonServiceCard
              key={addon.id}
              addon={addon}
              quantity={added ? qty : 1}
              added={added}
              onAdd={() => onAdd(addon.id)}
              onRemove={() => onRemove(addon.id)}
              onQuantityChange={(q) => onQuantityChange(addon.id, q)}
            />
          );
        })}
      </div>
    </section>
  );
}
