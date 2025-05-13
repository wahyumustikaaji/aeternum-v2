import { useRef, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

export default function WorldMap({
  dots = [],
  lineColor = "oklch(59.6% 0.145 163.225)",
}) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const { theme = "dark", setTheme } = useTheme({ defaultTheme: "dark" });

  // Memindahkan pembuatan map di luar dari render cycle
  const map = useMemo(() => new DottedMap({ height: 100, grid: "diagonal" }), []);
  
  // Memindahkan svgMap ke dalam useMemo untuk mencegah re-render yang tidak perlu
  const svgMap = useMemo(() => 
    map.getSVG({
      radius: 0.22,
      color: theme === "dark" ? "#FFFFFF40" : "#00000040",
      shape: "circle",
      backgroundColor: theme === "dark" ? "#121212" : "white",
    }),
    [map, theme]
  );

  useEffect(() => {
    if (typeof window !== "undefined" && theme !== "dark") {
      setTheme("dark");
    }
  }, [theme, setTheme]);

  useEffect(() => {
    // Gunakan fungsi sederhana daripada debounce untuk observasi
    const handleIntersection = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Memindahkan fungsi proyeksi ke useMemo
  const projectPoint = useMemo(() => (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  }, []);

  // Memindahkan fungsi pembuatan path ke useMemo
  const createCurvedPath = useMemo(() => (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }, []);

  // Pra-proyeksikan titik-titik untuk menghindari perhitungan berulang
  const projectedDots = useMemo(() => 
    dots.map(dot => ({
      start: projectPoint(dot.start.lat, dot.start.lng),
      end: projectPoint(dot.end.lat, dot.end.lng)
    })),
    [dots, projectPoint]
  );

  // Pra-buat path untuk setiap koneksi
  const paths = useMemo(() => 
    projectedDots.map(dot => createCurvedPath(dot.start, dot.end)),
    [projectedDots, createCurvedPath]
  );

  const encodedSvgMap = useMemo(() => 
    encodeURIComponent(svgMap),
    [svgMap]
  );

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[2/1] max-h-[700px] rounded-lg relative font-sans"
    >
      <img
        src={`data:image/svg+xml;utf8,${encodedSvgMap}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {isInView && (
          <>
            <defs>
              <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
                <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {projectedDots.map((dot, i) => (
              <g key={`elements-${i}`}>
                {/* Path */}
                <motion.path
                  d={paths[i]}
                  fill="none"
                  stroke="url(#path-gradient)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.5 * i,
                    ease: "easeOut",
                  }}
                />
                
                {/* Start point */}
                <circle
                  cx={dot.start.x}
                  cy={dot.start.y}
                  r="2"
                  fill={lineColor}
                />
                <circle
                  cx={dot.start.x}
                  cy={dot.start.y}
                  r="2"
                  fill={lineColor}
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="2"
                    to="8"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
                
                {/* End point */}
                <circle
                  cx={dot.end.x}
                  cy={dot.end.y}
                  r="2"
                  fill={lineColor}
                />
                <circle
                  cx={dot.end.x}
                  cy={dot.end.y}
                  r="2"
                  fill={lineColor}
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="2"
                    to="8"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}
          </>
        )}
      </svg>
    </div>
  );
}