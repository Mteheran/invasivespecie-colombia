import { useEffect, useRef, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import type { Occurrence } from "../../data/occurrences";
import type { RiskKey } from "../../utils/risk";
import { useT } from "../../i18n/lang";

const RISK_HEX: Record<RiskKey, string> = {
  high: "#a33c2f",
  medium: "#c8802e",
  low: "#6d7862",
};

const W = 800;
const H = 640;
const ATLAS_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";

// Caché de módulo para la geometría (se descarga una sola vez).
let topoCache: any = null;

interface ColombiaMapProps {
  occurrences: Occurrence[];
  activeRisks?: RiskKey[];
  onPointClick?: (occ: Occurrence) => void;
  interactive?: boolean;
}

/** Espera a que window.d3 / window.topojson estén disponibles (cargados por CDN). */
function whenLibsReady(cb: () => void) {
  if (window.d3 && window.topojson) {
    cb();
    return () => {};
  }
  const id = window.setInterval(() => {
    if (window.d3 && window.topojson) {
      window.clearInterval(id);
      cb();
    }
  }, 80);
  return () => window.clearInterval(id);
}

export default function ColombiaMap({
  occurrences,
  activeRisks,
  onPointClick,
  interactive = true,
}: ColombiaMapProps) {
  const t = useT();
  const svgRef = useRef<SVGSVGElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const projectionRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  // Dibuja la base del mapa una sola vez.
  useEffect(() => {
    let cancelled = false;
    const cancelPoll = whenLibsReady(async () => {
      const d3 = window.d3;
      const topojson = window.topojson;
      if (!topoCache) {
        try {
          topoCache = await d3.json(ATLAS_URL);
        } catch {
          return;
        }
      }
      if (cancelled || !svgRef.current) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const countries = topojson.feature(topoCache, topoCache.objects.countries);
      const colombia = countries.features.find((f: any) => f.properties.name === "Colombia");
      const projection = d3.geoMercator().fitExtent([[70, 40], [W - 70, H - 40]], colombia);
      projectionRef.current = projection;
      const path = d3.geoPath(projection);

      svg.append("rect").attr("width", W).attr("height", H).attr("fill", "#eef1e9");
      svg
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "rgba(71,83,61,.14)")
        .attr("stroke-width", 0.6)
        .attr("d", path(d3.geoGraticule().step([2, 2])()));
      svg
        .append("g")
        .selectAll("path")
        .data(countries.features.filter((f: any) => f !== colombia))
        .join("path")
        .attr("fill", "#dde4d4")
        .attr("stroke", "#b8c1ac")
        .attr("stroke-width", 0.7)
        .attr("d", path);
      svg
        .append("path")
        .datum(colombia)
        .attr("fill", "#c3cfb4")
        .attr("stroke", "#47533d")
        .attr("stroke-width", 1.2)
        .attr("d", path);

      svg.append("g").attr("class", "points-layer");
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
      cancelPoll();
    };
  }, []);

  // Redibuja los puntos cuando cambian las ocurrencias, filtros o el idioma.
  useEffect(() => {
    if (!ready || !svgRef.current || !window.d3 || !projectionRef.current) return;
    const d3 = window.d3;
    const projection = projectionRef.current;
    const svg = d3.select(svgRef.current);
    const layer = svg.select(".points-layer");
    layer.selectAll("*").remove();

    const visible = occurrences.filter((o) => !activeRisks || activeRisks.includes(o.risk));

    visible.forEach((s) => {
      const [x, y] = projection([s.lon, s.lat]);
      layer
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 20)
        .attr("opacity", 0.16)
        .attr("fill", RISK_HEX[s.risk]);
      const dot = layer
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 7.5)
        .attr("fill", RISK_HEX[s.risk])
        .attr("stroke", "#feeee4")
        .attr("stroke-width", 1.6)
        .style("cursor", interactive ? "pointer" : "default");

      if (interactive) {
        dot
          .on("mousemove", (e: MouseEvent) => {
            const tip = tipRef.current;
            if (!tip) return;
            tip.innerHTML = `<b>${s.name}</b><em>${s.scientificName}</em><div style="margin-top:6px">${s.where} — ${s.note}</div>`;
            tip.style.opacity = "1";
            const wrap = svgRef.current!.parentElement!.getBoundingClientRect();
            tip.style.left = Math.min(e.clientX - wrap.left + 14, wrap.width - 250) + "px";
            tip.style.top = e.clientY - wrap.top - 10 + "px";
          })
          .on("mouseleave", () => {
            if (tipRef.current) tipRef.current.style.opacity = "0";
          })
          .on("mouseenter", function (this: SVGCircleElement) {
            d3.select(this).attr("stroke", "#1e2017");
          })
          .on("click", () => onPointClick?.(s));
        dot.on("mouseout", function (this: SVGCircleElement) {
          d3.select(this).attr("stroke", "#feeee4");
        });
      }
    });
  }, [ready, occurrences, activeRisks, interactive, onPointClick]);

  return (
    <Box position="relative" width="100%">
      {!ready && (
        <Box position="absolute" inset={0} display="flex" alignItems="center" justifyContent="center" bg="#eef1e9">
          <Text fontFamily="body" fontSize="13px" color="brand.600">
            {t.map.loading}
          </Text>
        </Box>
      )}
      <Box
        as="svg"
        ref={svgRef as any}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Mapa de Colombia con presencia de especies invasoras"
        display="block"
        width="100%"
        height="auto"
      />
      <Box
        ref={tipRef}
        position="absolute"
        pointerEvents="none"
        opacity={0}
        transition="opacity .12s"
        bg="brand.900"
        color="sand"
        borderRadius="10px"
        px="12px"
        py="9px"
        maxW="230px"
        boxShadow="0 8px 20px -6px rgba(0,0,0,.5)"
        sx={{
          fontFamily: "var(--chakra-fonts-body)",
          fontSize: "12px",
          lineHeight: 1.4,
          "& b": { display: "block", fontFamily: "var(--chakra-fonts-heading)", fontSize: "14px", marginBottom: "2px" },
          "& em": { color: "var(--chakra-colors-brand-200)", fontStyle: "italic", fontSize: "11px" },
        }}
      />
    </Box>
  );
}
