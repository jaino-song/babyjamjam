"use client";

import { useMemo, useState, useCallback } from "react";

import { MobileBookingModal as BookingModal } from "@/components/mobile/chrome/booking-modal";
import { MobileFooter as Footer } from "@/components/mobile/sections/footer";
import { KoreaRegionMap } from "@/components/korea-region-map";
import { Badge } from "@/components/ui/badge";
import { PillCta } from "@/components/ui/circle-cta";
import { BRANCHES } from "@/data/branches";

export default function MobileLocationsPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingRegion, setBookingRegion] = useState<string | null>(null);
  const [bookingDistrict, setBookingDistrict] = useState<string | null>(null);
  const [bookingBranchSlug, setBookingBranchSlug] = useState<string | null>(
    null
  );

  const availableRegions = useMemo(
    () => new Set(["인천", "경기도", "경북"]),
    []
  );

  const filtered = selectedRegion
    ? BRANCHES.filter((branch) => branch.region === selectedRegion)
    : BRANCHES;

  const handleRegionSelect = useCallback((region: string | null) => {
    setSelectedRegion(region);
  }, []);

  return (
    <>
      <main
        className="location-main"
        data-component="mobile_locations_page-main"
      >
        <section
          className="location-hero"
          data-component="mobile_locations_page_hero_section"
        >
          <h1
            className="h1 location-hero__title"
            data-component="mobile_locations_page_hero_title"
          >
            지점 찾기
          </h1>
          <p
            className="big-p location-hero__subtitle"
            data-component="mobile_locations_page_hero_subtitle"
          >
            지도에서 지역을 클릭하면 해당 지점을 바로 확인할 수 있어요.
          </p>
        </section>

        <div
          className="location-split"
          data-component="mobile_locations_page_split"
        >
          <div
            className="location-map"
            data-component="mobile_locations_page_map"
          >
            <KoreaRegionMap
              availableRegions={availableRegions}
              selectedRegion={selectedRegion}
              onRegionSelect={handleRegionSelect}
              data-component="mobile_locations_page_korea-region-map"
            />
          </div>

          <aside
            className="location-sidebar"
            data-component="mobile_locations_page_sidebar"
          >
            <div
              className="location-sidebar__header"
              data-component="mobile_locations_page_sidebar_header"
            >
              <h2
                className="h6 location-sidebar__title"
                data-component="mobile_locations_page_sidebar_title"
              >
                {selectedRegion ? `${selectedRegion} 지점` : "전체 지점"}
              </h2>
              <span
                className="small-p location-sidebar__count"
                data-component="mobile_locations_page_sidebar_count"
              >
                {filtered.length}개
              </span>
            </div>

            {selectedRegion && (
              <button
                className="medium-p location-sidebar__reset"
                onClick={() => setSelectedRegion(null)}
                data-component="mobile_locations_page_sidebar_reset"
              >
                ← 전체 지점 보기
              </button>
            )}

            <ul
              className="location-list"
              data-component="mobile_locations_page_branch_list"
            >
              {filtered.map((branch) => (
                <li
                  key={branch.id}
                  className="location-list__item"
                  data-component={`mobile_locations_page_branch_${branch.id}`}
                >
                  <div
                    className="location-list__item-content"
                    data-component={`mobile_locations_page_branch_${branch.id}_content`}
                  >
                    <div
                      className="location-list__top"
                      data-component={`mobile_locations_page_branch_${branch.id}_top`}
                    >
                      <Badge
                        tone={branch.type === "direct" ? "primary" : "green"}
                        data-component={`mobile_locations_page_branch_${branch.id}_badge`}
                      >
                        {branch.type === "direct" ? "직영점" : "가맹점"}
                      </Badge>
                      <h3
                        className="h5 location-list__name"
                        data-component={`mobile_locations_page_branch_${branch.id}_name`}
                      >
                        {branch.name}
                      </h3>
                    </div>
                    <p
                      className="medium-p location-list__address"
                      data-component={`mobile_locations_page_branch_${branch.id}_address`}
                    >
                      {branch.address}
                    </p>
                    <div
                      className="location-list__meta"
                      data-component={`mobile_locations_page_branch_${branch.id}_meta`}
                    >
                      <a
                        href={`tel:${branch.phone}`}
                        className="medium-p location-list__phone"
                        data-component={`mobile_locations_page_branch_${branch.id}_phone`}
                      >
                        {branch.phone}
                      </a>
                    </div>
                  </div>
                  <PillCta
                    data-component="mobile_locations_page_booking_cta"
                    onClick={(event) => {
                      event.stopPropagation();
                      setBookingRegion(branch.region);
                      setBookingDistrict(branch.district);
                      setBookingBranchSlug(branch.id);
                      setBookingOpen(true);
                    }}
                  >
                    상담 신청
                  </PillCta>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>

      <Footer data-component="mobile_locations_footer-section" />

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialRegion={bookingRegion}
        initialDistrict={bookingDistrict}
        initialBranchSlug={bookingBranchSlug}
        data-component="mobile_locations_booking-modal"
      />
    </>
  );
}
