import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DesktopFooter } from "@/components/desktop/sections/footer";
import { MobileFooter } from "@/components/mobile/sections/footer";
import { GuideArticle } from "@/components/seo/guide-pages";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getPostpartumGuide,
  POSTPARTUM_GUIDES,
} from "@/data/guide-data";
import { getDevice } from "@/lib/device";
import {
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  createPageMetadata,
} from "@/lib/seo";

interface GuideDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return POSTPARTUM_GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: GuideDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getPostpartumGuide(slug);

  if (!guide) {
    return {};
  }

  return createPageMetadata({
    path: `/guides/${guide.slug}`,
    title: guide.shortTitle,
    description: guide.description,
  });
}

export default async function GuideDetailPage({
  params,
}: GuideDetailPageProps) {
  const { slug } = await params;
  const guide = getPostpartumGuide(slug);

  if (!guide) {
    notFound();
  }

  const device = await getDevice();
  const isMobile = device === "mobile";
  const path = `/guides/${guide.slug}`;

  return (
    <>
      <JsonLd
        data={[
          createArticleJsonLd({
            path,
            headline: guide.title,
            description: guide.description,
            datePublished: "2026-07-28",
            dateModified: guide.reviewedAt,
          }),
          createFaqJsonLd(guide.faqs),
          createBreadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "산후도우미 가이드", path: "/guides" },
            { name: guide.shortTitle, path },
          ]),
        ]}
      />
      <GuideArticle
        guide={guide}
        variant={device}
        data-component={`${device}_guide_${guide.slug}`}
      />
      {isMobile ? (
        <MobileFooter
          data-component={`mobile_guide_${guide.slug}_footer-section`}
        />
      ) : (
        <DesktopFooter
          data-component={`desktop_guide_${guide.slug}_footer-section`}
        />
      )}
    </>
  );
}
