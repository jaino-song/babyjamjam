"use client";

import { useCallback, useState } from "react";
import {
  ChevronDown,
  MessageCircle,
  CalendarDays,
  Heart,
  HelpCircle,
  BookOpen,
  FileCheck,
  CreditCard,
  Handshake,
  Building2,
  Shield,
  Scale,
} from "lucide-react";

import { FAQ_SECTIONS, type FaqCategory, type FaqItem } from "@/data/faq-data";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  MessageCircle,
  CalendarDays,
  Heart,
  HelpCircle,
  BookOpen,
  FileCheck,
  CreditCard,
  Handshake,
  Building2,
  Shield,
  Scale,
};

function AccordionItem({
  item,
  isTerms,
  isOpen,
  onToggle,
  "data-component": dataComponent,
}: {
  item: FaqItem;
  isTerms: boolean;
  isOpen: boolean;
  onToggle: () => void;
  "data-component"?: string;
}) {
  const getComponent = (suffix: string) =>
    dataComponent ? `${dataComponent}_${suffix}` : undefined;

  return (
    <div className="faq-accordion__item" data-component={dataComponent}>
      <button
        className="faq-accordion__head"
        onClick={onToggle}
        data-component={getComponent("head")}
      >
        <div
          className="faq-accordion__left"
          data-component={getComponent("left")}
        >
          <span
            className={`faq-accordion__badge${isTerms ? " faq-accordion__badge--terms" : ""}`}
            data-component={getComponent("badge")}
          >
            {isTerms ? "§" : "Q"}
          </span>
          <span
            className="faq-accordion__question"
            data-component={getComponent("question")}
          >
            {item.question}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={`faq-accordion__chevron${isOpen ? " faq-accordion__chevron--open" : ""}`}
          data-component={getComponent("chevron")}
        />
      </button>
      {isOpen && (
        <div
          className="faq-accordion__body"
          data-component={getComponent("body")}
        >
          <p data-component={getComponent("answer")}>{item.answer}</p>
          {item.subItems && item.subItems.length > 0 && (
            <ul data-component={getComponent("sub-items")}>
              {item.subItems.map((sub, index) => (
                <li
                  key={sub}
                  data-component={getComponent(`sub-item-${index + 1}`)}
                >
                  {sub}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

interface DesktopFaqPageClientProps {
  "data-component"?: string;
}

export function DesktopFaqPageClient({
  "data-component": dataComponent,
}: DesktopFaqPageClientProps) {
  const allCategories = FAQ_SECTIONS.flatMap((s) => s.categories);
  const [activeCategoryId, setActiveCategoryId] = useState(allCategories[0].id);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const getComponent = (suffix: string) =>
    dataComponent ? `${dataComponent}_${suffix}` : undefined;

  const activeCategory =
    allCategories.find((c) => c.id === activeCategoryId) ?? allCategories[0];
  const isTermsCategory = activeCategoryId.startsWith("terms-");

  const handleCategoryChange = useCallback((cat: FaqCategory) => {
    setActiveCategoryId(cat.id);
    setOpenItems(new Set());
  }, []);

  const toggleItem = useCallback((itemId: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  }, []);

  return (
    <section className="faq-section" data-component={dataComponent}>
      <div className="faq-page" data-component={getComponent("page")}>
        <aside className="faq-sidebar" data-component={getComponent("sidebar")}>
          <h2
            className="faq-sidebar__title"
            data-component={getComponent("sidebar-title")}
          >
            도움말
          </h2>
          <p
            className="faq-sidebar__subtitle"
            data-component={getComponent("sidebar-subtitle")}
          >
            FAQ &amp; 이용약관
          </p>

          {FAQ_SECTIONS.map((section) => (
            <div
              key={section.id}
              data-component={getComponent(`sidebar-section-${section.id}`)}
            >
              <span
                className="faq-sidebar__cat-label"
                data-component={getComponent(
                  `sidebar-section-${section.id}-label`,
                )}
              >
                {section.title}
              </span>
              {section.categories.map((cat) => {
                const IconComp = ICON_MAP[cat.icon];
                return (
                  <button
                    key={cat.id}
                    className={`faq-sidebar__nav-item${cat.id === activeCategoryId ? " faq-sidebar__nav-item--active" : ""}`}
                    onClick={() => handleCategoryChange(cat)}
                    data-component={getComponent(`sidebar-category-${cat.id}`)}
                  >
                    <span
                      className="faq-sidebar__nav-icon"
                      data-component={getComponent(`sidebar-category-${cat.id}-icon`)}
                    >
                      {IconComp && (
                        <IconComp
                          size={16}
                          data-component={getComponent(
                            `sidebar-category-${cat.id}-icon-svg`,
                          )}
                        />
                      )}
                    </span>
                    {cat.label}
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        <div
          className="faq-content"
          key={activeCategoryId}
          data-component={getComponent("content")}
        >
          <header
            className="faq-content__header"
            data-component={getComponent("content-header")}
          >
            <h1
              className="h1 faq-content__title"
              data-component={getComponent("content-title")}
            >
              자주하는 질문
            </h1>
            <div
              className="faq-content__meta"
              data-component={getComponent("content-meta")}
            >
              <h3 data-component={getComponent("content-category-label")}>
                {activeCategory.label}
              </h3>
              <span
                className="faq-content__count"
                data-component={getComponent("content-count")}
              >
                {activeCategory.items.length}개 항목
              </span>
            </div>
          </header>

          <div
            className="faq-accordion"
            data-component={getComponent("accordion")}
          >
            {activeCategory.items.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                isTerms={isTermsCategory}
                isOpen={openItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
                data-component={getComponent(`item-${index + 1}-${item.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
