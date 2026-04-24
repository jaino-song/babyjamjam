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

/* ---------- Accordion Item ---------- */

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

/* ---------- Main Component ---------- */

export function FaqPageClient() {
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
      <h1 className="h1 faq-mobile-title">자주하는 질문</h1>

      {/* Mobile select */}
      <div className="faq-mobile-menu">
        <div className="faq-mobile-select-wrap">
          <select
            className="faq-mobile-select"
            value={activeCategoryId}
            onChange={(event) => {
              const cat = allCategories.find((item) => item.id === event.target.value);
              if (cat) handleCategoryChange(cat);
            }}
            aria-label="FAQ 카테고리 선택"
          >
            {FAQ_SECTIONS.map((section) => (
              <optgroup key={section.id} label={section.title}>
                {section.categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      <div className="faq-page">
      {/* Sidebar */}
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

      {/* Content */}
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
