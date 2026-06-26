"use client";

import React, { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  AreaSeries,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";
import { useTheme } from "@/contexts/ThemeContext";

const TradingChart: React.FC = () => {
  const { theme } = useTheme();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Theme-based colors
    const isDark = theme === "dark";
    const chartColors = {
      background: isDark ? "#292d2e" : "#ffffff",
      textColor: isDark ? "#b3bec1" : "#707070",
      lineColor: isDark ? "#24ee89" : "#add633",
      topColor: isDark ? "rgba(36, 238, 137, 0.4)" : "rgba(215, 235, 145, 0.5)",
      bottomColor: isDark
        ? "rgba(36, 238, 137, 0.0)"
        : "rgba(215, 235, 145, 0.0)",
      gridColor: isDark ? "#3a4142" : "#e1e1e1",
      crosshairColor: isDark ? "#4a5354" : "#4c525e",
      upColor: isDark ? "#2ecc71" : "#2cc26b",
      downColor: isDark ? "#ff5449" : "#FF5449",
    };

    // 1. Initialize Chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: chartColors.background },
        textColor: chartColors.textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0.1, bottom: 0.2 },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: true,
      },
      crosshair: {
        vertLine: { labelBackgroundColor: chartColors.crosshairColor },
        horzLine: { labelBackgroundColor: chartColors.crosshairColor },
      },
      handleScroll: false,
      handleScale: false,
    });

    // 2. Add Area Series
    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: chartColors.lineColor,
      topColor: chartColors.topColor,
      bottomColor: chartColors.bottomColor,
      lineWidth: 2,
      priceLineVisible: true,
      priceLineStyle: 2,
      lastValueVisible: true,
      priceFormat: {
        type: "price",
        precision: 3,
        minMove: 0.001,
      },
    });

    // 3. Realistic Simulation Logic
    let currentPrice = 594.245;
    let prevPrice = 594.245;
    const initialData = [];
    const now = Math.floor(Date.now() / 1000) as UTCTimestamp;

    for (let i = 150; i > 0; i--) {
      currentPrice += (Math.random() - 0.5) * 0.6;
      initialData.push({
        time: (now - i) as UTCTimestamp,
        value: currentPrice,
      });
    }
    areaSeries.setData(initialData);

    chartRef.current = chart;
    seriesRef.current = areaSeries;

    // 4. Update Function with RED/GREEN Logic
    const updatePrice = () => {
      if (!seriesRef.current) return;

      prevPrice = currentPrice;
      const change = (Math.random() - 0.5) * 0.4;
      currentPrice += change;

      // Change color based on movement
      const isUp = currentPrice >= prevPrice;

      seriesRef.current.applyOptions({
        priceLineColor: isUp ? chartColors.upColor : chartColors.downColor,
      });

      seriesRef.current.update({
        time: Math.floor(Date.now() / 1000) as UTCTimestamp,
        value: currentPrice,
      });
    };

    const interval = setInterval(updatePrice, 1000);

    // 5. Auto-Fit Width
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [theme]); // Re-create chart when theme changes

  return (
    <div className="w-full h-72 md:h-full md:min-h-125 bg-layer3">
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};

export default TradingChart;
