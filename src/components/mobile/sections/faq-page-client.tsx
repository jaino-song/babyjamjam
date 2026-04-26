"use client";

import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";

import { FAQ_SECTIONS, type FaqCategory, type FaqItem } from "@/data/faq-data";

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

export function MobileFaqPageClient() {
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

      <div className="faq-mobile-menu">
        <div className="faq-mobile-select-wrap">
          <select
            className="faq-mobile-select"
            value={activeCategoryId}
            onChange={(event) => {
              const cat = allCategories.find(
                (item) => item.id === event.target.value,
              );
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
        <div className="faq-content" key={activeCategoryId}>
          <header className="faq-content__header">
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
