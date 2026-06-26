import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";

export function FooterSection() {
  return (
    <footer className="bg-default">
      {/**/}
      <div className="w-full sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between lg:gap-x-3 max-w-[1290px] mx-auto px-4 py-12 lg:py-16">
        <div className="lg:flex-1 flex items-center justify-center lg:justify-end gap-x-1.5 lg:order-3 !hidden" />
        <div className="mt-3 lg:mt-0 lg:order-2 flex items-center justify-center !w-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 w-full">
            <div className="space-y-5 lg:col-span-2">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/images/logo/icon_logo_dark.svg?v=1782265110058"
                  alt="logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-6 w-auto"
                />
                <Image
                  src="/assets/images/logo/soulution_txt_dark.svg?v=1782265110058"
                  alt="Solution"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-6 w-auto"
                />
              </div>
              <div className="space-y-3 text-sm text-neutral-400">
                <p className="leading-8">
                  {" "}
                  효율적인 수익을 위해 안정적인 서버구축, 사이트 설계, 디자인 등
                  전문 개발
                  <br /> 팀이 맞춤형 게임 사이트 제작과 최적화된 솔루션을
                  제공합니다.
                  <br /> 전문 개발팀이 기획부터 개발, 운영까지 전 과정을
                  책임지며, 고객의 비즈니스
                  <br />
                  목표에 맞춘 최적의 서비스를 제공합니다.{" "}
                </p>
                <div className="pt-6 text-xs text-neutral-500">
                  © 2025 ICON SOLUTION. All rights reserved.
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">Pages</div>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/#features"
                    className="router-link-active router-link-exact-active text-muted hover:text-default transition-colors"
                    aria-current="page"
                  >
                    제품 기능
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#sample-site"
                    className="router-link-active router-link-exact-active text-muted hover:text-default transition-colors"
                    aria-current="page"
                  >
                    샘플 사이트
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="router-link-active router-link-exact-active text-muted hover:text-default transition-colors"
                    aria-current="page"
                  >
                    제공 서비스
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#providers"
                    className="router-link-active router-link-exact-active text-muted hover:text-default transition-colors"
                    aria-current="page"
                  >
                    제공 게임사
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="router-link-active router-link-exact-active text-muted hover:text-default transition-colors"
                    aria-current="page"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold">Contact</div>
              <Link
                href="https://t.me/icon_cs"
                target="_blank"
                rel="noopener"
                className="mt-4 inline-flex items-center gap-3 text-muted hover:text-default transition-colors"
              >
                <Icon
                  icon="ri:telegram-2-fill"
                  className="size-6 shrink-0"
                  aria-hidden="true"
                />{" "}
                Telegram{" "}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0 lg:order-1 !hidden" />
      </div>
      {/**/}
    </footer>
  );
}
