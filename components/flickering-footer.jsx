"use client";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { clsx } from "clsx";
import * as Color from "color-bits";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Helper function to convert any CSS color to rgba
export const getRGBA = (cssColor, fallback = "rgba(180, 180, 180)") => {
  if (typeof window === "undefined") return fallback;
  if (!cssColor) return fallback;

  try {
    // Handle CSS variables
    if (typeof cssColor === "string" && cssColor.startsWith("var(")) {
      const element = document.createElement("div");
      element.style.color = cssColor;
      document.body.appendChild(element);
      const computedColor = window.getComputedStyle(element).color;
      document.body.removeChild(element);
      return Color.formatRGBA(Color.parse(computedColor));
    }

    return Color.formatRGBA(Color.parse(cssColor));
  } catch (e) {
    console.error("Color parsing failed:", e);
    return fallback;
  }
};

// Helper function to add opacity to an RGB color string
export const colorWithOpacity = (color, opacity) => {
  if (!color.startsWith("rgb")) return color;
  return Color.formatRGBA(Color.alpha(Color.parse(color), opacity));
};

export const Icons = {
  logo: ({
    className
  }) => (
    // Replaced generic logo with a simple abstract A shape for Avalon
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-6 fill-[var(--secondary)]", className)}>
      <path d="M21 2L4 38H12L21 16L30 38H38L21 2Z" fill="currentColor" />
    </svg>
  ),
};

export const FlickeringGrid = ({
  squareSize = 3,
  gridGap = 3,
  flickerChance = 0.2,
  color = "#B4B4B4",
  width,
  height,
  className,
  maxOpacity = 0.15,
  text = "",
  fontSize = 140,
  fontWeight = 600,
  ...props
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const memoizedColor = useMemo(() => {
    return getRGBA(color);
  }, [color]);

  const drawGrid = useCallback((
    ctx,
    width,
    height,
    cols,
    rows,
    squares,
    dpr,
  ) => {
    ctx.clearRect(0, 0, width, height);

    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = width;
    maskCanvas.height = height;
    const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
    if (!maskCtx) return;

    if (text) {
      maskCtx.save();
      maskCtx.scale(dpr, dpr);
      maskCtx.fillStyle = "white";
      maskCtx.font = `${fontWeight} ${fontSize}px "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      maskCtx.textAlign = "center";
      maskCtx.textBaseline = "middle";
      maskCtx.fillText(text, width / (2 * dpr), height / (2 * dpr));
      maskCtx.restore();
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * (squareSize + gridGap) * dpr;
        const y = j * (squareSize + gridGap) * dpr;
        const squareWidth = squareSize * dpr;
        const squareHeight = squareSize * dpr;

        const maskData = maskCtx.getImageData(x, y, squareWidth, squareHeight).data;
        const hasText = maskData.some((value, index) => index % 4 === 0 && value > 0);

        const opacity = squares[i * rows + j];
        const finalOpacity = hasText
          ? Math.min(1, opacity * 3 + 0.4)
          : opacity;

        ctx.fillStyle = colorWithOpacity(memoizedColor, finalOpacity);
        ctx.fillRect(x, y, squareWidth, squareHeight);
      }
    }
  }, [memoizedColor, squareSize, gridGap, text, fontSize, fontWeight]);

  const setupCanvas = useCallback((canvas, width, height) => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const cols = Math.ceil(width / (squareSize + gridGap));
    const rows = Math.ceil(height / (squareSize + gridGap));

    const squares = new Float32Array(cols * rows);
    for (let i = 0; i < squares.length; i++) {
      squares[i] = Math.random() * maxOpacity;
    }

    return { cols, rows, squares, dpr };
  }, [squareSize, gridGap, maxOpacity]);

  const updateSquares = useCallback((squares, deltaTime) => {
    for (let i = 0; i < squares.length; i++) {
      if (Math.random() < flickerChance * deltaTime) {
        squares[i] = Math.random() * maxOpacity;
      }
    }
  }, [flickerChance, maxOpacity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let gridParams;

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      gridParams = setupCanvas(canvas, newWidth, newHeight);
    };

    updateCanvasSize();

    let lastTime = 0;
    const animate = (time) => {
      if (!isInView) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(gridParams.squares, deltaTime);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0 });

    intersectionObserver.observe(canvas);

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

  return (
    <div
      ref={containerRef}
      className={cn(`h-full w-full ${className}`)}
      {...props}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }} />
    </div>
  );
};

export function useMediaQuery(query) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function checkQuery() {
      const result = window.matchMedia(query);
      setValue(result.matches);
    }
    checkQuery();
    window.addEventListener("resize", checkQuery);
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", checkQuery);
    return () => {
      window.removeEventListener("resize", checkQuery);
      mediaQuery.removeEventListener("change", checkQuery);
    };
  }, [query]);

  return value;
}

export const siteConfig = {
  hero: {
    title: "Avalon Techfest 2026",
    description:
      "Terna Public Charitable Trust's Terna Engineering presents the ultimate technical experience. Join us on 10 FEB 2026.",
    cta: {
      primary: {
        text: "Register Now",
        href: "https://avalontechfest.tech",
      },
    },
  },
  footerLinks: [
    {
      title: "Connect",
      links: [
        { id: 1, title: "avalontechfest.tech", url: "https://avalontechfest.tech" },
        { id: 2, title: "avalon@ternaengg.ac.in", url: "mailto:avalon@ternaengg.ac.in" },
      ],
    },
    {
      title: "Socials",
      links: [
        { id: 3, title: "@avalonterna", url: "https://instagram.com/avalonterna" },
        { id: 4, title: "AvalonTechfest", url: "#" },
      ],
    },
    {
      title: "Contact Team",
      links: [
        { id: 5, title: "Anshu Sakure: +91 87679 73277", url: "tel:+918767973277" },
        { id: 6, title: "Raj Salunke: +91 77188 81703", url: "tel:+917718881703" },
      ],
    },
  ],
};

export const Component = () => {
  const tablet = useMediaQuery("(max-width: 1024px)");

  return (
    <footer id="footer" className="w-full pb-0 bg-background text-foreground">
      <div
        className="flex flex-col md:flex-row md:items-center md:justify-between p-10">
        <div className="flex flex-col items-start justify-start gap-y-5 max-w-sm mx-0">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="size-8" />
            <p className="text-xl font-bold tracking-tighter">AVALON</p>
          </Link>
          <p className="tracking-tight text-muted-foreground font-medium text-sm leading-relaxed">
            {siteConfig.hero.description}
          </p>
          <div className="flex flex-col gap-1 mt-2">
             <span className="text-xs font-semibold text-primary uppercase tracking-wider">Event Date</span>
             <span className="text-lg font-bold">10 FEB 2026</span>
          </div>
        </div>
        <div className="pt-10 md:pt-0 md:w-1/2">
          <div
            className="flex flex-col items-start justify-start md:flex-row md:items-start md:justify-between gap-y-8 lg:pl-10">
            {siteConfig.footerLinks.map((column, columnIndex) => (
              <ul key={columnIndex} className="flex flex-col gap-y-3">
                <li className="mb-1 text-sm font-bold uppercase tracking-wider text-primary">
                  {column.title}
                </li>
                {column.links.map((link) => (
                  <li
                    key={link.id}
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[14px] text-muted-foreground hover:text-foreground transition-colors">
                    <Link href={link.url}>{link.title}</Link>
                    <div
                      className="flex size-3 items-center justify-center opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                      <ChevronRightIcon className="h-3 w-3" />
                    </div>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-48 md:h-64 relative mt-12 z-0">
        <div
          className="absolute inset-0 bg-gradient-to-t from-transparent to-background z-10 from-10%" />
        <div className="absolute inset-0 mx-6">
          <FlickeringGrid
            text={tablet ? "AVALON" : "AVALON 2026"}
            fontSize={tablet ? 70 : 120}
            className="h-full w-full"
            squareSize={2}
            gridGap={tablet ? 2 : 3}
            color="#6B7280"
            maxOpacity={0.3}
            flickerChance={0.1} />
        </div>
      </div>
    </footer>
  );
};