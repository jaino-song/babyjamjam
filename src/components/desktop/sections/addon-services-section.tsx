"use client";

import { cn } from "@/lib/utils";
import {
  AddonServiceCard,
  type AddonData,
} from "@/components/molecules/addon-service-card";

const BREAST_PUMP_ADDON_IDS = new Set(["breast-pump", "ph-pump"]);
const BREAST_PUMP_NOTE = "유축기 대여도 걱정없이 아가잼잼에서 해결";

interface DesktopAddonServicesSectionProps {
  addons: AddonData[];
  selections: Map<string, number>;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
  blurred?: boolean;
  planDuration?: number;
  "data-component"?: string;
}

export function DesktopAddonServicesSection({
  addons,
  selections,
  onAdd,
  onRemove,
  onQuantityChange,
  blurred = false,
  planDuration,
  "data-component": dataComponent,
}: DesktopAddonServicesSectionProps) {
  const groups: AddonData[][] = [];
  let currentGroup: string | undefined;
  const getComponent = (suffix: string) =>
    dataComponent ? `${dataComponent}_${suffix}` : undefined;

  for (const addon of addons) {
    if (addon.group !== currentGroup) {
      groups.push([]);
      currentGroup = addon.group;
    }
    groups[groups.length - 1].push(addon);
  }

  return (
    <section
      className={cn("addon-services", blurred && "pricing-section--hidden")}
      data-component={dataComponent}
    >
      <div
        className="addon-services__heading"
        data-component={getComponent("heading")}
      >
        <h2
          className={cn("h2-left", "addon-services__title")}
          data-component={getComponent("title")}
        >
          <span
            className={cn("h3", "addon-services__title-muted")}
            data-component={getComponent("title-muted")}
          >
            내가 원하는 대로 선택 가능.
          </span>
          <br data-component={getComponent("title-break")} />
          <span
            className="addon-services__title-primary"
            data-component={getComponent("title-primary")}
          >
            산후도우미서비스 추가 서비스
          </span>
        </h2>
      </div>

      <div className="addon-services__groups" data-component={getComponent("groups")}>
        {groups.map((group, groupIndex) => {
          const groupBase = getComponent(`group-${groupIndex + 1}`);

          return (
          <div
            key={groupIndex}
            className="addon-services__group"
            data-component={groupBase}
          >
            {groupIndex === 0 && (
              <p
                className="addon-services__note"
                data-component={groupBase ? `${groupBase}_note` : undefined}
              >
                *모든 요금은 1인 1일 기준입니다.
              </p>
            )}
            {groupIndex === 1 && (
              <p
                className="addon-services__note"
                data-component={groupBase ? `${groupBase}_note` : undefined}
              >
                *토요일 및 공휴일 서비스는 1일 기준,
                <br
                  data-component={groupBase ? `${groupBase}_note-break` : undefined}
                />
                추가 시간은 1시간 기준입니다.
              </p>
            )}
            <div
              className="addon-services__list"
              data-component={groupBase ? `${groupBase}_list` : undefined}
            >
              {group.map((addon, addonIndex) => {
                const quantity = selections.get(addon.id);
                const added = quantity !== undefined && quantity > 0;
                const displayedAddon = {
                  ...addon,
                  note: BREAST_PUMP_ADDON_IDS.has(addon.id)
                    ? BREAST_PUMP_NOTE
                    : addon.note,
                };

                return (
                  <AddonServiceCard
                    key={addon.id}
                    addon={displayedAddon}
                    quantity={
                      added
                        ? quantity
                        : addon.group === "care" && planDuration
                          ? planDuration
                          : 1
                    }
                    added={added}
                    onAdd={() => onAdd(addon.id)}
                    onRemove={() => onRemove(addon.id)}
                    onQuantityChange={(nextQuantity) =>
                      onQuantityChange(addon.id, nextQuantity)
                    }
                    data-component={
                      groupBase ? `${groupBase}_card-${addonIndex + 1}` : undefined
                    }
                  />
                );
              })}
            </div>
          </div>
        );
        })}
      </div>
    </section>
  );
}
