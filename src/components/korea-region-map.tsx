"use client";

import { useRef, useEffect, useCallback, useState, useImperativeHandle, forwardRef } from "react";
import * as d3 from "d3";

// ===== URLs =====
const PROVINCE_URL =
  "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2013/json/skorea_provinces_geo_simple.json";
const MUNICIPALITY_URL =
  "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2013/json/skorea_municipalities_geo_simple.json";

// ===== Labels =====
const SHORT_LABELS: Record<string, string> = {
  서울특별시: "서울",
  부산광역시: "부산",
  대구광역시: "대구",
  인천광역시: "인천",
  광주광역시: "광주",
  대전광역시: "대전",
  울산광역시: "울산",
  세종특별자치시: "세종",
  경기도: "경기도",
  강원도: "강원도",
  충청북도: "충북",
  충청남도: "충남",
  전라북도: "전북",
  전라남도: "전남",
  경상북도: "경북",
  경상남도: "경남",
  제주특별자치도: "제주",
};

const PROVINCE_CODE_MAP: Record<string, string> = {
  서울특별시: "11",
  부산광역시: "21",
  대구광역시: "22",
  인천광역시: "23",
  광주광역시: "24",
  대전광역시: "25",
  울산광역시: "26",
  세종특별자치시: "29",
  경기도: "31",
  강원도: "32",
  충청북도: "33",
  충청남도: "34",
  전라북도: "35",
  전라남도: "36",
  경상북도: "37",
  경상남도: "38",
  제주특별자치도: "39",
};

// ===== Available municipalities per province =====
const AVAILABLE_MUNICIPALITIES: Record<string, "all" | Set<string>> = {
  "11": "all", // 서울 모든 구
  "23": "all", // 인천 모든 구/군
  "31": new Set(["31051", "31052", "31053", "31101", "31103", "31104", "31200"]),
  // 부천(원미/소사/오정), 고양(덕양/일산동/일산서), 파주
  "37": new Set(["37100"]), // 경산시
};

const DISPLAY_NAMES: Record<string, string> = {
  고양시일산동구: "일산동구",
  고양시일산서구: "일산서구",
  고양시덕양구: "덕양구",
  부천시원미구: "원미구",
  부천시소사구: "소사구",
  부천시오정구: "오정구",
  남구: "미추홀구",
};

// City groupings: provinces where municipalities drill into cities first, then districts
const CITY_GROUPS: Record<string, Record<string, string[]>> = {
  "31": { // 경기도
    "부천시": ["31051", "31052", "31053"],
    "고양파주": ["31101", "31103", "31104", "31200"],
  },
};

function findCityForCode(provCode: string, muniCode: string): string | null {
  const groups = CITY_GROUPS[provCode];
  if (!groups) return null;
  for (const [city, codes] of Object.entries(groups)) {
    if (codes.includes(muniCode)) return city;
  }
  return null;
}

function isCityAvailable(provCode: string, cityName: string): boolean {
  const availSet = AVAILABLE_MUNICIPALITIES[provCode];
  const groups = CITY_GROUPS[provCode];
  if (!groups || !groups[cityName]) return false;
  return groups[cityName].some(code => isMuniAvailable(code, availSet));
}

// ===== Filters =====
const EXCLUDED_PROVINCES = new Set(["제주특별자치도"]);
const EXCLUDED_MUNICIPALITIES = new Set(["23320", "23310", "37430"]); // 옹진군, 강화군, 울릉군
const KEEP_PARTS: Record<string, number[]> = { "23010": [1, 2] }; // 인천 중구: 내륙+영종도

const W = 580;
const H = 580;
const PAD = 20;

/* eslint-disable @typescript-eslint/no-explicit-any */

function stripIslands(geojson: any): any {
  const groups: Record<string, any[]> = {};
  for (const f of geojson.features) {
    const prefix = (f.properties.code ?? "").slice(0, 2);
    (groups[prefix] ||= []).push(f);
  }

  const mainlandCenters: Record<string, [number, number] | null> = {};
  for (const [prefix, features] of Object.entries(groups)) {
    const singles = features.filter((f: any) => f.geometry.type === "Polygon");
    if (singles.length === 0) { mainlandCenters[prefix] = null; continue; }
    let sumX = 0, sumY = 0, count = 0;
    for (const f of singles) {
      for (const [x, y] of f.geometry.coordinates[0]) { sumX += x; sumY += y; count++; }
    }
    mainlandCenters[prefix] = [sumX / count, sumY / count];
  }

  return {
    ...geojson,
    features: geojson.features.map((f: any) => {
      if (f.geometry.type !== "MultiPolygon") return f;
      const code = f.properties.code ?? "";
      if (KEEP_PARTS[code]) {
        const indices = KEEP_PARTS[code];
        return { ...f, geometry: { type: "MultiPolygon", coordinates: indices.map((i: number) => f.geometry.coordinates[i]) } };
      }
      const prefix = code.slice(0, 2);
      const center = mainlandCenters[prefix];
      const coords = f.geometry.coordinates;
      let bestIdx = 0;
      if (center) {
        let bestDist = Infinity;
        coords.forEach((poly: any, i: number) => {
          const ring = poly[0];
          let cx = 0, cy = 0;
          for (const [x, y] of ring) { cx += x; cy += y; }
          cx /= ring.length; cy /= ring.length;
          const dist = (cx - center[0]) ** 2 + (cy - center[1]) ** 2;
          if (dist < bestDist) { bestDist = dist; bestIdx = i; }
        });
      } else {
        let maxArea = -1;
        coords.forEach((poly: any, i: number) => {
          const ring = poly[0];
          let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
          for (const [x, y] of ring) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
          const area = (maxX - minX) * (maxY - minY);
          if (area > maxArea) { maxArea = area; bestIdx = i; }
        });
      }
      return { ...f, geometry: { type: "Polygon", coordinates: coords[bestIdx] } };
    }),
  };
}

function isMuniAvailable(code: string, availSet: "all" | Set<string> | undefined): boolean {
  if (availSet === "all") return true;
  if (!availSet) return false;
  return availSet.has(code);
}

/* eslint-enable @typescript-eslint/no-explicit-any */

// ===== Component types =====
export type MapView = "provinces" | "cities" | "municipalities";

export interface BreadcrumbPart {
  label: string;
  action?: () => void;
}

export interface KoreaRegionMapHandle {
  goBack: () => void;
  reset: () => void;
}

/** Highlight a specific municipality on the province-level map */
export type MunicipalityPin = {
  code: string;
  label: string;
  /** Region short name for filtering (e.g. "경북") */
  region: string;
};

type Props = {
  "data-component"?: string;
  availableRegions: Set<string>;
  /** Specific municipalities to highlight on the province map (instead of whole province) */
  municipalityPins?: MunicipalityPin[];
  /** Simple mode: called when a province is clicked (toggle). Used by branches page. */
  selectedRegion?: string | null;
  onRegionSelect?: (region: string | null) => void;
  /** Drill-down mode: called when navigating provinces → municipalities → form */
  onBreadcrumbChange?: (parts: BreadcrumbPart[]) => void;
  onShowBack?: (show: boolean) => void;
  onMunicipalitySelect?: (province: string, municipality: string) => void;
};

export const KoreaRegionMap = forwardRef<KoreaRegionMapHandle, Props>(
  function KoreaRegionMap({ "data-component": dataComponent, availableRegions, municipalityPins, selectedRegion, onRegionSelect, onBreadcrumbChange, onShowBack, onMunicipalitySelect }, ref) {
    const isSimpleMode = !!onRegionSelect;
    const svgRef = useRef<SVGSVGElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const provincesRef = useRef<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const municipalitiesRef = useRef<any>(null);
    const [currentView, setCurrentView] = useState<MapView>("provinces");
    const currentProvinceRef = useRef<string | null>(null);
    const currentCityRef = useRef<string | null>(null);

    const showTooltip = useCallback((pathEl: SVGPathElement, text: string) => {
      const tip = tooltipRef.current;
      const svgEl = svgRef.current;
      const container = svgEl?.closest(".krm") as HTMLElement | null;
      if (!tip || !svgEl || !container) return;
      const bbox = pathEl.getBBox();
      const ctm = svgEl.getScreenCTM();
      if (!ctm) return;
      const pt = svgEl.createSVGPoint();
      pt.x = bbox.x + bbox.width / 2;
      pt.y = bbox.y;
      const screenPt = pt.matrixTransform(ctm);
      const containerRect = container.getBoundingClientRect();
      tip.textContent = text;
      tip.style.opacity = "1";
      tip.style.left = screenPt.x - containerRect.left - tip.offsetWidth / 2 + "px";
      tip.style.top = screenPt.y - containerRect.top - tip.offsetHeight - 8 + "px";
    }, []);

    const hideTooltip = useCallback(() => {
      const tip = tooltipRef.current;
      if (tip) tip.style.opacity = "0";
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderProvinces = useCallback((geo: any) => {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const features = geo.features.filter((f: any) => !EXCLUDED_PROVINCES.has(f.properties.name));
      const mainlandGeo = { type: "FeatureCollection", features };
      const projection = d3.geoMercator().fitExtent([[PAD, PAD], [W - PAD, H - PAD]], mainlandGeo as d3.ExtendedFeatureCollection);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const path = d3.geoPath().projection(projection) as any;

      svg.selectAll(".krm-province")
        .data(features)
        .enter()
        .append("path")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("d", path)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("class", (d: any) => {
          const short = SHORT_LABELS[d.properties.name] || d.properties.name;
          const avail = availableRegions.has(short);
          const selected = isSimpleMode && selectedRegion === short;
          return [
            "krm-province",
            avail ? "krm-province--available" : "krm-province--unavailable",
            selected ? "krm-province--selected" : "",
          ].filter(Boolean).join(" ");
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("role", (d: any) => availableRegions.has(SHORT_LABELS[d.properties.name] || d.properties.name) ? "button" : null)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("tabindex", (d: any) => availableRegions.has(SHORT_LABELS[d.properties.name] || d.properties.name) ? 0 : null)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("aria-label", (d: any) => SHORT_LABELS[d.properties.name] || d.properties.name)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("data-component", (d: any) =>
          dataComponent
            ? `${dataComponent}_province-${(d.properties.code ?? PROVINCE_CODE_MAP[d.properties.name]).toLowerCase()}`
            : null
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on("mouseenter", function (_event: any, d: any) {
          const short = SHORT_LABELS[d.properties.name] || d.properties.name;
          if (!availableRegions.has(short)) return;
          showTooltip(this, short);
        })
        .on("mouseleave", hideTooltip)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on("click", (_event: any, d: any) => {
          const name = d.properties.name;
          const short = SHORT_LABELS[name] || name;
          if (!availableRegions.has(short)) return;
          if (isSimpleMode) {
            onRegionSelect(selectedRegion === short ? null : short);
          } else {
            const provCode = PROVINCE_CODE_MAP[name];
            if (CITY_GROUPS[provCode]) {
              drillToCities(name);
            } else {
              drillToMunicipalities(name);
            }
          }
        });

      // Overlay municipality pins on top of province map
      if (municipalityPins?.length && municipalitiesRef.current) {
        const muniGeo = municipalitiesRef.current;
        const pinCodes = new Set(municipalityPins.map((p) => p.code));
        const pinMap = new Map(municipalityPins.map((p) => [p.code, p]));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pinFeatures = muniGeo.features.filter((f: any) => pinCodes.has(f.properties.code));

        svg.selectAll(".krm-pin")
          .data(pinFeatures)
          .enter()
          .append("path")
          .attr("d", path)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .attr("data-component", (d: any) =>
            dataComponent ? `${dataComponent}_municipality-${d.properties.code}` : null
          )
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .attr("class", (d: any) => {
            const pin = pinMap.get(d.properties.code);
            const selected = isSimpleMode && pin && selectedRegion === pin.region;
            return [
              "krm-province krm-province--available",
              selected ? "krm-province--selected" : "",
            ].filter(Boolean).join(" ");
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .on("mouseenter", function (_event: any, d: any) {
            const pin = pinMap.get(d.properties.code);
            if (pin) showTooltip(this, pin.label);
          })
          .on("mouseleave", hideTooltip)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .on("click", (_event: any, d: any) => {
            const pin = pinMap.get(d.properties.code);
            if (!pin) return;
            if (isSimpleMode) {
              onRegionSelect(selectedRegion === pin.region ? null : pin.region);
            }
          });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [availableRegions, dataComponent, municipalityPins, selectedRegion, isSimpleMode, onRegionSelect, showTooltip,hideTooltip]);

    const drillToMunicipalities = useCallback((provinceName: string) => {
      const muniGeo = municipalitiesRef.current;
      if (!muniGeo) return;

      currentProvinceRef.current = provinceName;
      setCurrentView("municipalities");
      onShowBack?.(true);

      const shortProv = SHORT_LABELS[provinceName] || provinceName;
      onBreadcrumbChange?.([
        { label: "대한민국", action: () => goToProvinces() },
        { label: shortProv },
      ]);

      const provCode = PROVINCE_CODE_MAP[provinceName];
      const availSet = AVAILABLE_MUNICIPALITIES[provCode];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const features = muniGeo.features.filter((f: any) =>
        f.properties.code.startsWith(provCode) && !EXCLUDED_MUNICIPALITIES.has(f.properties.code)
      );

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const tempGeo = { type: "FeatureCollection", features };
      const projection = d3.geoMercator().fitExtent([[40, 40], [W - 40, H - 40]], tempGeo as d3.ExtendedFeatureCollection);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const path = d3.geoPath().projection(projection) as any;

      svg.selectAll(".krm-muni")
        .data(features)
        .enter()
        .append("path")
        .attr("d", path)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("data-component", (d: any) =>
          dataComponent ? `${dataComponent}_municipality-${d.properties.code}` : null
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("class", (d: any) => {
          const avail = isMuniAvailable(d.properties.code, availSet);
          return `krm-muni ${avail ? "krm-muni--available" : "krm-muni--unavailable"}`;
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on("mouseenter", function (_event: any, d: any) {
          const avail = isMuniAvailable(d.properties.code, availSet);
          if (!avail) return;
          const name = DISPLAY_NAMES[d.properties.name] || d.properties.name;
          showTooltip(this, name);
        })
        .on("mouseleave", hideTooltip)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on("click", (_event: any, d: any) => {
          const avail = isMuniAvailable(d.properties.code, availSet);
          if (!avail) return;
          const displayName = DISPLAY_NAMES[d.properties.name] || d.properties.name;
          onMunicipalitySelect?.(shortProv, displayName);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataComponent, showTooltip,hideTooltip, onBreadcrumbChange, onShowBack, onMunicipalitySelect]);

    const drillToCities = useCallback((provinceName: string) => {
      const muniGeo = municipalitiesRef.current;
      if (!muniGeo) return;

      currentProvinceRef.current = provinceName;
      currentCityRef.current = null;
      setCurrentView("cities");
      onShowBack?.(true);

      const shortProv = SHORT_LABELS[provinceName] || provinceName;
      onBreadcrumbChange?.([
        { label: "대한민국", action: () => goToProvinces() },
        { label: shortProv },
      ]);

      const provCode = PROVINCE_CODE_MAP[provinceName];
      const availSet = AVAILABLE_MUNICIPALITIES[provCode];

      // Get ALL municipalities in this province
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const allFeatures = muniGeo.features.filter((f: any) =>
        f.properties.code.startsWith(provCode) && !EXCLUDED_MUNICIPALITIES.has(f.properties.code)
      );

      // Derive city name: "부천시원미구" → "부천시", "파주시" → "파주시", "양평군" → "양평군"
      const deriveCityName = (muniName: string): string => {
        const m = muniName.match(/^(.+?[시군])/);
        return m ? m[1] : muniName;
      };

      // Group features by city (CITY_GROUPS overrides derived name so merged cities like 고양파주 render as one)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cityMap: Record<string, any[]> = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const f of allFeatures) {
        const city = findCityForCode(provCode, f.properties.code) ?? deriveCityName(f.properties.name);
        (cityMap[city] ||= []).push(f);
      }

      // Build one merged feature per city
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cityFeatures: any[] = [];

      for (const [cityName, feats] of Object.entries(cityMap)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const codes: string[] = feats.map((f: any) => f.properties.code);
        const avail = codes.some(c => isMuniAvailable(c, availSet));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mergedCoords: any[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (const f of feats) {
          if (f.geometry.type === "Polygon") mergedCoords.push(f.geometry.coordinates);
          else if (f.geometry.type === "MultiPolygon") mergedCoords.push(...f.geometry.coordinates);
        }

        cityFeatures.push({
          type: "Feature",
          properties: { name: cityName, codes, available: avail },
          geometry: { type: "MultiPolygon", coordinates: mergedCoords },
        });
      }

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const tempGeo = { type: "FeatureCollection", features: allFeatures };
      const projection = d3.geoMercator().fitExtent([[40, 40], [W - 40, H - 40]], tempGeo as d3.ExtendedFeatureCollection);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pathGen = d3.geoPath().projection(projection) as any;

      svg.selectAll(".krm-city")
        .data(cityFeatures)
        .enter()
        .append("path")
        .attr("d", pathGen)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("data-component", (d: any) =>
          dataComponent && Array.isArray(d.properties.codes) && d.properties.codes.length > 0
            ? `${dataComponent}_city-${d.properties.codes[0]}`
            : null
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("class", (d: any) =>
          `krm-city ${d.properties.available ? "krm-city--available" : "krm-city--unavailable"}`
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on("mouseenter", function (_event: any, d: any) {
          if (!d.properties.available) return;
          d3.select(this).classed("krm-city--hover", true);
          showTooltip(this, d.properties.name);
        })
        .on("mouseleave", function () {
          d3.select(this).classed("krm-city--hover", false);
          hideTooltip();
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on("click", (_event: any, d: any) => {
          if (!d.properties.available) return;
          onMunicipalitySelect?.(shortProv, d.properties.name);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataComponent, showTooltip,hideTooltip, onBreadcrumbChange, onShowBack, onMunicipalitySelect]);

    const goToProvinces = useCallback(() => {
      currentProvinceRef.current = null;
      currentCityRef.current = null;
      setCurrentView("provinces");
      onShowBack?.(false);
      onBreadcrumbChange?.([{ label: "대한민국" }]);
      if (provincesRef.current) renderProvinces(provincesRef.current);
    }, [onShowBack, onBreadcrumbChange, renderProvinces]);

    useImperativeHandle(ref, () => ({
      goBack() {
        if (currentView !== "provinces") {
          goToProvinces();
        }
      },
      reset() {
        goToProvinces();
      },
    }), [currentView, goToProvinces]);

    // Load data
    useEffect(() => {
      let cancelled = false;
      Promise.all([d3.json(PROVINCE_URL), d3.json(MUNICIPALITY_URL)]).then(
        ([provData, muniData]) => {
          if (cancelled || !provData || !muniData) return;
          provincesRef.current = stripIslands(provData);
          municipalitiesRef.current = stripIslands(muniData);
          renderProvinces(provincesRef.current);
        }
      );
      return () => { cancelled = true; };
    }, [renderProvinces]);

    return (
      <div className="krm" data-component={dataComponent}>
        <div
          className="krm__tooltip"
          ref={tooltipRef}
          data-component={dataComponent ? `${dataComponent}_tooltip` : undefined}
        />
        <svg
          ref={svgRef}
          className="krm__svg"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          data-component={dataComponent ? `${dataComponent}_svg` : undefined}
        />
      </div>
    );
  }
);
