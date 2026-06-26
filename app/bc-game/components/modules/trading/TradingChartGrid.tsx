"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  ColorType,
  AreaSeries,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";
import { useTheme } from "@/contexts/ThemeContext";

const TradingChartGrid: React.FC = () => {
  const { theme } = useTheme();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);

  // Position ng green column
  const [columnOffset, setColumnOffset] = useState(0);

  const multipliers = [
    ["781.0x", "90.4x", "31.0x"],
    ["97.4x", "21.2x", "13.5x"],
    ["15.5x", "8.1x", "5.8x"],
    ["4.5x", "3.4x", "3.7x"],
    ["1.8x", "2.3x", "2.4x"],
    ["1.4x", "1.8x", "2.4x"],
    ["1.9x", "2.2x", "2.4x"],
    ["5.2x", "3.9x", "3.5x"],
    ["18.6x", "8.0x", "6.7x"],
    ["123.8x", "25.5x", "13.1x"],
  ];

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const isDark = theme === "dark";
    const colors = {
      bg: isDark ? "#292d2e" : "#ffffff",
      text: isDark ? "#849194" : "#9ea3ae",
      grid: isDark ? "#3a4142" : "#f0f3fa",
      line: isDark ? "#24ee89" : "#add633",
      areaTop: isDark ? "rgba(36, 238, 137, 0.4)" : "rgba(223, 242, 114, 0.4)",
      areaBottom: isDark ? "rgba(36, 238, 137, 0)" : "rgba(255, 255, 255, 0)",
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.bg },
        textColor: colors.text,
        fontSize: 10,
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
      grid: {
        vertLines: { color: colors.grid, style: 2 },
        horzLines: { color: colors.grid, style: 2 },
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: true,
        shiftVisibleRangeOnNewBar: true,
        // Nilakihan ang offset para laging nasa bandang gitna ang dulo ng line
        rightOffset: 50,
      },
    });

    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: colors.line, // Theme-aware line color
      topColor: colors.areaTop,
      bottomColor: colors.areaBottom,
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    let lastValue = 594.245;
    const initialData = [];
    const now = Math.floor(Date.now() / 1000);
    for (let i = 200; i >= 0; i--) {
      lastValue += (Math.random() - 0.5) * 0.4;
      initialData.push({ time: (now - i) as UTCTimestamp, value: lastValue });
    }
    areaSeries.setData(initialData);

    seriesRef.current = areaSeries;
    chartRef.current = chart;

    // I-center ang green grid sa dulo ng line
    const syncGrid = () => {
      if (chartRef.current) {
        const timeScale = chartRef.current.timeScale();
        const coordinate = timeScale.timeToCoordinate(
          Math.floor(Date.now() / 1000) as UTCTimestamp,
        );
        if (coordinate !== null) {
          // Offset para magmukhang "center-locked" ang grid
          setColumnOffset(coordinate - 90);
        }
      }
    };

    // Ultra Fast Update: 200ms para sa mabilis na galaw
    const interval = setInterval(() => {
      if (seriesRef.current) {
        lastValue += (Math.random() - 0.5) * 0.3;
        seriesRef.current.update({
          time: Math.floor(Date.now() / 1000) as UTCTimestamp,
          value: lastValue,
        });
        syncGrid();
      }
    }, 200);

    return () => {
      clearInterval(interval);
      chart.remove();
    };
  }, [theme]); // Re-run when theme changes

  const isDark = theme === "dark";

  return (
    <div className="relative w-full h-125 bg-layer3 overflow-hidden border border-third">
      <div ref={chartContainerRef} className="w-full h-full" />

      {/* CENTERED SYNCED GREEN COLUMN */}
      <div
        className="absolute top-0 h-[calc(100%-25px)] w-45 z-10 border-x border-green-200/20 pointer-events-none transition-all duration-200 ease-linear"
        style={{
          left: `${columnOffset}px`,
          backgroundColor: isDark
            ? "rgba(36, 238, 137, 0.15)"
            : "rgba(220, 252, 231, 0.4)",
          borderColor: isDark
            ? "rgba(36, 238, 137, 0.2)"
            : "rgba(187, 247, 208, 0.2)",
        }}
      >
        <div className="flex flex-col h-full justify-between py-4">
          {multipliers.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-between px-2">
              {row.map((val, valIdx) => (
                <span
                  key={valIdx}
                  className={`text-[10px] font-bold w-1/3 text-center ${isDark ? "text-brand" : "text-green-700"}`}
                >
                  {val}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingChartGrid;
