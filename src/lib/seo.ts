import type { Metadata } from "next";

import type { BranchData } from "@/data/branches";
import type { FaqItem } from "@/data/faq-data";

export const SITE_URL = "https://babyjamjam.com";
export const SITE_NAME = "아가잼잼";
export const DEFAULT_SOCIAL_IMAGE = "/images/og-babyjamjam.jpg";

export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

interface PageMetadataInput {
  path: string;
  title: string;
  description: string;
}

interface ArticleJsonLdInput {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
}

export function createPageMetadata({
  path,
  title,
  description,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: DEFAULT_SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} 산후도우미 서비스`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
  };
}

export function createOrganizationJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "1661-2386",
      contactType: "customer service",
      areaServed: "KR",
      availableLanguage: "Korean",
    },
  };
}

export function createWebsiteJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "ko-KR",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function createArticleJsonLd({
  path,
  headline,
  description,
  datePublished,
  dateModified,
}: ArticleJsonLdInput): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${path}#article`,
    url: `${SITE_URL}${path}`,
    headline,
    description,
    datePublished,
    dateModified,
    inLanguage: "ko-KR",
    author: {
      "@id": `${SITE_URL}/#organization`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
  };
}

export function createServiceJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/postpartum-care#service`,
    name: "아가잼잼 산후도우미 서비스",
    alternateName: "산모·신생아 건강관리 서비스",
    serviceType: "가정방문 산후도우미 서비스",
    description:
      "산모의 회복과 신생아 돌봄을 돕는 가정방문 산후도우미 서비스입니다.",
    url: `${SITE_URL}/postpartum-care`,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: ["인천", "김포", "부천", "고양", "파주", "경산"],
  };
}

export function createBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function createFaqJsonLd(items: FaqItem[]): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [item.answer, ...(item.subItems ?? [])].join(" "),
      },
    })),
  };
}

export function createLocalBusinessJsonLd(
  branches: BranchData[],
): JsonLdValue[] {
  return branches.map((branch) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/locations#${branch.id}`,
    name: `${SITE_NAME} ${branch.name}`,
    url: `${SITE_URL}/locations`,
    telephone: branch.phone,
    description: branch.description,
    parentOrganization: {
      "@id": `${SITE_URL}/#organization`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: branch.district,
      addressRegion: branch.region,
      addressCountry: "KR",
    },
    openingHours: "Mo-Fr 09:00-18:00",
  }));
}
