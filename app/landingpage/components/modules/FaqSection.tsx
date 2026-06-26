"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";

export function FaqSection() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [heights, setHeights] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateHeights = () => {
      const newHeights: Record<string, string> = {};
      Object.keys(contentRefs.current).forEach((key) => {
        const el = contentRefs.current[key];
        if (el) {
          const wasHidden = el.hidden;
          el.hidden = false;
          newHeights[key] = `${el.scrollHeight}px`;
          el.hidden = wasHidden;
        }
      });
      setHeights(newHeights);
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, []);

  const toggleItem = useCallback((itemId: string) => {
    setOpenItem((prev) => (prev === itemId ? null : itemId));
  }, []);

  const isOpen = (itemId: string) => openItem === itemId;

  return (
    <div id="faq">
      <section className="relative isolate" data-orientation="vertical">
        <div className="w-full max-w-[80rem] mx-auto sm:px-6 lg:px-8 flex flex-col lg:grid py-16 sm:py-24 lg:py-32 px-4 !pt-0 gap-4 sm:gap-4">
          <div className="">
            <div className="">
              <div className="mb-3 justify-center">
                <div className="flex justify-center items-center text-gradient-primary uppercase font-medium text-xs sm:text-base">
                  {" "}
                  Get your questions answered{" "}
                </div>
              </div>
              <h2 className="lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center text-3xl sm:text-6xl">
                <div className="font-bold text-4xl sm:text-6xl">
                  {" "}
                  자주 묻는 질문{" "}
                </div>
              </h2>
              <div className="text-base sm:text-lg text-muted text-center text-balance mt-6">
                <div className="tracking-wide dark:text-gray-400 text-black text-shadow-md text-[16px] mx-auto text-center">
                  <div>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      솔루션에
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      대한
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      궁금한
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      점을
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      빠르게
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      확인하고
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      해결해보세요.
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      자주
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      묻는
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      질문을
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      통해
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      기본적인
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      정보를
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      확인할
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      수
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      있습니다.
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      추가
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      문의
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      사항이
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      있다면
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      고객센터에서
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      더욱
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      상세한
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      안내를
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      받으실
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      수
                    </span>
                    <span
                      className="inline-block"
                      style={{
                        filter: "blur(0px)",
                        opacity: "1",
                        transition: "opacity 0.7s, filter 0.7s",
                      }}
                    >
                      있습니다.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-2 flex-col mt-12"
            data-orientation="horizontal"
            dir="ltr"
          >
            <div
              aria-orientation="horizontal"
              className="relative p-1 group bg-elevated rounded-lg w-full hidden"
              data-orientation="horizontal"
              dir="ltr"
              role="tablist"
              style={{
                outline: "none",
              }}
            >
              <div
                className="absolute transition-[translate,width] duration-200 rounded-md shadow-xs left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position) inset-y-1 bg-inverted"
                style={
                  {
                    "--reka-tabs-indicator-position": "0px",
                    "--reka-tabs-indicator-size": "0px",
                  } as React.CSSProperties
                }
              />
              <button
                aria-controls="reka-tabs-v-0-36-content-0"
                aria-selected="true"
                className="group relative inline-flex items-center min-w-0 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75 transition-colors grow justify-center px-3 py-1.5 text-sm gap-1.5 data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
                data-active=""
                data-orientation="horizontal"
                data-reka-collection-item=""
                data-state="active"
                id="reka-tabs-v-0-36-trigger-0"
                role="tab"
                type="button"
              >
                <span className="truncate">Services & Process</span>
              </button>
              <button
                aria-controls="reka-tabs-v-0-36-content-1"
                aria-selected="false"
                className="group relative inline-flex items-center min-w-0 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75 transition-colors grow justify-center px-3 py-1.5 text-sm gap-1.5 data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
                data-orientation="horizontal"
                data-reka-collection-item=""
                data-state="inactive"
                id="reka-tabs-v-0-36-trigger-1"
                role="tab"
                type="button"
              >
                <span className="truncate">Pricing & Timelines</span>
              </button>
              <button
                aria-controls="reka-tabs-v-0-36-content-2"
                aria-selected="false"
                className="group relative inline-flex items-center min-w-0 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75 transition-colors grow justify-center px-3 py-1.5 text-sm gap-1.5 data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
                data-orientation="horizontal"
                data-reka-collection-item=""
                data-state="inactive"
                id="reka-tabs-v-0-36-trigger-2"
                role="tab"
                type="button"
              >
                <span className="truncate">About Us</span>
              </button>
            </div>
            <div
              aria-labelledby="reka-tabs-v-0-36-trigger-0"
              className="focus:outline-none w-full"
              data-orientation="horizontal"
              data-state="active"
              id="reka-tabs-v-0-36-content-0"
              role="tabpanel"
              style={{}}
            >
              <div className="w-full">
                <div
                  className="border-b border-default last:border-b-0 border-none"
                  data-orientation="vertical"
                  data-state={isOpen("faq-0") ? "open" : "closed"}
                >
                  <div
                    className="flex"
                    data-orientation="vertical"
                    data-state={isOpen("faq-0") ? "open" : "closed"}
                  >
                    <button
                      aria-controls="reka-collapsible-content-v-0-41"
                      aria-expanded={isOpen("faq-0")}
                      className="group flex-1 flex items-center gap-1.5 font-medium py-3.5 focus-visible:outline-primary min-w-0 text-base mb-2 border-0 group px-4 transform-gpu rounded-lg bg-elevated/60 will-change-transform bg-muted/80 hover:bg-muted/50"
                      data-orientation="vertical"
                      data-reka-collection-item=""
                      data-state={isOpen("faq-0") ? "open" : "closed"}
                      id="reka-accordion-trigger-v-0-40"
                      onClick={() => toggleItem("faq-0")}
                      type="button"
                    >
                      <span className="text-start break-words">
                        게임 사이트 서비스를 운영하기 위해서는 어떤 단계를
                        거쳐야 되나요?
                      </span>
                      <Icon
                        aria-hidden="true"
                        icon="lucide:plus"
                        className="shrink-0 size-5 ms-auto transition-transform duration-200 group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-135"
                      />
                    </button>
                  </div>
                  <div
                    aria-labelledby="reka-accordion-trigger-v-0-40"
                    className="data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none"
                    data-orientation="vertical"
                    data-state={isOpen("faq-0") ? "open" : "closed"}
                    hidden={!isOpen("faq-0")}
                    id="reka-collapsible-content-v-0-41"
                    ref={(el) => {
                      contentRefs.current["faq-0"] = el;
                    }}
                    role="region"
                    style={
                      {
                        "--reka-accordion-content-height":
                          "var(--reka-collapsible-content-height)",
                        "--reka-accordion-content-width":
                          "var(--reka-collapsible-content-width)",
                        "--reka-collapsible-content-height": isOpen("faq-0")
                          ? heights["faq-0"] || "auto"
                          : "0px",
                        "--reka-collapsible-content-width": "1216px",
                      } as React.CSSProperties
                    }
                  >
                    <div className="pb-3.5 text-base text-muted">
                      <div className="pb-3.5 text-base text-muted">
                        <div className="px-2 sm:px-4 py-12">
                          <p className="text-sm md:text-base text-muted leading-relaxed mb-12">
                            게임 사이트 서비스를 운영하려면 소프트웨어 개발,
                            게임 통합, 보안 설계, 사용자 인터페이스 및 경험
                            디자인(UI/UX), 결제 시스템 연동 등이 필요합니다.
                            원활한 운영을 위해 아래 단계를 따라 진행하면
                            사이트를 효과적으로 운영할 수 있습니다.
                          </p>
                          <div
                            aria-label="progress"
                            className="flex gap-4 flex-col w-full"
                            data-linear=""
                            data-orientation="horizontal"
                            role="group"
                          >
                            <div className="flex">
                              <div
                                aria-current="true"
                                className="group text-center relative w-full"
                                data-orientation="horizontal"
                                data-state="active"
                              >
                                <div className="relative flex justify-center">
                                  <button
                                    aria-describedby="reka-stepper-item-description-v-0-43"
                                    aria-labelledby="reka-stepper-item-title-v-0-42"
                                    className="rounded-full text-center align-middle flex items-center justify-center font-semibold group-data-[state=completed]:text-inverted group-data-[state=active]:text-inverted text-muted bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 size-12 text-lg group-data-[state=completed]:bg-primary group-data-[state=active]:bg-primary focus-visible:outline-primary"
                                    data-orientation="horizontal"
                                    data-state="active"
                                    type="button"
                                  >
                                    <div className="flex items-center justify-center size-full">
                                      <Icon
                                        aria-hidden="true"
                                        icon="lucide:message-square"
                                        className="shrink-0 size-6"
                                      />
                                    </div>
                                  </button>
                                  <div
                                    className="absolute rounded-full group-data-[disabled]:opacity-75 bg-accented top-[calc(50%-2px)] h-0.5 group-data-[state=completed]:bg-primary start-[calc(50%+32px)] end-[calc(-50%+32px)]"
                                    data-orientation="horizontal"
                                    data-state="active"
                                    role="none"
                                  />
                                </div>
                                <div className="mt-3">
                                  <div
                                    className="font-medium text-default text-base whitespace-pre-line text-center"
                                    id="reka-stepper-item-title-v-0-42"
                                  >
                                    서비스 문의 및 상담 신청
                                  </div>
                                  <div
                                    className="text-muted text-wrap text-base whitespace-pre-line text-center"
                                    id="reka-stepper-item-description-v-0-43"
                                  >
                                    필요한 서비스 및 궁금한 점이 있다면편하게
                                    문의해 주세요!
                                  </div>
                                </div>
                              </div>
                              <div
                                className="group text-center relative w-full"
                                data-orientation="horizontal"
                                data-state="inactive"
                              >
                                <div className="relative flex justify-center">
                                  <button
                                    aria-describedby="reka-stepper-item-description-v-0-45"
                                    aria-labelledby="reka-stepper-item-title-v-0-44"
                                    className="rounded-full text-center align-middle flex items-center justify-center font-semibold group-data-[state=completed]:text-inverted group-data-[state=active]:text-inverted text-muted bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 size-12 text-lg group-data-[state=completed]:bg-primary group-data-[state=active]:bg-primary focus-visible:outline-primary"
                                    data-orientation="horizontal"
                                    data-state="inactive"
                                    type="button"
                                  >
                                    <div className="flex items-center justify-center size-full">
                                      <Icon
                                        aria-hidden="true"
                                        icon="lucide:handshake"
                                        className="shrink-0 size-6"
                                      />
                                    </div>
                                  </button>
                                  <div
                                    className="absolute rounded-full group-data-[disabled]:opacity-75 bg-accented top-[calc(50%-2px)] h-0.5 group-data-[state=completed]:bg-primary start-[calc(50%+32px)] end-[calc(-50%+32px)]"
                                    data-orientation="horizontal"
                                    data-state="inactive"
                                    role="none"
                                  />
                                </div>
                                <div className="mt-3">
                                  <div
                                    className="font-medium text-default text-base whitespace-pre-line text-center"
                                    id="reka-stepper-item-title-v-0-44"
                                  >
                                    통합 솔루션 상담 진행
                                  </div>
                                  <div
                                    className="text-muted text-wrap text-base whitespace-pre-line text-center"
                                    id="reka-stepper-item-description-v-0-45"
                                  >
                                    친절한 상담으로 원하시는 서비스는100% 제공해
                                    드립니다.
                                  </div>
                                </div>
                              </div>
                              <div
                                className="group text-center relative w-full"
                                data-disabled=""
                                data-orientation="horizontal"
                                data-state="inactive"
                              >
                                <div className="relative flex justify-center">
                                  <button
                                    aria-describedby="reka-stepper-item-description-v-0-47"
                                    aria-labelledby="reka-stepper-item-title-v-0-46"
                                    className="rounded-full text-center align-middle flex items-center justify-center font-semibold group-data-[state=completed]:text-inverted group-data-[state=active]:text-inverted text-muted bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 size-12 text-lg group-data-[state=completed]:bg-primary group-data-[state=active]:bg-primary focus-visible:outline-primary"
                                    data-disabled=""
                                    data-orientation="horizontal"
                                    data-state="inactive"
                                    disabled
                                    type="button"
                                  >
                                    <div className="flex items-center justify-center size-full">
                                      <Icon
                                        aria-hidden="true"
                                        icon="lucide:laptop-minimal"
                                        className="shrink-0 size-6"
                                      />
                                    </div>
                                  </button>
                                  <div
                                    className="absolute rounded-full group-data-[disabled]:opacity-75 bg-accented top-[calc(50%-2px)] h-0.5 group-data-[state=completed]:bg-primary start-[calc(50%+32px)] end-[calc(-50%+32px)]"
                                    data-orientation="horizontal"
                                    data-state="inactive"
                                    role="none"
                                  />
                                </div>
                                <div className="mt-3">
                                  <div
                                    className="font-medium text-default text-base whitespace-pre-line text-center"
                                    id="reka-stepper-item-title-v-0-46"
                                  >
                                    통합 솔루션 및 사이트 개발/구축
                                  </div>
                                  <div
                                    className="text-muted text-wrap text-base whitespace-pre-line text-center"
                                    id="reka-stepper-item-description-v-0-47"
                                  >
                                    효율적인 솔루션 및 사이트를운영에 맞게
                                    구축해 드립니다.
                                  </div>
                                </div>
                              </div>
                              <div
                                className="group text-center relative w-full"
                                data-disabled=""
                                data-orientation="horizontal"
                                data-state="inactive"
                              >
                                <div className="relative flex justify-center">
                                  <button
                                    aria-describedby="reka-stepper-item-description-v-0-49"
                                    aria-labelledby="reka-stepper-item-title-v-0-48"
                                    className="rounded-full text-center align-middle flex items-center justify-center font-semibold group-data-[state=completed]:text-inverted group-data-[state=active]:text-inverted text-muted bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 size-12 text-lg group-data-[state=completed]:bg-primary group-data-[state=active]:bg-primary focus-visible:outline-primary"
                                    data-disabled=""
                                    data-orientation="horizontal"
                                    data-state="inactive"
                                    disabled
                                    type="button"
                                  >
                                    <div className="flex items-center justify-center size-full">
                                      <Icon
                                        aria-hidden="true"
                                        icon="lucide:rocket"
                                        className="shrink-0 size-6"
                                      />
                                    </div>
                                  </button>
                                </div>
                                <div className="mt-3">
                                  <div
                                    className="font-medium text-default text-base whitespace-pre-line text-center"
                                    id="reka-stepper-item-title-v-0-48"
                                  >
                                    통합 솔루션 서비스 운영
                                  </div>
                                  <div
                                    className="text-muted text-wrap text-base whitespace-pre-line text-center"
                                    id="reka-stepper-item-description-v-0-49"
                                  >
                                    사이트 및 게임 서비스를 운영하여수익을
                                    창출하세요!
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              aria-atomic="true"
                              aria-live="polite"
                              role="status"
                              style={{
                                margin: "0px",
                                opacity: "0",
                                pointerEvents: "none",
                                position: "absolute",
                                transform: "translateX(-100%)",
                              }}
                            >
                              {" "}
                              Step 0 of 4
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="border-b border-default last:border-b-0 border-none"
                  data-orientation="vertical"
                  data-state={isOpen("faq-1") ? "open" : "closed"}
                >
                  <div
                    className="flex"
                    data-orientation="vertical"
                    data-state={isOpen("faq-1") ? "open" : "closed"}
                  >
                    <button
                      aria-controls="reka-collapsible-content-v-0-51"
                      aria-expanded={isOpen("faq-1")}
                      className="group flex-1 flex items-center gap-1.5 font-medium py-3.5 focus-visible:outline-primary min-w-0 text-base mb-2 border-0 group px-4 transform-gpu rounded-lg bg-elevated/60 will-change-transform  bg-muted/80 hover:bg-muted/50"
                      data-orientation="vertical"
                      data-reka-collection-item=""
                      data-state={isOpen("faq-1") ? "open" : "closed"}
                      id="reka-accordion-trigger-v-0-50"
                      onClick={() => toggleItem("faq-1")}
                      type="button"
                    >
                      <span className="text-start break-words">
                        게임 사이트는 어떤 소프트웨어를 사용해야 하나요?
                      </span>
                      <Icon
                        aria-hidden="true"
                        icon="lucide:plus"
                        className="shrink-0 size-5 ms-auto transition-transform duration-200 group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-135"
                      />
                    </button>
                  </div>
                  <div
                    aria-labelledby="reka-accordion-trigger-v-0-50"
                    className="data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none"
                    data-orientation="vertical"
                    data-state={isOpen("faq-1") ? "open" : "closed"}
                    hidden={!isOpen("faq-1")}
                    id="reka-collapsible-content-v-0-51"
                    ref={(el) => {
                      contentRefs.current["faq-1"] = el;
                    }}
                    role="region"
                    style={
                      {
                        "--reka-accordion-content-height":
                          "var(--reka-collapsible-content-height)",
                        "--reka-accordion-content-width":
                          "var(--reka-collapsible-content-width)",
                        "--reka-collapsible-content-height": isOpen("faq-1")
                          ? heights["faq-1"] || "auto"
                          : "0px",
                        "--reka-collapsible-content-width": "1216px",
                      } as React.CSSProperties
                    }
                  >
                    <div className="pb-3.5 text-base text-muted">
                      <div className="pb-3.5 text-base text-muted">
                        <div className="px-4">
                          솔루션 및 사이트는 보통 전문 카지노 소프트웨어
                          제공업체 (예 : EVolution, NetEnt, PlayTech 등) 와
                          협력하여 게임을 제공합니다. 아이콘 솔루션에서 제공하는
                          소프트웨어는 게임의 공정성을 보장하고 원활한 효과적인
                          서비스 운영 지원합니다.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="border-b border-default last:border-b-0 border-none"
                  data-orientation="vertical"
                  data-state={isOpen("faq-2") ? "open" : "closed"}
                >
                  <div
                    className="flex"
                    data-orientation="vertical"
                    data-state={isOpen("faq-2") ? "open" : "closed"}
                  >
                    <button
                      aria-controls="reka-collapsible-content-v-0-53"
                      aria-expanded={isOpen("faq-2")}
                      className="group flex-1 flex items-center gap-1.5 font-medium py-3.5 focus-visible:outline-primary min-w-0 text-base mb-2 border-0 group px-4 transform-gpu rounded-lg bg-elevated/60 will-change-transform bg-muted/80 hover:bg-muted/50"
                      data-orientation="vertical"
                      data-reka-collection-item=""
                      data-state={isOpen("faq-2") ? "open" : "closed"}
                      id="reka-accordion-trigger-v-0-52"
                      onClick={() => toggleItem("faq-2")}
                      type="button"
                    >
                      <span className="text-start break-words">
                        게임 사이트 (카지노, 스포츠, 오프라인)의 보안은 신뢰할
                        수 있나요?
                      </span>
                      <Icon
                        aria-hidden="true"
                        icon="lucide:plus"
                        className="shrink-0 size-5 ms-auto transition-transform duration-200 group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-135"
                      />
                    </button>
                  </div>
                  <div
                    aria-labelledby="reka-accordion-trigger-v-0-52"
                    className="data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none"
                    data-orientation="vertical"
                    data-state={isOpen("faq-2") ? "open" : "closed"}
                    hidden={!isOpen("faq-2")}
                    id="reka-collapsible-content-v-0-53"
                    ref={(el) => {
                      contentRefs.current["faq-2"] = el;
                    }}
                    role="region"
                    style={
                      {
                        "--reka-accordion-content-height":
                          "var(--reka-collapsible-content-height)",
                        "--reka-accordion-content-width":
                          "var(--reka-collapsible-content-width)",
                        "--reka-collapsible-content-height": isOpen("faq-2")
                          ? heights["faq-2"] || "auto"
                          : "0px",
                        "--reka-collapsible-content-width": "1216px",
                      } as React.CSSProperties
                    }
                  >
                    <div className="pb-3.5 text-base text-muted">
                      <div className="pb-3.5 text-base text-muted">
                        <div className="px-4">
                          SSL/TLS 암호화를 적용하여 데이터 전송 중 기밀성을
                          보호하며, 방화벽을 통해 외부 위협으로부터 시스템을
                          방어합니다. 또한, 정기적인 보안 감사를 수행하여
                          취약점을 점검하고, 최신 보안 업데이트를 신속히
                          적용하여 보안 상태를 유지합니다. 계정 보안을 강화하기
                          위해 다중 인증(MFA)을 도입하고 있으며, 접근 제어
                          정책을 통해 권한이 없는 사용자의 접근을 차단합니다.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              aria-labelledby="reka-tabs-v-0-36-trigger-1"
              className="focus:outline-none w-full"
              data-orientation="horizontal"
              data-state="inactive"
              hidden
              id="reka-tabs-v-0-36-content-1"
              role="tabpanel"
            />
            <div
              aria-labelledby="reka-tabs-v-0-36-trigger-2"
              className="focus:outline-none w-full"
              data-orientation="horizontal"
              data-state="inactive"
              hidden
              id="reka-tabs-v-0-36-content-2"
              role="tabpanel"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
