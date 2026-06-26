"use client";

import React, { useRef, useState, useEffect } from "react";

export function CardCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  // Auto-slide state
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide effect (runs every 3 seconds)
  useEffect(() => {
    if (isHovered || isDragging) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;
        
        scrollRef.current.scrollTo({
          left: isAtEnd ? 0 : scrollLeft + 468, // 468px is approx 1 card width + margin
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, isDragging]);

  // Mouse Event Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  // Touch Event Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b0b17]">
      <div
        aria-roledescription="carousel"
        className="relative focus:outline-none"
        role="region"
      >
        <div
          ref={scrollRef}
          className="overflow-x-auto overflow-y-hidden select-none cursor-grab active:cursor-grabbing hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}} />
          <div
            className="flex items-start flex-row -ms-4 !items-stretch"
            style={{
              transform: "translate3d(0px, 0px, 0px)",
            }}
          >
            <div
              aria-roledescription="slide"
              className="shrink-0 basis-1/4 max-w-[420px] min-w-[420px] py-6 ps-0 ml-12 h-full"
              role="group"
            >
              <div
                className="relative flex rounded-lg bg-default ring ring-default [--spotlight-size:400px] before:absolute before:-inset-px before:pointer-events-none before:rounded-[inherit] before:bg-[radial-gradient(var(--spotlight-size)_var(--spotlight-size)_at_calc(var(--spotlight-x,0px))_calc(var(--spotlight-y,0px)),var(--spotlight-color),transparent_70%)] [--spotlight-color:var(--ui-primary)]"
                data-orientation="vertical"
                style={
                  {
                    "--spotlight-x": "821px",
                    "--spotlight-y": "-92.5625px",
                  } as React.CSSProperties
                }
              >
                <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-default/90" />
                <div className="relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 sm:p-6 p-6 sm:px-8 lg:px-8">
                  <div className="flex flex-col flex-1 items-start">
                    <div className="relative block pr-20 flex-1">
                      <div className="text-pretty text-highlighted text-xl font-extrabold tracking-tight">
                        대시보드
                      </div>
                      <div className="text-pretty mt-1 text-md text-neutral-400">
                        Dashboard
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-6 top-6">
                    <div className="w-14 h-14">
                      <div className="w-full h-full grid place-items-center">
                        <img
                          alt=""
                          height="32"
                          src="/assets/icons/section-2-0.svg"
                          width="32"
                        />
                      </div>
                    </div>
                  </div>
                  <ul className="mt-1 space-y-2">
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        사이트 운영 현황을 쉽게 파악하는 홈화면
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        보유머니 / 포인트 / 수익 등 지표 실시간 요약
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        금일 입금•출금•베팅 현황 차트 제공
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        고액 베팅 유저 및 위험 유저 알림
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        게임별(카지노, 슬롯, 스포츠) 참여 현황 시각화
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        알값 / 유저 루징 / 돌링률 등 자동 집계
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              aria-roledescription="slide"
              className="shrink-0 basis-1/4 max-w-[420px] min-w-[420px] py-6 ps-0 ml-12 h-full"
              role="group"
            >
              <div
                className="relative flex rounded-lg bg-default ring ring-default [--spotlight-size:400px] before:absolute before:-inset-px before:pointer-events-none before:rounded-[inherit] before:bg-[radial-gradient(var(--spotlight-size)_var(--spotlight-size)_at_calc(var(--spotlight-x,0px))_calc(var(--spotlight-y,0px)),var(--spotlight-color),transparent_70%)] [--spotlight-color:var(--ui-primary)]"
                data-orientation="vertical"
                style={
                  {
                    "--spotlight-x": "353px",
                    "--spotlight-y": "-92.5625px",
                  } as React.CSSProperties
                }
              >
                <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-default/90" />
                <div className="relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 sm:p-6 p-6 sm:px-8 lg:px-8">
                  <div className="flex flex-col flex-1 items-start">
                    <div className="relative block pr-20 flex-1">
                      <div className="text-pretty text-highlighted text-xl font-extrabold tracking-tight">
                        쿠폰관리
                      </div>
                      <div className="text-pretty mt-1 text-md text-neutral-400">
                        Coupon Management
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-6 top-6">
                    <div className="w-14 h-14">
                      <div className="w-full h-full grid place-items-center">
                        <img
                          alt=""
                          height="32"
                          src="/assets/icons/section-2-1.svg"
                          width="32"
                        />
                      </div>
                    </div>
                  </div>
                  <ul className="mt-1 space-y-2">
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        보너스 및 이벤트 쿠폰 발급, 지급 이력 통합 관리
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        본사에서 쿠폰을 구매해야 발급 가능
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        무료 쿠폰 / 조건부 쿠폰 지급 설정
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        전체/그룹/개별 회원 대상 지급
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        쿠폰별 만료일, 지급금액, 사용 조건 지정
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        쿠폰 발급 시 SMS 알림 연동 가능
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              aria-roledescription="slide"
              className="shrink-0 basis-1/4 max-w-[420px] min-w-[420px] py-6 ps-0 ml-12 h-full"
              role="group"
            >
              <div
                className="relative flex rounded-lg bg-default ring ring-default [--spotlight-size:400px] before:absolute before:-inset-px before:pointer-events-none before:rounded-[inherit] before:bg-[radial-gradient(var(--spotlight-size)_var(--spotlight-size)_at_calc(var(--spotlight-x,0px))_calc(var(--spotlight-y,0px)),var(--spotlight-color),transparent_70%)] [--spotlight-color:var(--ui-primary)]"
                data-orientation="vertical"
                style={
                  {
                    "--spotlight-x": "-115px",
                    "--spotlight-y": "-92.5625px",
                  } as React.CSSProperties
                }
              >
                <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-default/90" />
                <div className="relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 sm:p-6 p-6 sm:px-8 lg:px-8">
                  <div className="flex flex-col flex-1 items-start">
                    <div className="relative block pr-20 flex-1">
                      <div className="text-pretty text-highlighted text-xl font-extrabold tracking-tight">
                        통계관리
                      </div>
                      <div className="text-pretty mt-1 text-md text-neutral-400">
                        Analytics Management
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-6 top-6">
                    <div className="w-14 h-14">
                      <div className="w-full h-full grid place-items-center">
                        <img
                          alt=""
                          height="32"
                          src="/assets/icons/section-2-2.svg"
                          width="32"
                        />
                      </div>
                    </div>
                  </div>
                  <ul className="mt-1 space-y-2">
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        일/주/월별 통계 및 게임 수익률, 이용 분석 제공
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        일간/주간/에이전트별 집계 통계
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        입금/출금/돌링/루징/정산 요약
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        스포츠 베팅 통계 (폴더 수, 승률, 순이익 등)
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        인기 게임, 유저 참여도, 시간대별 트래픽 추이
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        통계 다운로드(Excel, CSV) 기능 제공
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              aria-roledescription="slide"
              className="shrink-0 basis-1/4 max-w-[420px] min-w-[420px] py-6 ps-0 ml-12 h-full"
              role="group"
            >
              <div
                className="relative flex rounded-lg bg-default ring ring-default [--spotlight-size:400px] before:absolute before:-inset-px before:pointer-events-none before:rounded-[inherit] before:bg-[radial-gradient(var(--spotlight-size)_var(--spotlight-size)_at_calc(var(--spotlight-x,0px))_calc(var(--spotlight-y,0px)),var(--spotlight-color),transparent_70%)] [--spotlight-color:var(--ui-primary)]"
                data-orientation="vertical"
                style={
                  {
                    "--spotlight-x": "-583px",
                    "--spotlight-y": "-92.5625px",
                  } as React.CSSProperties
                }
              >
                <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-default/90" />
                <div className="relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 sm:p-6 p-6 sm:px-8 lg:px-8">
                  <div className="flex flex-col flex-1 items-start">
                    <div className="relative block pr-20 flex-1">
                      <div className="text-pretty text-highlighted text-xl font-extrabold tracking-tight">
                        회원관리
                      </div>
                      <div className="text-pretty mt-1 text-md text-neutral-400">
                        User Management
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-6 top-6">
                    <div className="w-14 h-14">
                      <div className="w-full h-full grid place-items-center">
                        <img
                          alt=""
                          height="32"
                          src="/assets/icons/section-2-0.svg"
                          width="32"
                        />
                      </div>
                    </div>
                  </div>
                  <ul className="mt-1 space-y-2">
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        등록, 레벨, 접속 상태 및 머니 내역 통합 제어
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        전체 / 신규 / 접속 베팅 회원 리스트 조회
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        회원별 머니 / 포인트 / 베팅내역 및 수동 조정
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        레벨별 베팅 한도 및 보너스 정책 설정
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        추천인 구조 관리 및 추천 루징/몰링 집계
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        부정 사용자 IP• 디바이스 중복 탐지 및 제재 기능
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              aria-roledescription="slide"
              className="shrink-0 basis-1/4 max-w-[420px] min-w-[420px] py-6 ps-0 ml-12 h-full"
              role="group"
            >
              <div
                className="relative flex rounded-lg bg-default ring ring-default [--spotlight-size:400px] before:absolute before:-inset-px before:pointer-events-none before:rounded-[inherit] before:bg-[radial-gradient(var(--spotlight-size)_var(--spotlight-size)_at_calc(var(--spotlight-x,0px))_calc(var(--spotlight-y,0px)),var(--spotlight-color),transparent_70%)] [--spotlight-color:var(--ui-primary)]"
                data-orientation="vertical"
                style={
                  {
                    "--spotlight-x": "-1051px",
                    "--spotlight-y": "-92.5625px",
                  } as React.CSSProperties
                }
              >
                <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-default/90" />
                <div className="relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 sm:p-6 p-6 sm:px-8 lg:px-8">
                  <div className="flex flex-col flex-1 items-start">
                    <div className="relative block pr-20 flex-1">
                      <div className="text-pretty text-highlighted text-xl font-extrabold tracking-tight">
                        베팅관리
                      </div>
                      <div className="text-pretty mt-1 text-md text-neutral-400">
                        Betting Management
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-6 top-6">
                    <div className="w-14 h-14">
                      <div className="w-full h-full grid place-items-center">
                        <img
                          alt=""
                          height="32"
                          src="/assets/icons/section-2-1.svg"
                          width="32"
                        />
                      </div>
                    </div>
                  </div>
                  <ul className="mt-1 space-y-2">
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        카지노, 슬롯, 스포츠, 미니게임 모든 내역 관리
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        게임별 전체 베팅/당첨/패배/보너스 내역 조회
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        유저별 베팅 이력 + 결과 검증 (수동 정산 가능)
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        단폴/다폴/크로스/ 스페셜 베팅 유형 필터
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        미정산, 적특, 이상 베팅 내역 자동 필터링
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        승부 조작 탐지 및 알림 조건 설정
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              aria-roledescription="slide"
              className="shrink-0 basis-1/4 max-w-[420px] min-w-[420px] py-6 ps-0 ml-12 h-full"
              role="group"
            >
              <div
                className="relative flex rounded-lg bg-default ring ring-default [--spotlight-size:400px] before:absolute before:-inset-px before:pointer-events-none before:rounded-[inherit] before:bg-[radial-gradient(var(--spotlight-size)_var(--spotlight-size)_at_calc(var(--spotlight-x,0px))_calc(var(--spotlight-y,0px)),var(--spotlight-color),transparent_70%)] [--spotlight-color:var(--ui-primary)]"
                data-orientation="vertical"
                style={
                  {
                    "--spotlight-x": "-1519px",
                    "--spotlight-y": "-92.5625px",
                  } as React.CSSProperties
                }
              >
                <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-default/90" />
                <div className="relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 sm:p-6 p-6 sm:px-8 lg:px-8">
                  <div className="flex flex-col flex-1 items-start">
                    <div className="relative block pr-20 flex-1">
                      <div className="text-pretty text-highlighted text-xl font-extrabold tracking-tight">
                        정산관리
                      </div>
                      <div className="text-pretty mt-1 text-md text-neutral-400">
                        Settlement Management
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-6 top-6">
                    <div className="w-14 h-14">
                      <div className="w-full h-full grid place-items-center">
                        <img
                          alt=""
                          height="32"
                          src="/assets/icons/section-2-2.svg"
                          width="32"
                        />
                      </div>
                    </div>
                  </div>
                  <ul className="mt-1 space-y-2">
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        유저 수익, 이벤트 페이백 및 에이전트 정산 관리
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        개인/에이전트 정산 자동 계산
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        스포츠/카지노/슬롯 몰링•루징 기준 정산
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        손실 페이백(예: 주간 손실액 5% 자동 지급)
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        정산 내역 로그 / 재지급 / 지급 상태 구분
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        정산 결과 엑셀 출력 및 알림 발송
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              aria-roledescription="slide"
              className="shrink-0 basis-1/4 max-w-[420px] min-w-[420px] py-6 ps-0 ml-12 h-full"
              role="group"
            >
              <div
                className="relative flex rounded-lg bg-default ring ring-default [--spotlight-size:400px] before:absolute before:-inset-px before:pointer-events-none before:rounded-[inherit] before:bg-[radial-gradient(var(--spotlight-size)_var(--spotlight-size)_at_calc(var(--spotlight-x,0px))_calc(var(--spotlight-y,0px)),var(--spotlight-color),transparent_70%)] [--spotlight-color:var(--ui-primary)]"
                data-orientation="vertical"
                style={
                  {
                    "--spotlight-x": "-1987px",
                    "--spotlight-y": "-92.5625px",
                  } as React.CSSProperties
                }
              >
                <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-default/90" />
                <div className="relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 sm:p-6 p-6 sm:px-8 lg:px-8">
                  <div className="flex flex-col flex-1 items-start">
                    <div className="relative block pr-20 flex-1">
                      <div className="text-pretty text-highlighted text-xl font-extrabold tracking-tight">
                        입출금 관리
                      </div>
                      <div className="text-pretty mt-1 text-md text-neutral-400">
                        Payments Management
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-6 top-6">
                    <div className="w-14 h-14">
                      <div className="w-full h-full grid place-items-center">
                        <img
                          alt=""
                          height="32"
                          src="/assets/icons/section-2-0.svg"
                          width="32"
                        />
                      </div>
                    </div>
                  </div>
                  <ul className="mt-1 space-y-2">
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        유저의 입금 신청, 출금 요청 처리 및 이력 관리
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        충전 신청 / 환전 신청 / 입•출금 처리 상태 관리
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        입금 계좌 정보 자동 안내 및 상태 체크
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        출금 시 몰링/루징 조건 자동 검증
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        입출금 대기 시간, 점검시간 블록 기능
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        엑셀 기반 일괄 처리 및 관리자 메모 남기기
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              aria-roledescription="slide"
              className="shrink-0 basis-1/4 max-w-[420px] min-w-[420px] py-6 ps-0 ml-12 h-full"
              role="group"
            >
              <div
                className="relative flex rounded-lg bg-default ring ring-default [--spotlight-size:400px] before:absolute before:-inset-px before:pointer-events-none before:rounded-[inherit] before:bg-[radial-gradient(var(--spotlight-size)_var(--spotlight-size)_at_calc(var(--spotlight-x,0px))_calc(var(--spotlight-y,0px)),var(--spotlight-color),transparent_70%)] [--spotlight-color:var(--ui-primary)]"
                data-orientation="vertical"
                style={
                  {
                    "--spotlight-x": "-2455px",
                    "--spotlight-y": "-92.5625px",
                  } as React.CSSProperties
                }
              >
                <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-default/90" />
                <div className="relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 sm:p-6 p-6 sm:px-8 lg:px-8">
                  <div className="flex flex-col flex-1 items-start">
                    <div className="relative block pr-20 flex-1">
                      <div className="text-pretty text-highlighted text-xl font-extrabold tracking-tight">
                        게임관리
                      </div>
                      <div className="text-pretty mt-1 text-md text-neutral-400">
                        Game Management
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-6 top-6">
                    <div className="w-14 h-14">
                      <div className="w-full h-full grid place-items-center">
                        <img
                          alt=""
                          height="32"
                          src="/assets/icons/section-2-1.svg"
                          width="32"
                        />
                      </div>
                    </div>
                  </div>
                  <ul className="mt-1 space-y-2">
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        게임 종류별 ON/OFF 설정 및 세부 규칙 제어
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        카지노, 슬롯, 미니게임, 스포츠 사용 여부 설정
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        게임별 배당 API 상태 확인 및 수동 업데이트
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        배당 시간 설정 (예: 킥오프 T-O 이후 마켓 잠금)
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        슬롯/카지노 인기 게임 순위 설정
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        정지된 게임 복구 및 신규 게임 노출 순서 지정
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              aria-roledescription="slide"
              className="shrink-0 basis-1/4 max-w-[420px] min-w-[420px] py-6 ps-0 ml-12 h-full"
              role="group"
            >
              <div
                className="relative flex rounded-lg bg-default ring ring-default [--spotlight-size:400px] before:absolute before:-inset-px before:pointer-events-none before:rounded-[inherit] before:bg-[radial-gradient(var(--spotlight-size)_var(--spotlight-size)_at_calc(var(--spotlight-x,0px))_calc(var(--spotlight-y,0px)),var(--spotlight-color),transparent_70%)] [--spotlight-color:var(--ui-primary)]"
                data-orientation="vertical"
                style={
                  {
                    "--spotlight-x": "-2923px",
                    "--spotlight-y": "-92.5625px",
                  } as React.CSSProperties
                }
              >
                <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-default/90" />
                <div className="relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 sm:p-6 p-6 sm:px-8 lg:px-8">
                  <div className="flex flex-col flex-1 items-start">
                    <div className="relative block pr-20 flex-1">
                      <div className="text-pretty text-highlighted text-xl font-extrabold tracking-tight">
                        솔루션 설정
                      </div>
                      <div className="text-pretty mt-1 text-md text-neutral-400">
                        Solution Settings
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-6 top-6">
                    <div className="w-14 h-14">
                      <div className="w-full h-full grid place-items-center">
                        <img
                          alt=""
                          height="32"
                          src="/assets/icons/section-2-2.svg"
                          width="32"
                        />
                      </div>
                    </div>
                  </div>
                  <ul className="mt-1 space-y-2">
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        사이트 운영 관련 전반 설정 관리
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        사이트명 / 로고 / 텔레그램 / 계좌 양식 설정
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        출석체크 / 보너스 / 쿠폰 / 콤프율 설정
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        회원가입/SMS인증/자동가입 등 조건 설정
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        게임별 누락률 및 입출금 시간제한 설정
                      </span>
                    </li>
                    <li className="text-[15px] leading-7 text-neutral-400 flex">
                      <span className="mr-3 text-neutral-500">•</span>
                      <span className="min-w-0">
                        레벨별 베팅 조건, 수익률, 한도 관리
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
