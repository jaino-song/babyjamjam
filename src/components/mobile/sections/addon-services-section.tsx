"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import {
  AddonServiceCard,
  type AddonData,
} from "@/components/molecules/addon-service-card";
import { GalleryPaddlenav } from "@/components/ui/gallery-paddlenav";

interface MobileAddonServicesSectionProps {
  addons: AddonData[];
  selections: Map<string, number>;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
  blurred?: boolean;
  planDuration?: number;
}

export function MobileAddonServicesSection({
  addons,
  selections,
  onAdd,
  onRemove,
  onQuantityChange,
  blurred = false,
  planDuration,
}: MobileAddonServicesSectionProps) {
  const groups: AddonData[][] = [];
  let currentGroup: string | undefined;

  for (const addon of addons) {
    if (addon.group !== currentGroup) {
      groups.push([]);
      currentGroup = addon.group;
    }
    groups[groups.length - 1].push(addon);
  }

  const groupRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [mobileGroupIndices, setMobileGroupIndices] = useState<number[]>(
    () => groups.map(() => 0)
  );

  useEffect(() => {
    setMobileGroupIndices((current) =>
      groups.map((_, index) => current[index] ?? 0)
    );
  }, [groups.length]);

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    groups.forEach((group, groupIndex) => {
      const list = groupRefs.current[groupIndex];
      if (!list) {
        return;
      }

      let frameId = 0;

      const updateIndex = () => {
        const cards = Array.from(list.children) as HTMLElement[];
        if (!cards.length) {
          setMobileGroupIndices((current) => {
            const next = [...current];
            next[groupIndex] = 0;
            return next;
          });
          return;
        }

        const listRect = list.getBoundingClientRect();
        const listCenter = listRect.left + listRect.width / 2;
        let nearestIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const center = rect.left + rect.width / 2;
          const distance = Math.abs(center - listCenter);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });

        setMobileGroupIndices((current) => {
          const next = [...current];
          next[groupIndex] = nearestIndex;
          return next;
        });
      };

      const requestUpdate = () => {
        if (frameId) {
          return;
        }

        frameId = window.requestAnimationFrame(() => {
          frameId = 0;
          updateIndex();
        });
      };

      updateIndex();
      list.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate, { passive: true });

      cleanups.push(() => {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
        }
        list.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [groups.length]);

  const scrollAddonGroup = (groupIndex: number, direction: -1 | 1) => {
    const list = groupRefs.current[groupIndex];
    if (!list) {
      return;
    }

    const cards = Array.from(list.children) as HTMLElement[];
    if (!cards.length) {
      return;
    }

    const currentIndex = mobileGroupIndices[groupIndex] ?? 0;
    const nextIndex = Math.max(
      0,
      Math.min(cards.length - 1, currentIndex + direction)
    );
    const nextCard = cards[nextIndex];

    nextCard?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });

    setMobileGroupIndices((current) => {
      const next = [...current];
      next[groupIndex] = nextIndex;
      return next;
    });
  };

  return (
    <section
      className={cn("addon-services", blurred && "pricing-section--hidden")}
      data-component="organism-addon-services-section"
    >
      <div className="addon-services__heading">
        <h2 className={cn("h2-left", "addon-services__title")}>
          <span className="addon-services__title-muted">
            내가 원하는 대로 선택 가능.
          </span>
          <br />
          <span className="addon-services__title-primary">
            산후도우미서비스 추가 서비스
          </span>
        </h2>
      </div>

      <div className="addon-services__groups">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="addon-services__group">
            {groupIndex === 0 && (
              <p className="addon-services__note">
                *모든 요금은 1인 1일 기준입니다.
              </p>
            )}
            {groupIndex === 1 && (
              <p className="addon-services__note">
                *토요일 및 공휴일 서비스는 1일 기준,
                <br />
                추가 시간은 1시간 기준입니다.
              </p>
            )}
            <div
              className="addon-services__list"
              ref={(node) => {
                groupRefs.current[groupIndex] = node;
              }}
            >
              {group.map((addon) => {
                const quantity = selections.get(addon.id);
                const added = quantity !== undefined && quantity > 0;

                return (
                  <AddonServiceCard
                    key={addon.id}
                    addon={addon}
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
                  />
                );
              })}
            </div>
            <GalleryPaddlenav
              className="addon-services__paddlenav"
              previousLabel="이전 추가 서비스"
              nextLabel="다음 추가 서비스"
              previousDisabled={(mobileGroupIndices[groupIndex] ?? 0) === 0}
              nextDisabled={(mobileGroupIndices[groupIndex] ?? 0) === group.length - 1}
              onPrevious={() => scrollAddonGroup(groupIndex, -1)}
              onNext={() => scrollAddonGroup(groupIndex, 1)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
