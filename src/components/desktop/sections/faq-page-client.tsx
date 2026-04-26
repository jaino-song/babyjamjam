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
}: {
  item: FaqItem;
  isTerms: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="faq-accordion__item">
      <button className="faq-accordion__head" onClick={onToggle}>
        <div className="faq-accordion__left">
          <span
            className={`faq-accordion__badge${isTerms ? " faq-accordion__badge--terms" : ""}`}
          >
            {isTerms ? "§" : "Q"}
          </span>
          <span className="faq-accordion__question">{item.question}</span>
        </div>
        <ChevronDown
          size={16}
          className={`faq-accordion__chevron${isOpen ? " faq-accordion__chevron--open" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="faq-accordion__body">
          <p>{item.answer}</p>
          {item.subItems && item.subItems.length > 0 && (
            <ul>
              {item.subItems.map((sub) => (
                <li key={sub}>{sub}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export function DesktopFaqPageClient() {
  const allCategories = FAQ_SECTIONS.flatMap((s) => s.categories);
  const [activeCategoryId, setActiveCategoryId] = useState(allCategories[0].id);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

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
    <section className="faq-section">
      <div className="faq-page">
        <aside className="faq-sidebar">
          <h2 className="faq-sidebar__title">도움말</h2>
          <p className="faq-sidebar__subtitle">FAQ &amp; 이용약관</p>

          {FAQ_SECTIONS.map((section) => (
            <div key={section.id}>
              <span className="faq-sidebar__cat-label">{section.title}</span>
              {section.categories.map((cat) => {
                const IconComp = ICON_MAP[cat.icon];
                return (
                  <button
                    key={cat.id}
                    className={`faq-sidebar__nav-item${cat.id === activeCategoryId ? " faq-sidebar__nav-item--active" : ""}`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    <span className="faq-sidebar__nav-icon">
                      {IconComp && <IconComp size={16} />}
                    </span>
                    {cat.label}
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        <div className="faq-content" key={activeCategoryId}>
          <header className="faq-content__header">
            <h1 className="h1 faq-content__title">자주하는 질문</h1>
            <div className="faq-content__meta">
              <h3>{activeCategory.label}</h3>
              <span className="faq-content__count">
                {activeCategory.items.length}개 항목
              </span>
            </div>
          </header>

          <div className="faq-accordion">
            {activeCategory.items.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isTerms={isTermsCategory}
                isOpen={openItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
