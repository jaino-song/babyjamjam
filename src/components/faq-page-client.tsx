"use client";

import { useCallback, useState } from "react";
import {
  Menu,
  X,
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

import { cn } from "@/lib/utils";
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
    <div className="border-b border-bjj-divider">
      <button
        className="flex items-center justify-between py-5 max-mobile:py-4 cursor-pointer w-full bg-transparent border-none text-left gap-3"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          <span
            className={cn(
              "font-number font-bold text-[11px] text-white w-6 h-6 rounded-md flex items-center justify-center shrink-0",
              isTerms ? "bg-bjj-primary" : "bg-bjj-accent",
            )}
          >
            {isTerms ? "§" : "Q"}
          </span>
          <span className="font-heading font-bold text-[15px] max-mobile:text-[14px] tracking-[-0.015em] text-bjj-text-headline">
            {item.question}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={cn(
            "text-bjj-text-muted shrink-0 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen && (
        <div className="pb-5 max-mobile:pb-4 pl-[38px] max-mobile:pl-[34px]">
          <p className="font-body font-medium text-[15px] max-mobile:text-[14px] leading-[26px] max-mobile:leading-[24px] tracking-[0.231px] text-bjj-text-paragraph">
            {item.answer}
          </p>
          {item.subItems && item.subItems.length > 0 && (
            <ul className="mt-3 pl-5 list-disc">
              {item.subItems.map((sub) => (
                <li
                  key={sub}
                  className="font-body text-[14px] leading-6 text-bjj-text-paragraph mb-1"
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

/* ---------- Main Component ---------- */

export function FaqPageClient() {
  const allCategories = FAQ_SECTIONS.flatMap((s) => s.categories);
  const [activeCategoryId, setActiveCategoryId] = useState(allCategories[0].id);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeCategory =
    allCategories.find((c) => c.id === activeCategoryId) ?? allCategories[0];
  const isTermsCategory = activeCategoryId.startsWith("terms-");

  const handleCategoryChange = useCallback((cat: FaqCategory) => {
    setActiveCategoryId(cat.id);
    setOpenItems(new Set());
    setSidebarOpen(false);
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
    <div className="flex w-full min-h-[600px] gap-12 max-mobile:flex-col max-mobile:relative max-mobile:gap-0">
      {/* Mobile hamburger */}
      <button
        className="hidden max-mobile:flex absolute top-4 left-4 z-10 w-10 h-10 rounded-[10px] border-none bg-bjj-primary text-bjj-primary-light items-center justify-center cursor-pointer"
        onClick={() => setSidebarOpen(true)}
        aria-label="메뉴 열기"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="hidden max-mobile:block fixed inset-0 z-[199] bg-black/40 backdrop-blur-[4px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "w-[280px] max-tablet:w-60 shrink-0 bg-bjj-primary py-10 max-tablet:py-8 max-tablet:px-4 flex flex-col overflow-y-auto",
          "max-mobile:hidden",
          sidebarOpen &&
            "max-mobile:!flex max-mobile:fixed max-mobile:top-0 max-mobile:left-0 max-mobile:bottom-0 max-mobile:w-[280px] max-mobile:z-[200] max-mobile:animate-[faq-slide-in_0.25s_ease-out]",
        )}
      >
        {sidebarOpen && (
          <button
            className="flex absolute top-3 right-3 left-auto w-10 h-10 rounded-[10px] border-none bg-white/15 text-bjj-primary-light items-center justify-center cursor-pointer"
            onClick={() => setSidebarOpen(false)}
            aria-label="메뉴 닫기"
          >
            <X size={20} />
          </button>
        )}

        <h2 className="font-heading font-extrabold text-[28px] max-tablet:text-[24px] text-bjj-primary-light tracking-[-0.015em] px-7 mb-2">
          도움말
        </h2>
        <p className="font-body text-[13px] text-white/50 px-7 mb-8">
          FAQ &amp; 이용약관
        </p>

        {FAQ_SECTIONS.map((section) => (
          <div key={section.id}>
            <span className="font-caption text-[9px] text-white/35 tracking-[0.1em] uppercase px-7 mb-2 mt-6 first-of-type:mt-0 block">
              {section.title}
            </span>
            {section.categories.map((cat) => {
              const IconComp = ICON_MAP[cat.icon];
              return (
                <button
                  key={cat.id}
                  className={cn(
                    "flex items-center gap-3 py-[11px] px-7 w-full font-heading font-semibold text-[14px] text-white/60 tracking-[-0.01em] bg-transparent border-none border-l-[3px] border-l-transparent cursor-pointer transition-all duration-150 text-left",
                    "hover:text-white/85 hover:bg-white/5",
                    cat.id === activeCategoryId &&
                      "text-white bg-white/10 border-l-bjj-accent font-bold",
                  )}
                  onClick={() => handleCategoryChange(cat)}
                >
                  <span className="w-5 flex items-center justify-center shrink-0">
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
      <div
        className="flex-1 flex flex-col min-w-0 animate-[faq-content-enter_0.5s_ease_both] max-tablet:px-8 max-tablet:py-6 max-mobile:px-6 max-mobile:py-5"
        key={activeCategoryId}
      >
        <header className="py-9 max-mobile:py-4 border-b border-bjj-divider flex items-center justify-between">
          <h3 className="font-heading font-extrabold text-[24px] max-tablet:text-[20px] max-mobile:text-[18px] tracking-[-0.015em]">
            {activeCategory.label}
          </h3>
          <span className="font-number font-bold text-[13px] text-bjj-text-muted bg-bjj-surface-muted py-1.5 px-3.5 rounded-full">
            {activeCategory.items.length}개 항목
          </span>
        </header>

        <div className="py-2 max-mobile:py-2 pb-12 overflow-y-auto flex-1">
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
  );
}
