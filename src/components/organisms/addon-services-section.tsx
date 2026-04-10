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
  /** Selected plan duration — used as default quantity for care group */
  planDuration?: number;
}

export function AddonServicesSection({
  addons,
  selections,
  onAdd,
  onRemove,
  onQuantityChange,
  blurred = false,
  planDuration,
}: AddonServicesSectionProps) {
  // Group addons by their group key, preserving order
  const groups: AddonData[][] = [];
  let currentGroup: string | undefined;
  for (const addon of addons) {
    if (addon.group !== currentGroup) {
      groups.push([]);
      currentGroup = addon.group;
    }
    groups[groups.length - 1].push(addon);
  }

  return (
    <section
      className={cn(
        "flex flex-col w-full gap-6",
        blurred && "!hidden",
      )}
      data-component="organism-addon-services-section"
    >
      <div className="w-full">
        <h2 className="h3-left">
          <span className="text-bjj-text-muted">
            내가 원하는 대로 선택 가능.
          </span>
          <br />
          <span className="text-bjj-primary">
            산후도우미서비스 추가 서비스
          </span>
        </h2>
      </div>

      <div className="flex flex-col gap-12 w-full">
        {groups.map((group, gi) => (
          <div key={gi} className="flex flex-col gap-4 w-full">
            {gi === 0 && (
              <p className="text-right w-full font-body font-medium text-[16px] leading-[1.5] tracking-[0.03em] text-bjj-text-paragraph">
                *모든 요금은 1인 1일 기준입니다.
              </p>
            )}
            {gi === 1 && (
              <p className="text-right w-full font-body font-medium text-[16px] leading-[1.5] tracking-[0.03em] text-bjj-text-paragraph">
                *토요일 및 공휴일 서비스는 1일 기준, 추가 시간은 1시간 기준입니다.
              </p>
            )}
            <div className="grid grid-cols-3 gap-4 w-full max-mobile:grid-cols-1">
            {group.map((addon) => {
              const qty = selections.get(addon.id);
              const added = qty !== undefined && qty > 0;
              return (
                <AddonServiceCard
                  key={addon.id}
                  addon={addon}
                  quantity={added ? qty : (addon.group === "care" && planDuration ? planDuration : 1)}
                  added={added}
                  onAdd={() => onAdd(addon.id)}
                  onRemove={() => onRemove(addon.id)}
                  onQuantityChange={(q) => onQuantityChange(addon.id, q)}
                />
              );
            })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
