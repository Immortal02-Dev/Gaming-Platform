"use client";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Animated Chart Component ────────────────────────────────────────────────
function UpDownChart() {
  const BASE_PRICE = 67799.16629;
  const MAX_POINTS = 120;
  const TICK_MS = 250;
  const WIDTH = 900; // Original coordinate system
  const HEIGHT = 216; // Original height
  const Y_PADDING = 18;

  const [prices, setPrices] = useState<number[]>([BASE_PRICE]);
  const [startPrice] = useState(BASE_PRICE);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextPrice = useCallback((prev: number) => {
    const drift = (Math.random() - 0.495) * 2.8;
    const volatility = prev * 0.00012;
    return Math.max(
      prev + drift + (Math.random() - 0.5) * volatility,
      prev * 0.998,
    );
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setPrices((prev) => {
        const last = prev[prev.length - 1];
        const next = nextPrice(last);
        const updated = [...prev, next];
        return updated.length > MAX_POINTS
          ? updated.slice(-MAX_POINTS)
          : updated;
      });
    }, TICK_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextPrice]);

  const livePrice = prices[prices.length - 1];
  const isUp = livePrice >= startPrice;
  const minP = Math.min(...prices) - Y_PADDING * 0.5;
  const maxP = Math.max(...prices) + Y_PADDING * 0.5;
  const range = maxP - minP || 1;

  const toY = (p: number) => HEIGHT - ((p - minP) / range) * HEIGHT;
  const toX = (i: number) => (i / (MAX_POINTS - 1)) * WIDTH;

  const points = prices
    .map((p, i) => `${toX(i).toFixed(1)},${toY(p).toFixed(1)}`)
    .join(" ");
  const startY = toY(startPrice);
  const liveY = toY(livePrice);
  const liveX = toX(prices.length - 1);

  const ticks = Array.from({ length: 8 }, (_, i) => ({
    price: maxP - (i / 7) * range,
    y: toY(maxP - (i / 7) * range),
  }));

  const startYPct = `${((startY / HEIGHT) * 100).toFixed(2)}%`;

  return (
    /* Ginamit natin ang aspect-ratio para hindi ma-distort ang graph sa mobile */
    <div className="relative w-full aspect-900/216 md:h-full min-h-54 overflow-hidden bg-transparent">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="bgGrad" x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="0%"
              stopColor="rgb(var(--success))"
              stopOpacity="0.4"
            />
            <stop
              offset={startYPct}
              stopColor="rgb(var(--success))"
              stopOpacity="0.05"
            />
            <stop
              offset={startYPct}
              stopColor="rgb(var(--error))"
              stopOpacity="0.05"
            />
            <stop
              offset="100%"
              stopColor="rgb(var(--error))"
              stopOpacity="0.4"
            />
          </linearGradient>

          <linearGradient id="lineAreaGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#D7ED47" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#D7ED47" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#bgGrad)" />

        {/* Grid lines */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1="0"
              x2={WIDTH}
              y1={t.y}
              y2={t.y}
              stroke="rgb(var(--primary))"
              strokeOpacity="0.15"
              strokeWidth="1"
            />
            <text
              x={WIDTH - 4}
              y={t.y - 3}
              textAnchor="end"
              fontSize="10"
              fill="rgb(var(--primary))"
              fillOpacity="0.5"
            >
              {t.price.toFixed(4)}
            </text>
          </g>
        ))}

        <polygon
          points={`${points} ${liveX.toFixed(1)},${HEIGHT} 0,${HEIGHT}`}
          fill="url(#lineAreaGrad)"
          opacity="0.6"
        />
        <polyline
          points={points}
          fill="none"
          stroke="#D7ED47"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="0"
          x2={WIDTH}
          y1={startY}
          y2={startY}
          stroke="rgb(var(--primary))"
          strokeOpacity="0.8"
          strokeDasharray="2 2"
          strokeWidth="1"
        />

        {/* Live point dot */}
        <circle cx={liveX} cy={liveY} r="4" fill="white" opacity="0.9" />
        <circle cx={liveX} cy={liveY} r="7" fill="white" opacity="0.2">
          <animate
            attributeName="r"
            values="4;9;4"
            dur="1.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0;0.3"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Badges - Ginawa nating percentage-based ang positioning para sumunod sa line */}

      {/* Start Price Badge */}
      <div
        className="absolute left-0 flex items-center z-20 pointer-events-none"
        style={{
          top: `${(startY / HEIGHT) * 100}%`,
          transform: "translateY(-50%)",
        }}
      >
        <div className="bg-[#D7ED47] text-black text-center rounded-sm shadow-lg px-2 py-0.5 min-w-17.5 sm:min-w-20">
          <div className="text-[9px] font-medium leading-tight">Start</div>
          <div className="h-px w-full bg-black/10 my-0.5" />
          <div className="text-[10px] sm:text-[11px] font-bold">
            {startPrice.toFixed(5)}
          </div>
        </div>
      </div>

      {/* Live Price Badge */}
      <div
        className="absolute right-0 flex items-center z-20 pointer-events-none"
        style={{
          top: `${(liveY / HEIGHT) * 100}%`,
          transform: "translateY(-50%)",
        }}
      >
        <div
          className="text-black text-center rounded-sm shadow-lg px-2 py-0.5 min-w-17.5 sm:min-w-20"
          style={{ backgroundColor: isUp ? "#D7ED47" : "#ff5449" }}
        >
          <div className="text-[9px] font-medium leading-tight">Live</div>
          <div className="h-px w-full bg-black/10 my-0.5" />
          <div className="text-[10px] sm:text-[11px] font-bold">
            {livePrice.toFixed(5)}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TimerProps {
  initialSeconds?: number;
  size?: string; // Halimbawa: "size-20 s768:size-40"
}

function CircularTimer({
  initialSeconds = 13,
  size = "size-25 s768:size-40",
}: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const isFinished = seconds <= 0;

  // Math constants para sa circle (Radius = 60.5)
  const radius = 60.5;
  const circumference = 2 * Math.PI * radius; // Approx 380.13

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  // Kalkulahin ang progress (380.13 = 100%, 0 = 0%)
  const progress = (seconds / initialSeconds) * circumference;
  const offset = circumference - progress;

  return (
    <div
      className={`relative transition-colors duration-1000 shrink-0 ${size} ${
        isFinished ? "text-success" : "text-warning"
      }`}
    >
      <svg
        className="w-full h-full drop-shadow-sm"
        viewBox="0 0 136 136"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle (Inner Fill) */}
        <circle className="fill-layer2" cx="68" cy="68" r="68" />

        {/* Track */}
        <circle
          className={`transition-colors duration-1000 fill-none ${
            isFinished ? "stroke-up/20" : "stroke-warn/20"
          }`}
          cx="68"
          cy="68"
          r={radius}
          strokeWidth="12"
        />

        {/* Animated Progress Bar */}
        <circle
          className={`origin-center -rotate-90 transition-all ease-linear duration-1000 fill-none ${
            isFinished ? "stroke-up" : "stroke-warn"
          }`}
          cx="68"
          cy="68"
          r={radius}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={isFinished ? 0 : offset}
          strokeLinecap="round"
        />
      </svg>

      {/* Text Center - Responsive Font Sizes / Icon */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {isFinished ? (
          <div className="flex items-center justify-center gap-0.5 s768:gap-1">
            <div
              className={`w-0.75 s768:w-1.5 h-4 s768:h-6 rounded-full animate-music-bar ${
                isFinished ? "bg-success" : "bg-warning"
              }`}
              style={{ animationDelay: "0ms" }}
            />
            <div
              className={`w-0.75 s768:w-1.5 h-6 s768:h-10 rounded-full animate-music-bar ${
                isFinished ? "bg-success" : "bg-warning"
              }`}
              style={{ animationDelay: "150ms" }}
            />
            <div
              className={`w-0.75 s768:w-1.5 h-8 s768:h-12 rounded-full animate-music-bar ${
                isFinished ? "bg-success" : "bg-warning"
              }`}
              style={{ animationDelay: "300ms" }}
            />
            <div
              className={`w-0.75 s768:w-1.5 h-6 s768:h-10 rounded-full animate-music-bar ${
                isFinished ? "bg-success" : "bg-warning"
              }`}
              style={{ animationDelay: "150ms" }}
            />
            <div
              className={`w-0.75 s768:w-1.5 h-4 s768:h-6 rounded-full animate-music-bar ${
                isFinished ? "bg-success" : "bg-warning"
              }`}
              style={{ animationDelay: "0ms" }}
            />
          </div>
        ) : (
          <>
            <div className="leading-none text-14 s768:text-24 s1440:text-30 s1920:text-36 font-bold">
              {seconds}
            </div>
            <div className="text-[8px] s768:text-12 s1920:text-14 font-medium opacity-80 uppercase tracking-tighter">
              Sec
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TradingUpDown() {
  return (
    <div className="page-content relative z-10 w-full px-4 sm:px-0">
      <div
        className="relative w-full min-h-[80vh] pt-4 sm:pt-0 sm:px-4 mx-auto"
        style={{
          maxWidth: "1830px",
        }}
      >
        <div className="detrade-light s768 s1024 s1366 s1440 detrade theme-bold">
          <div className="space-y-0.5">
            <div className="s1024:flex s1024:items-stretch gap-0.5">
              <div className="flex flex-col justify-between s1024:overflow-hidden gap-0.5 flex-1">
                <div
                  className="flex justify-start items-center flex-wrap leading-none px-3 s768:py-3 h-auto md:h-16 gap-x-2 bg-layer3 rounded-2"
                  id="trading-pair"
                >
                  <button className="detrade-button hoverable bg-transparent shadow-none! p-0 text-primary opacity-10 hidden! md:flex!">
                    <svg
                      className="detrade-icon text-current hover:text-current size-5"
                      fill="none"
                      height="1em"
                      viewBox="0 0 14 14"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.45011 0.944101C6.69558 0.522658 7.30442 0.522659 7.54989 0.944101L9.12184 3.64297C9.21176 3.79735 9.36243 3.90682 9.53705 3.94463L12.5896 4.60565C13.0662 4.70887 13.2544 5.28791 12.9294 5.6516L10.8484 7.98061C10.7294 8.11383 10.6718 8.29096 10.6898 8.46871L11.0044 11.5761C11.0536 12.0613 10.561 12.4192 10.1147 12.2225L7.25661 10.9631C7.09312 10.891 6.90688 10.891 6.74339 10.9631L3.8853 12.2225C3.439 12.4192 2.94643 12.0613 2.99556 11.5761L3.31018 8.46871C3.32818 8.29096 3.27063 8.11383 3.15159 7.98061L1.07057 5.6516C0.745611 5.28791 0.933754 4.70887 1.41042 4.60565L4.46296 3.94463C4.63757 3.90682 4.78824 3.79735 4.87816 3.64297L6.45011 0.944101Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  <div
                    className="flex items-center select-none auto-ref3lvlhrt7jv4 detrade-popover-trigger cursor-pointer"
                    id="trading-pair-trigger"
                  >
                    <span className="block overflow-hidden shrink-0 rounded-full size-5 s768:size-7 mr-2 lazy-load-image-background  lazy-load-image-loaded">
                      <img
                        className="object-cover size-full"
                        src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/BTC.png"
                      />
                    </span>
                    <div className="mr-1 md:text-2xl">
                      BTC
                      <span className="text-secondary">/USDT</span>
                    </div>
                    <svg
                      className="detrade-icon text-primary transition-all size-4 s768:size-6 rotate-90"
                      fill="none"
                      height="1em"
                      viewBox="0 0 14 14"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.18205 7L5 10.1113L5.90897 11L10 7L5.90897 3L5 3.88875L8.18205 7Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap relative min-h-10">
                    <button className="detrade-button hoverable shadow-none! h-8 px-2 rounded-2 text-12 s768:h-10 s768:px-3 s768:text-14 flex flex-col md:flex-row -space-y-1 s768:space-y-0 gap-0.5 md:gap-1 min-w-18 leading-normal bg-colorful12 text-primary_brand">
                      <span className="text-xs md:text-base">5s</span>
                      <span className="text-[9px] md:text-xs text-inherit">
                        $1-50
                      </span>
                    </button>
                    <button className="detrade-button hoverable shadow-none! h-8 px-2 rounded-2 text-12 s768:h-10 s768:px-3 s768:text-14 flex flex-col md:flex-row  -space-y-1 s768:space-y-0 gap-0.5 md:gap-1 min-w-18 leading-normal text-primary bg-layer5">
                      <span className="text-xs md:text-base">5s</span>
                      <span className="text-[9px] md:text-xs text-secondary">
                        $50-100
                      </span>
                    </button>
                  </div>
                  <button className="detrade-button hoverable bg-transparent shadow-none! p-0 detrade-help ml-auto s768:order-last">
                    <svg
                      className="detrade-icon size-4.5"
                      fill="currentColor"
                      height="1em"
                      viewBox="0 0 20 20"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6.243 8.255C6.406 8.255 6.563 8.32 6.678 8.435 6.793 8.551 6.858 8.707 6.858 8.87 6.858 9.033 6.793 9.19 6.678 9.305 6.563 9.421 6.406 9.485 6.243 9.485H4.468C4.305 9.485 4.148 9.421 4.033 9.305 3.918 9.19 3.853 9.033 3.853 8.87 3.853 8.707 3.918 8.551 4.033 8.435 4.148 8.32 4.305 8.255 4.468 8.255H6.243ZM15.555 8.255C15.718 8.255 15.874 8.32 15.99 8.435 16.105 8.551 16.17 8.707 16.17 8.87 16.17 9.033 16.105 9.19 15.99 9.305 15.874 9.421 15.718 9.485 15.555 9.485H13.781C13.617 9.485 13.461 9.421 13.346 9.305 13.23 9.19 13.165 9.033 13.165 8.87 13.165 8.707 13.23 8.551 13.346 8.435 13.461 8.32 13.617 8.255 13.781 8.255H15.555ZM7.371 5.579C7.534 5.579 7.691 5.644 7.806 5.759 7.922 5.875 7.986 6.031 7.986 6.194 7.986 6.358 7.922 6.514 7.806 6.629 7.691 6.745 7.534 6.81 7.371 6.81H4.469C4.306 6.81 4.149 6.745 4.034 6.629 3.918 6.514 3.854 6.358 3.854 6.194 3.854 6.031 3.918 5.875 4.034 5.759 4.149 5.644 4.306 5.579 4.469 5.579H7.371ZM15.555 5.579C15.718 5.579 15.874 5.644 15.99 5.759 16.105 5.875 16.17 6.031 16.17 6.194 16.17 6.358 16.105 6.514 15.99 6.629 15.874 6.745 15.718 6.81 15.555 6.81H12.652C12.489 6.81 12.333 6.745 12.217 6.629 12.102 6.514 12.037 6.358 12.037 6.194 12.037 6.031 12.102 5.875 12.217 5.759 12.333 5.644 12.489 5.579 12.652 5.579H15.555Z" />
                      <path
                        clipRule="evenodd"
                        d="M7.31002 2.14648C8.18875 2.14648 9.01687 2.46652 9.64042 3.04771C9.77679 3.17478 9.90181 3.3135 10.0141 3.4623C10.1256 3.31548 10.2494 3.17842 10.3842 3.05264C11.009 2.46898 11.8367 2.14736 12.7151 2.14736H17.1914C18.1886 2.14736 19 2.92364 19 3.87777V14.9913C19 15.9454 18.1886 16.7215 17.1914 16.7215H11.6086C11.5873 16.7206 11.5661 16.7246 11.5466 16.733C11.527 16.7415 11.5096 16.7544 11.4958 16.7706L11.1278 17.2878C10.8756 17.6421 10.4587 17.8537 10.0127 17.8537C9.56661 17.8537 9.14974 17.6428 8.89754 17.2876L8.52935 16.7704C8.51551 16.7542 8.49816 16.7414 8.47865 16.733C8.45913 16.7245 8.43796 16.7205 8.4167 16.7214L2.80861 16.7516C1.81142 16.7516 1 15.9755 1 15.0212V3.90694C1 2.95264 1.81142 2.17671 2.80861 2.17671L7.31002 2.14648ZM12.7151 3.37671C11.5641 3.37671 10.6278 4.23365 10.6278 5.28673V13.3887C10.6278 13.5518 10.563 13.7083 10.4476 13.8236C10.3323 13.939 10.1758 14.0038 10.0127 14.0038C9.84952 14.0038 9.69304 13.939 9.57768 13.8236C9.46232 13.7083 9.39754 13.5518 9.39754 13.3887V5.28673C9.39754 4.78128 9.18664 4.30571 8.80176 3.94771C8.40668 3.57865 7.87698 3.37671 7.31002 3.37671L2.80861 3.40729C2.48963 3.40729 2.23023 3.63155 2.23023 3.90729V15.0212C2.23023 15.2969 2.48963 15.5214 2.80861 15.5214L8.4167 15.4911C8.86274 15.4911 9.27961 15.702 9.53181 16.057L9.89982 16.5744C9.93216 16.6198 9.99438 16.6235 10.0127 16.6235C10.0309 16.6235 10.093 16.6198 10.1253 16.5744L10.4944 16.057C10.7466 15.7027 11.1633 15.4911 11.6095 15.4911H17.1914C17.5104 15.4911 17.7698 15.2669 17.7698 14.9911V3.87689C17.7698 3.60114 17.5104 3.37671 17.1914 3.37671H12.7151Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {/* Start */}
                <div
                  className="flex flex-col flex-1 gap-0 s768:gap-3 detrade-card p-3 w-full"
                  id="up-down-content"
                >
                  <div className="flex s768:gap-4 leading-tight">
                    <section className="flex justify-start flex-1 md:justify-between">
                      <article className="order-1">
                        <h4 className="mb-1 text-12 text-secondary font-500 hidden md:block">
                          Your investment
                        </h4>
                        <p className="text-16 font-700 mb-3 text-up text-right">
                          $1.00
                        </p>
                        <h4 className="mb-1 text-12 text-secondary text-right w-full hidden md:block">
                          Potential Return
                        </h4>
                        <p className="text-[10px] md:text-base font-700 mb-3 text-up text-right">
                          $1.84
                        </p>
                      </article>
                      <article className="flex-col order-2 items-start hidden md:flex">
                        <span className="px-2.5 py-0.5 rounded-full text-12 font-600 bg-up/10 text-up">
                          Up Wins
                        </span>
                        <strong className="font-700 text-50 text-up">
                          184%
                        </strong>
                      </article>
                    </section>
                    <CircularTimer
                      initialSeconds={15}
                      size="size-[60px] md:size-[100px]"
                    />
                    <section className="flex justify-end md:justify-between flex-1">
                      <article className="order-3">
                        <h4 className="mb-1 text-12 text-secondary font-500 hidden md:block">
                          Your investment
                        </h4>
                        <p className="text-[20px] md:text-base font-700 mb-3 text-down">
                          $1.00
                        </p>
                        <h4 className="mb-1 text-12 text-secondary hidden md:block">
                          Potential Return
                        </h4>
                        <p className="font-700 mb-3 text-down text-[10px] md:text-base">
                          $1.94
                        </p>
                      </article>
                      <article className="flex-col order-2 items-end hidden md:flex">
                        <span className="px-2.5 py-0.5 rounded-full text-12 font-600 bg-down/10 text-down">
                          Down Wins
                        </span>
                        <strong className="font-700 text-50 text-down">
                          194%
                        </strong>
                      </article>
                    </section>
                  </div>
                  <div className="relative flex-col space-y-3 w-full select-none s1024:h-full s1024:flex">
                    <div
                      className="relative h-50 s768:flex-1"
                      style={{ minHeight: 216 }}
                    >
                      {/* Live animated BTC price chart */}
                      <div className="absolute inset-0 z-0">
                        <UpDownChart />
                      </div>
                      <div
                        className="absolute left-4 top-0 z-10 s768:text-16 s1024:text-14 s1440:text-18 font-700 text-primary overflow-hidden pointer-events-none"
                        style={{
                          left: "16px",
                          top: "0%",
                          transform: "none",
                        }}
                      >
                        <div>Round In Progress</div>
                        <div
                          style={{
                            transform: "none",
                          }}
                        >
                          Place Your Trade
                        </div>
                      </div>
                    </div>
                    <section className="flex items-center justify-between shrink-0">
                      <div className="flex justify-between gap-4 text-10 text-secondary select-text">
                        <div className="flex-col text-12 font-800 hidden md:flex">
                          <strong className="mb-0.5 text-12 leading-5 text-primary font-800">
                            <div>49</div>
                          </strong>
                          <span className="text-10 font-600">
                            24h win ratio
                          </span>
                        </div>
                        <div className="flex-col text-12 font-800 hidden md:flex">
                          <strong className="mb-0.5 text-12 leading-5 text-primary font-800">
                            <div>358</div>
                          </strong>
                          <span className="text-10 font-600">
                            24h Live Players
                          </span>
                        </div>
                        <div className="flex flex-col text-12 font-800">
                          <strong className="mb-0.5 text-12 leading-5 text-primary font-800">
                            <div>23</div>
                          </strong>
                          <span className="text-10 font-600">
                            24h Wins Paid
                          </span>
                        </div>
                        <div className="flex flex-col text-12 font-800">
                          <strong className="mb-0.5 text-12 leading-5 text-primary font-800">
                            <div>$147,633,594.99</div>
                          </strong>
                          <span className="text-10 font-600">
                            All time wins paid
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button className="detrade-button hoverable hover:brightness-110 h-8 rounded-2 text-12 s768:h-10 s768:text-14 w-8 s768:w-10 s768:px-0 p-0 auto-ref741lql7kpv8 detrade-popover-trigger cursor-pointer bg-up/20 text-up">
                          <svg
                            className="transition-none text-up rotate-180 size-3.5 s768:size-4 s1920:size-5"
                            fill="none"
                            height="38"
                            viewBox="0 0 38 38"
                            width="38"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M33.4286 14.2063L26.9648 20.6701L21.5916 15.295L15.5933 21.2933L19 24.7L9.50001 24.7L9.50001 15.2L12.9067 18.6067L21.5916 9.92181L26.9648 15.295L31.6673 10.5944C29.5328 7.38178 26.2568 5.10076 22.5032 4.21357C18.7495 3.32638 14.799 3.89939 11.452 5.81648C8.10514 7.73357 5.61222 10.8514 4.47845 14.538C3.34468 18.2247 3.65486 22.2045 5.34615 25.671C7.03743 29.1375 9.98331 31.8314 13.5868 33.2068C17.1903 34.5822 21.182 34.5362 24.7528 33.0781C28.3237 31.6201 31.2067 28.859 32.8177 25.3545C34.4286 21.8499 34.647 17.864 33.4286 14.2044L33.4286 14.2063ZM36.3508 11.2461L36.3698 11.2651L36.3622 11.2727C37.4453 13.7047 38.0034 16.3377 38 19C38 29.4937 29.4937 38 19 38C8.50631 38 2.36318e-05 29.4937 2.45492e-05 19C2.54666e-05 8.50631 8.50631 2.03098e-05 19 2.12272e-05C26.733 2.19032e-05 33.383 4.61702 36.3508 11.2461Z"
                              fill="currentColor"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </button>
                        <button className="detrade-button hoverable hover:brightness-110 h-8 rounded-2 text-12 s768:h-10 s768:text-14 w-8 s768:w-10 s768:px-0 p-0 auto-ref7r9a50nipds detrade-popover-trigger cursor-pointer bg-up/20 text-up">
                          <svg
                            className="transition-none text-up rotate-180 size-3.5 s768:size-4 s1920:size-5"
                            fill="none"
                            height="38"
                            viewBox="0 0 38 38"
                            width="38"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M33.4286 14.2063L26.9648 20.6701L21.5916 15.295L15.5933 21.2933L19 24.7L9.50001 24.7L9.50001 15.2L12.9067 18.6067L21.5916 9.92181L26.9648 15.295L31.6673 10.5944C29.5328 7.38178 26.2568 5.10076 22.5032 4.21357C18.7495 3.32638 14.799 3.89939 11.452 5.81648C8.10514 7.73357 5.61222 10.8514 4.47845 14.538C3.34468 18.2247 3.65486 22.2045 5.34615 25.671C7.03743 29.1375 9.98331 31.8314 13.5868 33.2068C17.1903 34.5822 21.182 34.5362 24.7528 33.0781C28.3237 31.6201 31.2067 28.859 32.8177 25.3545C34.4286 21.8499 34.647 17.864 33.4286 14.2044L33.4286 14.2063ZM36.3508 11.2461L36.3698 11.2651L36.3622 11.2727C37.4453 13.7047 38.0034 16.3377 38 19C38 29.4937 29.4937 38 19 38C8.50631 38 2.36318e-05 29.4937 2.45492e-05 19C2.54666e-05 8.50631 8.50631 2.03098e-05 19 2.12272e-05C26.733 2.19032e-05 33.383 4.61702 36.3508 11.2461Z"
                              fill="currentColor"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </button>
                        <button className="detrade-button hoverable hover:brightness-110 h-8 rounded-2 text-12 s768:h-10 s768:text-14 w-8 s768:w-10 s768:px-0 p-0 auto-refl658ujdkhs detrade-popover-trigger cursor-pointer bg-down/20 text-down">
                          <svg
                            className="transition-none text-down -scale-x-100 size-3.5 s768:size-4 s1920:size-5"
                            fill="none"
                            height="38"
                            viewBox="0 0 38 38"
                            width="38"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M33.4286 14.2063L26.9648 20.6701L21.5916 15.295L15.5933 21.2933L19 24.7L9.50001 24.7L9.50001 15.2L12.9067 18.6067L21.5916 9.92181L26.9648 15.295L31.6673 10.5944C29.5328 7.38178 26.2568 5.10076 22.5032 4.21357C18.7495 3.32638 14.799 3.89939 11.452 5.81648C8.10514 7.73357 5.61222 10.8514 4.47845 14.538C3.34468 18.2247 3.65486 22.2045 5.34615 25.671C7.03743 29.1375 9.98331 31.8314 13.5868 33.2068C17.1903 34.5822 21.182 34.5362 24.7528 33.0781C28.3237 31.6201 31.2067 28.859 32.8177 25.3545C34.4286 21.8499 34.647 17.864 33.4286 14.2044L33.4286 14.2063ZM36.3508 11.2461L36.3698 11.2651L36.3622 11.2727C37.4453 13.7047 38.0034 16.3377 38 19C38 29.4937 29.4937 38 19 38C8.50631 38 2.36318e-05 29.4937 2.45492e-05 19C2.54666e-05 8.50631 8.50631 2.03098e-05 19 2.12272e-05C26.733 2.19032e-05 33.383 4.61702 36.3508 11.2461Z"
                              fill="currentColor"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </button>
                        <button className="detrade-button hoverable hover:brightness-110 h-8 rounded-2 text-12 s768:h-10 s768:text-14 w-8 s768:w-10 s768:px-0 p-0 auto-reffdega2llg1g detrade-popover-trigger cursor-pointer bg-up/20 text-up">
                          <svg
                            className="transition-none text-up rotate-180 size-3.5 s768:size-4 s1920:size-5"
                            fill="none"
                            height="38"
                            viewBox="0 0 38 38"
                            width="38"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M33.4286 14.2063L26.9648 20.6701L21.5916 15.295L15.5933 21.2933L19 24.7L9.50001 24.7L9.50001 15.2L12.9067 18.6067L21.5916 9.92181L26.9648 15.295L31.6673 10.5944C29.5328 7.38178 26.2568 5.10076 22.5032 4.21357C18.7495 3.32638 14.799 3.89939 11.452 5.81648C8.10514 7.73357 5.61222 10.8514 4.47845 14.538C3.34468 18.2247 3.65486 22.2045 5.34615 25.671C7.03743 29.1375 9.98331 31.8314 13.5868 33.2068C17.1903 34.5822 21.182 34.5362 24.7528 33.0781C28.3237 31.6201 31.2067 28.859 32.8177 25.3545C34.4286 21.8499 34.647 17.864 33.4286 14.2044L33.4286 14.2063ZM36.3508 11.2461L36.3698 11.2651L36.3622 11.2727C37.4453 13.7047 38.0034 16.3377 38 19C38 29.4937 29.4937 38 19 38C8.50631 38 2.36318e-05 29.4937 2.45492e-05 19C2.54666e-05 8.50631 8.50631 2.03098e-05 19 2.12272e-05C26.733 2.19032e-05 33.383 4.61702 36.3508 11.2461Z"
                              fill="currentColor"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </button>
                        {/* <button className="detrade-button hoverable hover:brightness-110 h-8 rounded-2 text-12 s768:h-10 s768:text-14 w-8 s768:w-10 s768:px-0 p-0 auto-refe3stss6ki9 detrade-popover-trigger cursor-pointer bg-up/20 text-up">
                          <svg
                            className="transition-none text-up rotate-180 size-3.5 s768:size-4 s1920:size-5"
                            fill="none"
                            height="38"
                            viewBox="0 0 38 38"
                            width="38"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M33.4286 14.2063L26.9648 20.6701L21.5916 15.295L15.5933 21.2933L19 24.7L9.50001 24.7L9.50001 15.2L12.9067 18.6067L21.5916 9.92181L26.9648 15.295L31.6673 10.5944C29.5328 7.38178 26.2568 5.10076 22.5032 4.21357C18.7495 3.32638 14.799 3.89939 11.452 5.81648C8.10514 7.73357 5.61222 10.8514 4.47845 14.538C3.34468 18.2247 3.65486 22.2045 5.34615 25.671C7.03743 29.1375 9.98331 31.8314 13.5868 33.2068C17.1903 34.5822 21.182 34.5362 24.7528 33.0781C28.3237 31.6201 31.2067 28.859 32.8177 25.3545C34.4286 21.8499 34.647 17.864 33.4286 14.2044L33.4286 14.2063ZM36.3508 11.2461L36.3698 11.2651L36.3622 11.2727C37.4453 13.7047 38.0034 16.3377 38 19C38 29.4937 29.4937 38 19 38C8.50631 38 2.36318e-05 29.4937 2.45492e-05 19C2.54666e-05 8.50631 8.50631 2.03098e-05 19 2.12272e-05C26.733 2.19032e-05 33.383 4.61702 36.3508 11.2461Z"
                              fill="currentColor"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </button>
                        <button className="detrade-button hoverable hover:brightness-110 h-8 rounded-2 text-12 s768:h-10 s768:text-14 w-8 s768:w-10 s768:px-0 p-0 auto-ref94omaemue2k detrade-popover-trigger cursor-pointer bg-down/20 text-down hidden:">
                          <svg
                            className="transition-none text-down -scale-x-100 size-3.5 s768:size-4 s1920:size-5"
                            fill="none"
                            height="38"
                            viewBox="0 0 38 38"
                            width="38"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M33.4286 14.2063L26.9648 20.6701L21.5916 15.295L15.5933 21.2933L19 24.7L9.50001 24.7L9.50001 15.2L12.9067 18.6067L21.5916 9.92181L26.9648 15.295L31.6673 10.5944C29.5328 7.38178 26.2568 5.10076 22.5032 4.21357C18.7495 3.32638 14.799 3.89939 11.452 5.81648C8.10514 7.73357 5.61222 10.8514 4.47845 14.538C3.34468 18.2247 3.65486 22.2045 5.34615 25.671C7.03743 29.1375 9.98331 31.8314 13.5868 33.2068C17.1903 34.5822 21.182 34.5362 24.7528 33.0781C28.3237 31.6201 31.2067 28.859 32.8177 25.3545C34.4286 21.8499 34.647 17.864 33.4286 14.2044L33.4286 14.2063ZM36.3508 11.2461L36.3698 11.2651L36.3622 11.2727C37.4453 13.7047 38.0034 16.3377 38 19C38 29.4937 29.4937 38 19 38C8.50631 38 2.36318e-05 29.4937 2.45492e-05 19C2.54666e-05 8.50631 8.50631 2.03098e-05 19 2.12272e-05C26.733 2.19032e-05 33.383 4.61702 36.3508 11.2461Z"
                              fill="currentColor"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </button> */}
                      </div>
                    </section>
                  </div>
                </div>

                {/* End */}
                <div className="detrade-card sticky bottom-0 z-10 p-3 s768:p-4">
                  <div className="space-y-3">
                    <div className="detrade-form-item">
                      <div
                        className="flex items-start flex-wrap gap-y-1 gap-x-2.5"
                        id="available-balance-input"
                      >
                        <div className="detrade-form-item w-full">
                          <label
                            className="mb-2 leading-4 text-secondary text-12 font-500 max-w-full block"
                            htmlFor=":r19s:"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-secondary">
                                  Amount(KRWFIAT)
                                </div>
                                <div className="text-12 text-secondary font-600 truncate">
                                  ≈$1.00
                                </div>
                              </div>
                            </div>
                          </label>
                          <div className="detrade-input relative flex flex-nowrap items-center rounded-2 px-3 shadow-sm font-700 transition-all border-input h-10 text-12 s768:h-10 s768:text-14 py-0.75 pr-0.75 grow-max gap-1 shrink-0 min-w-52 text-primary bg-layer5 border-0">
                            <label
                              className="rounded-full shrink-0 size-5 bg-contain"
                              htmlFor=":r19s:"
                              style={{
                                backgroundImage:
                                  'url("https://d1yfjv8uvrbjad.cloudfront.net/icons/KRWFIAT@3x.png")',
                              }}
                            />
                            <input
                              autoComplete="off"
                              className="h-full flex-1 w-0 basis-0 placeholder:text-quarterary placeholder:font-500 bg-transparent outline-none caret-brand"
                              defaultValue="1,449.27537"
                              id=":r19s:"
                              inputMode="decimal"
                              maxLength={12}
                              type="text"
                            />
                            <button className="detrade-button hoverable hover:text-primary hover:darkness h-full bg-layer6 text-secondary text-12 font-600 w-10 px-0">
                              1/2
                            </button>
                            <button className="detrade-button hoverable hover:text-primary hover:darkness h-full bg-layer6 text-secondary text-12 font-600 w-10">
                              2x
                            </button>
                          </div>
                        </div>
                        <div className="flex grow justify-between gap-2">
                          <button className="detrade-button hoverable bg-layer5 hover:text-primary hover:darkness h-10 s768:h-12 px-4 rounded-2 text-14 s768:text-16 flex-1 shrink-0 s768:min-w-12 s768:px-2 text-secondary border-thirdly">
                            <div className="flex items-baseline text-14 s1366:text-16">
                              <span className="text-10 s768:text-12">$</span>
                              <span>5</span>
                            </div>
                          </button>
                          <button className="detrade-button hoverable bg-layer5 hover:text-primary hover:darkness h-10 s768:h-12 px-4 rounded-2 text-14 s768:text-16 flex-1 shrink-0 s768:min-w-12 s768:px-2 text-secondary border-thirdly">
                            <div className="flex items-baseline text-14 s1366:text-16">
                              <span className="text-10 s768:text-12">$</span>
                              <span>10</span>
                            </div>
                          </button>
                          <button className="detrade-button hoverable bg-layer5 hover:text-primary hover:darkness h-10 s768:h-12 px-4 rounded-2 text-14 s768:text-16 flex-1 shrink-0 s768:min-w-12 s768:px-2 text-secondary border-thirdly">
                            <div className="flex items-baseline text-14 s1366:text-16">
                              <span className="text-10 s768:text-12">$</span>
                              <span>20</span>
                            </div>
                          </button>
                          <button className="detrade-button hoverable bg-layer5 hover:text-primary hover:darkness h-10 s768:h-12 px-4 rounded-2 text-14 s768:text-16 flex-1 shrink-0 s768:min-w-12 s768:px-2 text-secondary border-thirdly">
                            <div className="flex items-baseline text-14 s1366:text-16">
                              <span className="text-10 s768:text-12">$</span>
                              <span>50</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="relative flex h-11 s768:h-16 overflow-hidden rounded-2 s768:-space-x-2 s1366:-space-x-3"
                      id="up-down-direction-buttons"
                    >
                      <button className="detrade-button hoverable bg-transparent shadow-none! relative h-full flex-1 rounded-none text-white origin-left gap-2 s768:gap-3">
                        <div className="absolute inset-0 z-0 opacity-100! rounded-tr bg-up origin-bottom-right skew-x-10 s768:skew-x-[16deg] s1366:skew-x-[22deg]" />
                        <div className="text-16 relative">Up</div>
                        <svg
                          className="transition-none rotate-180 relative text-white size-7"
                          fill="none"
                          height="38"
                          viewBox="0 0 38 38"
                          width="38"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M33.4286 14.2063L26.9648 20.6701L21.5916 15.295L15.5933 21.2933L19 24.7L9.50001 24.7L9.50001 15.2L12.9067 18.6067L21.5916 9.92181L26.9648 15.295L31.6673 10.5944C29.5328 7.38178 26.2568 5.10076 22.5032 4.21357C18.7495 3.32638 14.799 3.89939 11.452 5.81648C8.10514 7.73357 5.61222 10.8514 4.47845 14.538C3.34468 18.2247 3.65486 22.2045 5.34615 25.671C7.03743 29.1375 9.98331 31.8314 13.5868 33.2068C17.1903 34.5822 21.182 34.5362 24.7528 33.0781C28.3237 31.6201 31.2067 28.859 32.8177 25.3545C34.4286 21.8499 34.647 17.864 33.4286 14.2044L33.4286 14.2063ZM36.3508 11.2461L36.3698 11.2651L36.3622 11.2727C37.4453 13.7047 38.0034 16.3377 38 19C38 29.4937 29.4937 38 19 38C8.50631 38 2.36318e-05 29.4937 2.45492e-05 19C2.54666e-05 8.50631 8.50631 2.03098e-05 19 2.12272e-05C26.733 2.19032e-05 33.383 4.61702 36.3508 11.2461Z"
                            fill="currentColor"
                            fillOpacity="0.75"
                          />
                        </svg>
                      </button>
                      <button className="detrade-button hoverable bg-transparent shadow-none! relative h-full flex-1 rounded-none text-white origin-right flex-row-reverse gap-2 s768:gap-3">
                        <div className="absolute inset-0 z-0 opacity-100! rounded-bl bg-down origin-top-left skew-x-10 s768:skew-x-[16deg] s1366:skew-x-[22deg]" />
                        <div className="text-16 relative">Down</div>
                        <svg
                          className="transition-none -scale-x-100 relative text-white size-7"
                          fill="none"
                          height="38"
                          viewBox="0 0 38 38"
                          width="38"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M33.4286 14.2063L26.9648 20.6701L21.5916 15.295L15.5933 21.2933L19 24.7L9.50001 24.7L9.50001 15.2L12.9067 18.6067L21.5916 9.92181L26.9648 15.295L31.6673 10.5944C29.5328 7.38178 26.2568 5.10076 22.5032 4.21357C18.7495 3.32638 14.799 3.89939 11.452 5.81648C8.10514 7.73357 5.61222 10.8514 4.47845 14.538C3.34468 18.2247 3.65486 22.2045 5.34615 25.671C7.03743 29.1375 9.98331 31.8314 13.5868 33.2068C17.1903 34.5822 21.182 34.5362 24.7528 33.0781C28.3237 31.6201 31.2067 28.859 32.8177 25.3545C34.4286 21.8499 34.647 17.864 33.4286 14.2044L33.4286 14.2063ZM36.3508 11.2461L36.3698 11.2651L36.3622 11.2727C37.4453 13.7047 38.0034 16.3377 38 19C38 29.4937 29.4937 38 19 38C8.50631 38 2.36318e-05 29.4937 2.45492e-05 19C2.54666e-05 8.50631 8.50631 2.03098e-05 19 2.12272e-05C26.733 2.19032e-05 33.383 4.61702 36.3508 11.2461Z"
                            fill="currentColor"
                            fillOpacity="0.75"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="detrade-card relative gap-2.5 s1920:gap-4 shrink-0 overflow-hidden hidden md:flex"
                id="up-down-players"
                style={{
                  width: "376px",
                }}
              >
                <div
                  className="flex-1 w-0 truncate text-up"
                  style={{
                    display: "block",
                    opacity: "1",
                  }}
                >
                  <div className="mb-4 text-center">
                    <svg
                      className="transition-none rotate-180 mx-auto size-10 s1366:size-11 s1920:size-13 rounded-full mb-2 p-1.5 text-white pointer-events-none bg-up"
                      fill="none"
                      height="38"
                      viewBox="0 0 38 38"
                      width="38"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M33.4286 14.2063L26.9648 20.6701L21.5916 15.295L15.5933 21.2933L19 24.7L9.50001 24.7L9.50001 15.2L12.9067 18.6067L21.5916 9.92181L26.9648 15.295L31.6673 10.5944C29.5328 7.38178 26.2568 5.10076 22.5032 4.21357C18.7495 3.32638 14.799 3.89939 11.452 5.81648C8.10514 7.73357 5.61222 10.8514 4.47845 14.538C3.34468 18.2247 3.65486 22.2045 5.34615 25.671C7.03743 29.1375 9.98331 31.8314 13.5868 33.2068C17.1903 34.5822 21.182 34.5362 24.7528 33.0781C28.3237 31.6201 31.2067 28.859 32.8177 25.3545C34.4286 21.8499 34.647 17.864 33.4286 14.2044L33.4286 14.2063ZM36.3508 11.2461L36.3698 11.2651L36.3622 11.2727C37.4453 13.7047 38.0034 16.3377 38 19C38 29.4937 29.4937 38 19 38C8.50631 38 2.36318e-05 29.4937 2.45492e-05 19C2.54666e-05 8.50631 8.50631 2.03098e-05 19 2.12272e-05C26.733 2.19032e-05 33.383 4.61702 36.3508 11.2461Z"
                        fill="currentColor"
                        fillOpacity="0.75"
                      />
                    </svg>
                    <span className="text-18 font-600">Up</span>
                  </div>
                  <div className="relative">
                    <div
                      style={{
                        opacity: "1",
                        transform: "none",
                      }}
                    >
                      <div className="relative mb-4 p-3 border-t-4 rounded-t-2 bg-linear-to-b to-transparent border-up from-up/20">
                        <div className="flex mb-6 text-12 font-400 text-up">
                          <div className="mr-1 text-secondary">Players</div>
                          <div className="font-600">15</div>
                          <div className="flex-1 text-right">$111.89</div>
                        </div>
                        <div className="flex justify-between text-14 text-primary font-500">
                          <div>Players</div>
                          <div>Bet</div>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 h-px bg-layer5 light:bg-layer2 -ml-1.5 s1920:-ml-2" />
                      </div>
                      <div
                        className="text-primary mb-3 overflow-hidden"
                        style={{
                          height: "424px",
                        }}
                      >
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-left"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "11",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://detrade.com/s/111.jpeg"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Clyde Kennan
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$9.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-up/20"
                            style={{
                              transform: "none",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-left"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "10",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://img2.distributedresourcestorage.com/avatar/default/head3_l"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Daiwde889
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$6.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-up/20"
                            style={{
                              transform: "scaleX(0.7)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-left"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "9",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://detrade.com/s/4jjksqwqsd.png"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Joseph Barrie
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$7.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-up/20"
                            style={{
                              transform: "scaleX(0.8)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-left"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "8",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://detrade.com/s/22222.jpeg"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Mask&&Monkey
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$8.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-up/20"
                            style={{
                              transform: "scaleX(0.9)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-left"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "7",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://img2.distributedresourcestorage.com/avatar/default/head1_l"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Pods338992
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$6.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-up/20"
                            style={{
                              transform: "scaleX(0.7)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-left"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "6",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://img2.distributedresourcestorage.com/avatar/default/head1_l"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Thjshdwwsj
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$6.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-up/20"
                            style={{
                              transform: "scaleX(0.7)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-left"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "5",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://img2.distributedresourcestorage.com/avatar/default/head5_l"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Ijksjdksjdk
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$6.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-up/20"
                            style={{
                              transform: "scaleX(0.7)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-left"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "4",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://img2.distributedresourcestorage.com/avatar/default/head3_l"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Uhjsjdkswww
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$6.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-up/20"
                            style={{
                              transform: "scaleX(0.7)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-left"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "3",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://img2.distributedresourcestorage.com/avatar/default/head3_l"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Hkdjskdjw
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$5.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-up/20"
                            style={{
                              transform: "scaleX(0.6)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-left"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "2",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://img2.distributedresourcestorage.com/avatar/default/head1_l"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            FuturesWin
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$5.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-up/20"
                            style={{
                              transform: "scaleX(0.6)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-left"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "1",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://img2.distributedresourcestorage.com/avatar/9385411/s"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            ♠️Oscar♠️
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$7.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-up/20"
                            style={{
                              transform: "scaleX(0.8)",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="h-9 rounded-full cursor-pointer overflow-hidden border-2 border-transparent bg-layer4 visible w-full opacity-100 transition-all"
                        style={{
                          backgroundClip: "padding-box, border-box",
                          backgroundImage:
                            "linear-gradient(to right, var(--bg-layer4), var(--bg-layer4)),linear-gradient(to right, #61FFD9, #CF87FC)",
                          backgroundOrigin: "padding-box, border-box",
                        }}
                      >
                        <div className="flex flex-nowrap items-center justify-between h-full p-2">
                          <div
                            className="flex items-center h-5 overflow-hidden rounded-full shrink-0 flex-nowrap"
                            style={{
                              width: "68px",
                            }}
                          >
                            <img
                              className="bg-layer2 size-5 rounded-full shrink-0 border border-white"
                              src="https://img2.distributedresourcestorage.com/avatar/9385411/s"
                              style={{
                                marginLeft: "0px",
                              }}
                            />
                            <img
                              className="bg-layer2 size-5 rounded-full shrink-0 border border-white"
                              src="https://img2.distributedresourcestorage.com/avatar/default/head4_l"
                              style={{
                                marginLeft: "-4px",
                              }}
                            />
                            <img
                              className="bg-layer2 size-5 rounded-full shrink-0 border border-white"
                              src="https://detrade.com/s/esdeq12.png"
                              style={{
                                marginLeft: "-4px",
                              }}
                            />
                            <img
                              className="bg-layer2 size-5 rounded-full shrink-0 border border-white relative z-10"
                              src="https://img2.distributedresourcestorage.com/avatar/default/head1_l"
                              style={{
                                marginLeft: "-4px",
                              }}
                            />
                            <img
                              className="bg-layer2 size-5 rounded-full shrink-0 border border-white"
                              src="https://img2.distributedresourcestorage.com/avatar/default/head3_l"
                              style={{
                                marginLeft: "-4px",
                              }}
                            />
                          </div>
                          <div className="flex items-center overflow-hidden shrink-0 flex-nowrap text-12 text-primary font-600">
                            <span className="whitespace-nowrap">1 +</span>
                            <svg
                              className="detrade-icon size-4"
                              fill="none"
                              height="1em"
                              viewBox="0 0 14 14"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.18205 7L5 10.1113L5.90897 11L10 7L5.90897 3L5 3.88875L8.18205 7Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex-1 w-0 truncate text-down"
                  style={{
                    display: "block",
                    flexBasis: "0px",
                    opacity: "1",
                  }}
                >
                  <div className="mb-4 text-center">
                    <svg
                      className="transition-none -scale-x-100 mx-auto size-10 s1366:size-11 s1920:size-13 rounded-full mb-2 p-1.5 text-white pointer-events-none bg-down"
                      fill="none"
                      height="38"
                      viewBox="0 0 38 38"
                      width="38"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M33.4286 14.2063L26.9648 20.6701L21.5916 15.295L15.5933 21.2933L19 24.7L9.50001 24.7L9.50001 15.2L12.9067 18.6067L21.5916 9.92181L26.9648 15.295L31.6673 10.5944C29.5328 7.38178 26.2568 5.10076 22.5032 4.21357C18.7495 3.32638 14.799 3.89939 11.452 5.81648C8.10514 7.73357 5.61222 10.8514 4.47845 14.538C3.34468 18.2247 3.65486 22.2045 5.34615 25.671C7.03743 29.1375 9.98331 31.8314 13.5868 33.2068C17.1903 34.5822 21.182 34.5362 24.7528 33.0781C28.3237 31.6201 31.2067 28.859 32.8177 25.3545C34.4286 21.8499 34.647 17.864 33.4286 14.2044L33.4286 14.2063ZM36.3508 11.2461L36.3698 11.2651L36.3622 11.2727C37.4453 13.7047 38.0034 16.3377 38 19C38 29.4937 29.4937 38 19 38C8.50631 38 2.36318e-05 29.4937 2.45492e-05 19C2.54666e-05 8.50631 8.50631 2.03098e-05 19 2.12272e-05C26.733 2.19032e-05 33.383 4.61702 36.3508 11.2461Z"
                        fill="currentColor"
                        fillOpacity="0.75"
                      />
                    </svg>
                    <span className="text-18 font-600">Down</span>
                  </div>
                  <div className="relative">
                    <div
                      style={{
                        opacity: "1",
                        transform: "none",
                      }}
                    >
                      <div className="relative mb-4 p-3 border-t-4 rounded-t-2 bg-linear-to-b to-transparent border-down from-down/20">
                        <div className="flex mb-6 text-12 font-400 text-down">
                          <div className="mr-1 text-secondary">Players</div>
                          <div className="font-600">14</div>
                          <div className="flex-1 text-right">$105.90</div>
                        </div>
                        <div className="flex justify-between text-14 text-primary font-500">
                          <div>Players</div>
                          <div>Bet</div>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 h-px bg-layer5 light:bg-layer2 -mr-1.5 s1920:-mr-2" />
                      </div>
                      <div
                        className="text-primary mb-3 overflow-hidden"
                        style={{
                          height: "424px",
                        }}
                      >
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-right"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "11",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://img2.distributedresourcestorage.com/avatar/default/head2_l"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Lhgfsyqwsd
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$9.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-down/20"
                            style={{
                              transform: "none",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-right"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "10",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://detrade.com/s/44444.png"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Karen Stephens
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$6.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-down/20"
                            style={{
                              transform: "scaleX(0.7)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-right"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "9",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://img2.distributedresourcestorage.com/avatar/27294667/s"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Jnipgbjbppy
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$5.00</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-down/20"
                            style={{
                              transform: "scaleX(0.5)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-right"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "8",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://detrade.com/s/2222.jpeg"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Roderick
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$8.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-down/20"
                            style={{
                              transform: "scaleX(0.9)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-right"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "7",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://detrade.com/s/dkalep5223.png"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Nehemiah
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$9.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-down/20"
                            style={{
                              transform: "none",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-right"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "6",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://img2.distributedresourcestorage.com/avatar/default/head6_l"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Owetywet
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$7.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-down/20"
                            style={{
                              transform: "scaleX(0.8)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-right"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "5",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://detrade.com/s/ccca.jpg"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Mackintosh
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$5.00</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-down/20"
                            style={{
                              transform: "scaleX(0.5)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-right"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "4",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://img2.distributedresourcestorage.com/avatar/default/head4_l"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            RioWop
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$5.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-down/20"
                            style={{
                              transform: "scaleX(0.6)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-right"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "3",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://img2.distributedresourcestorage.com/avatar/default/head2_l"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Yhsdhsmndms
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$9.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-down/20"
                            style={{
                              transform: "none",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-right"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "2",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://img2.distributedresourcestorage.com/avatar/default/head6_l"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            YoneJksl
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$6.99</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-down/20"
                            style={{
                              transform: "scaleX(0.7)",
                            }}
                          />
                        </div>
                        <div
                          className="relative flex items-center h-7 w-full mb-4 pr-1 text-12 s1920:text-14 rounded overflow-hidden float-right"
                          style={{
                            marginTop: "0px",
                            opacity: "1",
                            width: "100%",
                            zIndex: "1",
                          }}
                        >
                          <img
                            className="bg-layer2 size-7 rounded-2 mr-2"
                            src="https://detrade.com/s/dialdm9012.png"
                          />
                          <div className="relative z-10 mr-2 truncate font-600 s1440:font-700">
                            Archibald
                          </div>
                          <div className="relative z-10 flex justify-end flex-1 mr-1">
                            <div>$5.00</div>
                          </div>
                          <div
                            className="absolute inset-y-1 left-10 right-0 origin-right bg-linear-to-l to-transparent from-down/20"
                            style={{
                              transform: "scaleX(0.5)",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="h-9 rounded-full cursor-pointer overflow-hidden border-2 border-transparent bg-layer4 visible w-full opacity-100 transition-all"
                        style={{
                          backgroundClip: "padding-box, border-box",
                          backgroundImage:
                            "linear-gradient(to right, var(--bg-layer4), var(--bg-layer4)),linear-gradient(to right, #61FFD9, #CF87FC)",
                          backgroundOrigin: "padding-box, border-box",
                        }}
                      >
                        <div className="flex flex-nowrap items-center justify-between h-full p-2">
                          <div
                            className="flex items-center h-5 overflow-hidden rounded-full shrink-0 flex-nowrap"
                            style={{
                              width: "68px",
                            }}
                          >
                            <img
                              className="bg-layer2 size-5 rounded-full shrink-0 border border-white"
                              src="https://detrade.com/s/dialdm9012.png"
                              style={{
                                marginLeft: "0px",
                              }}
                            />
                            <img
                              className="bg-layer2 size-5 rounded-full shrink-0 border border-white"
                              src="https://detrade.com/s/jkkdsowe.png"
                              style={{
                                marginLeft: "-4px",
                              }}
                            />
                            <img
                              className="bg-layer2 size-5 rounded-full shrink-0 border border-white"
                              src="https://img2.distributedresourcestorage.com/avatar/default/head2_l"
                              style={{
                                marginLeft: "-4px",
                              }}
                            />
                            <img
                              className="bg-layer2 size-5 rounded-full shrink-0 border border-white relative z-10"
                              src="https://img2.distributedresourcestorage.com/avatar/default/head5_l"
                              style={{
                                marginLeft: "-4px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="space-y-3 detrade-card p-3"
              data-orientation="horizontal"
              dir="ltr"
            >
              <div className="detrade-scroll-list relative flex overflow-x-auto no-scrollbar select-none rounded-none bg-inherit">
                <div
                  aria-orientation="horizontal"
                  className="relative text-14 leading-4 text-secondary font-500 rounded-none bg-inherit min-h-9 s768:min-h-10 flex grow justify-between s768:justify-start gap-2 border-b border-layer5 s768:gap-12"
                  data-orientation="horizontal"
                  role="tablist"
                  style={{
                    outline: "none",
                  }}
                  tabIndex={0}
                >
                  <button
                    aria-controls="radix-:r19u:-content-0"
                    aria-selected="false"
                    className="detrade-button bg-transparent shadow-none! relative px-3 outline-none transition-colors duration-300 text-tertiary z-20 font-500"
                    data-orientation="horizontal"
                    data-radix-collection-item=""
                    data-state="inactive"
                    id="radix-:r19u:-trigger-0"
                    role="tab"
                    tabIndex={-1}
                    type="button"
                  >
                    Positions
                  </button>
                  <button
                    aria-controls="radix-:r19u:-content-1"
                    aria-selected="false"
                    className="detrade-button bg-transparent shadow-none! relative px-3 outline-none transition-colors duration-300 text-tertiary z-20 font-500"
                    data-orientation="horizontal"
                    data-radix-collection-item=""
                    data-state="inactive"
                    id="radix-:r19u:-trigger-1"
                    role="tab"
                    tabIndex={-1}
                    type="button"
                  >
                    History
                  </button>
                  <button
                    aria-controls="radix-:r19u:-content-2"
                    aria-selected="true"
                    className="detrade-button bg-transparent shadow-none! relative px-3 outline-none transition-colors duration-300 z-10 text-primary font-700"
                    data-orientation="horizontal"
                    data-radix-collection-item=""
                    data-state="active"
                    id="radix-:r19u:-trigger-2"
                    role="tab"
                    tabIndex={-1}
                    type="button"
                  >
                    <div className="absolute -bottom-px z-10 inset-x-0 h-0.5 bg-brand" />
                    Leaderboard
                  </button>
                </div>
                <button className="detrade-button shadow-none! sticky z-30 w-8 shrink-0 self-stretch -ml-8! bg-inherit shadow-r rounded-none opacity-0 pointer-events-none left-0 rotate-180 -order-1">
                  <svg
                    className="detrade-icon size-7"
                    fill="none"
                    height="1em"
                    viewBox="0 0 14 14"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.18205 7L5 10.1113L5.90897 11L10 7L5.90897 3L5 3.88875L8.18205 7Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button className="detrade-button shadow-none! sticky z-30 w-8 shrink-0 self-stretch -ml-8! bg-inherit shadow-r rounded-none opacity-0 pointer-events-none right-0">
                  <svg
                    className="detrade-icon size-7"
                    fill="none"
                    height="1em"
                    viewBox="0 0 14 14"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.18205 7L5 10.1113L5.90897 11L10 7L5.90897 3L5 3.88875L8.18205 7Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <div
                aria-labelledby="radix-:r19u:-trigger-0"
                data-orientation="horizontal"
                data-state="inactive"
                hidden
                id="radix-:r19u:-content-0"
                role="tabpanel"
                tabIndex={0}
              />
              <div
                aria-labelledby="radix-:r19u:-trigger-1"
                data-orientation="horizontal"
                data-state="inactive"
                hidden
                id="radix-:r19u:-content-1"
                role="tabpanel"
                tabIndex={0}
              />
              <div
                aria-labelledby="radix-:r19u:-trigger-2"
                data-orientation="horizontal"
                data-state="active"
                id="radix-:r19u:-content-2"
                role="tabpanel"
                tabIndex={0}
              >
                <div className="flex items-center gap-x-3">
                  <div
                    className="detrade-select flex justify-between items-center gap-2 pl-3 pr-1.5 rounded-2 bg-layer3 border border-input select-none overflow-hidden font-600 h-10 text-12 s768:h-10 s768:text-14 auto-ref8ovu73hdhss detrade-popover-trigger cursor-pointer text-primary w-34"
                    id=""
                  >
                    <div className="flex-1 truncate">PNL</div>
                    <svg
                      className="detrade-icon transition-all hover:text-current size-3.5 rotate-90"
                      fill="none"
                      height="1em"
                      viewBox="0 0 14 14"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.18205 7L5 10.1113L5.90897 11L10 7L5.90897 3L5 3.88875L8.18205 7Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div
                    className="detrade-select flex justify-between items-center gap-2 pl-3 pr-1.5 rounded-2 bg-layer3 border border-input select-none overflow-hidden font-600 h-10 text-12 s768:h-10 s768:text-14 auto-reffsc5ocif8ug detrade-popover-trigger cursor-pointer text-primary w-34"
                    id=""
                  >
                    <div className="flex-1 truncate">day</div>
                    <svg
                      className="detrade-icon transition-all hover:text-current size-3.5 rotate-90"
                      fill="none"
                      height="1em"
                      viewBox="0 0 14 14"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.18205 7L5 10.1113L5.90897 11L10 7L5.90897 3L5 3.88875L8.18205 7Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  className="detrade-scroll-container relative flex detrade-table overflow-auto overscroll-auto"
                  dir="ltr"
                  style={
                    {
                      ["--radix-scroll-area-corner-height" as any]: "0px",
                      ["--radix-scroll-area-corner-width" as any]: "0px",
                      position: "relative",
                    } as React.CSSProperties
                  }
                >
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "[data-radix-scroll-area-viewport] {  scrollbar-width: none;  -ms-overflow-style: none;  -webkit-overflow-scrolling: touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar {  display: none;}:where([data-radix-scroll-area-viewport]) {  display: flex;  flex-direction: column;  align-items: stretch;}:where([data-radix-scroll-area-content]) {  grow: 1;}",
                    }}
                  />
                  <div
                    className="detrade-scroll-viewport w-full"
                    data-radix-scroll-area-viewport=""
                    style={{
                      overflow: "scroll",
                    }}
                  >
                    <div
                      data-radix-scroll-area-content=""
                      style={{
                        minWidth: "fit-content",
                      }}
                    >
                      <table className="w-full text-primary font-500 text-13 leading-6">
                        <thead className="relative z-10 bg-inherit">
                          <tr className="text-secondary normal-case whitespace-nowrap">
                            <th
                              align="left"
                              className="font-600 py-2 first:pl-2 last:pr-2 pl-3"
                              style={{
                                minWidth: "1px",
                              }}
                            >
                              <div className="items-center gap-1 inline-flex">
                                Trader
                              </div>
                            </th>
                            <th
                              align="right"
                              className="font-600 py-2 first:pl-2 last:pr-2 px-3"
                              style={{
                                minWidth: "90px",
                              }}
                            >
                              <div className="items-center gap-1 inline-flex">
                                Trades
                              </div>
                            </th>
                            <th
                              align="right"
                              className="font-600 py-2 first:pl-2 last:pr-2 pr-3"
                              style={{
                                minWidth: "90px",
                              }}
                            >
                              <div className="items-center gap-1 inline-flex">
                                Winning
                              </div>
                            </th>
                            <th
                              align="right"
                              className="font-600 py-2 first:pl-2 last:pr-2 pr-3"
                              style={{
                                minWidth: "100px",
                              }}
                            >
                              <div className="items-center gap-1 inline-flex">
                                Win rate
                              </div>
                            </th>
                            <th
                              align="right"
                              className="font-600 py-2 first:pl-2 last:pr-2 pr-3"
                              style={{
                                minWidth: "120px",
                              }}
                            >
                              <div className="items-center gap-1 inline-flex">
                                PnL%
                              </div>
                            </th>
                            <th
                              align="right"
                              className="font-600 py-2 first:pl-2 last:pr-2 pr-3"
                              style={{
                                minWidth: "110px",
                              }}
                            >
                              <div className="items-center gap-1 inline-flex">
                                Total profit
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-inherit">
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/103703461/s"
                                  />
                                </span>
                                <div className="truncate">Erinyes</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              5
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              5
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              100%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              65.43%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $114.39
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/100013307/s"
                                  />
                                </span>
                                <div className="truncate">xeekey</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              3
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              66%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              43.05%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $34.31
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://resource.cwallet.com/head/b9.png"
                                  />
                                </span>
                                <div className="truncate">tittish</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              33
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              18
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              54%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              30.15%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $27.87
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/103535210/s"
                                  />
                                </span>
                                <div className="truncate">suzxkura</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              5
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              4
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              80%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              43.33%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $25.16
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://resource.cwallet.com/head/b10.png"
                                  />
                                </span>
                                <div className="truncate">工作代理</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              19
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              11
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              57%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              26.51%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $23.57
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/100964106/s"
                                  />
                                </span>
                                <div className="truncate">Cityhatcback</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              73
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              41
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              56%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              9.93%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $22.57
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/77214067/s"
                                  />
                                </span>
                                <div className="truncate">Zeeshan Ali786</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              1
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              1
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              100%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              57.17%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $20.39
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://resource.cctip.io/head_img/2025December/affa043fe7256271c17f7407eec34819.png"
                                  />
                                </span>
                                <div className="truncate">rizwan</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              6
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              5
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              83%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              68.85%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $17.68
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/default/head6_l"
                                  />
                                </span>
                                <div className="truncate">Owetywet</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              100%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              91.41%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $17.35
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/101401837/s"
                                  />
                                </span>
                                <div className="truncate">Simple10</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              29
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              20
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              68%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              38.19%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $15.65
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/default/head5_l"
                                  />
                                </span>
                                <div className="truncate">YoneJksl</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              100%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              91.99%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $14.71
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/default/head2_l"
                                  />
                                </span>
                                <div className="truncate">HomeToCat</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              100%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              92.66%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $13.89
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/27294667/s"
                                  />
                                </span>
                                <div className="truncate">Jnipgbjbppy</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              100%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              92.51%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $12.94
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://detrade.com/s/ccca.jpg"
                                  />
                                </span>
                                <div className="truncate">Mackintosh</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              100%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              91.83%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $11.93
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://detrade.com/s/dkalep5223.png"
                                  />
                                </span>
                                <div className="truncate">Nehemiah</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              100%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              91.83%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $11.93
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://resource.cctip.io/head_img/2025November/679e3300d9e792ad697e8b78e4494664.png"
                                  />
                                </span>
                                <div className="truncate">Itzicy</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              1
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              1
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              100%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              80.59%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $11.15
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/83241697/s"
                                  />
                                </span>
                                <div className="truncate">Ommmmm</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              14
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              8
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              57%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              23.17%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $10.42
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/18198821/s"
                                  />
                                </span>
                                <div className="truncate">Pennyworth</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              13
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              9
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              69%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              38.08%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $10.10
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/75097603/s"
                                  />
                                </span>
                                <div className="truncate">XGames080</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              38
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              23
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              60%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              7.97%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $9.01
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center max-w-20 s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://resource.cwallet.com/head/b21.png"
                                  />
                                </span>
                                <div className="truncate">s***@gmail.com</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              15
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              9
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              60%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              32.16%
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex justify-end font-600 text-up">
                                $8.85
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
