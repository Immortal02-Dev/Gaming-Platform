import Image from "next/image";

import PromotionTabs from "@/components/modules/promotions/PromotionTabs";

import Step1 from "@/public/assets/images/substation/bonus/step-1.webp";
import Step2 from "@/public/assets/images/substation/bonus/step-2.webp";
import Step3 from "@/public/assets/images/substation/bonus/step-3.webp";

import StepBox1 from "@/public/assets/images/substation/bonus/d-1-box.webp";
import StepBox2 from "@/public/assets/images/substation/bonus/d-2-box.webp";
import StepBox3 from "@/public/assets/images/substation/bonus/d-3-box.webp";
import StepBox4 from "@/public/assets/images/substation/bonus/d-4-box.webp";

export default function promotion() {
  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="container">
        <div className="pb-4 pt-4 sm:pt-0">
          <header className="text-base font-extrabold text-primary lg:text-lg">
            Promotion
          </header>
          <div className="bg-from-special flex flex-col gap-3 rounded-lg bg-layer3 bg-linear-to-bl from-[#D2EC27] from-[-88%] to-transparent to-46% p-4 lg:flex-row lg:items-center lg:justify-between">
            <h3>
              <p className="text-xl" />
              <div className="font-semibold text-primary">
                <p className="text-[20px]">Great Deposit Bonus</p>
              </div>
              <p className="font-extrabold text-primary lg:text-3xl">
                Up TO 360% Bonus
              </p>
              <p />
              <div className="hidden lg:mt-4 lg:block lg:text-secondary">
                <div className="flex flex-row items-start gap-4">
                  <button
                    className="button button-brand button-m grow"
                    type="button"
                  >
                    Deposit Now
                  </button>
                  <button
                    className="button button-m grow border border-solid border-third bg-black_alpha5 font-semibold text-primary"
                    type="button"
                  >
                    More Details
                  </button>
                </div>
              </div>
            </h3>
            <div className="grid shrink-0 grid-cols-2 gap-4 lg:grid-cols-4">
              <div
                className="relative flex flex-col rounded-xl bg-layer2 p-2 lg:px-4 lg:pb-4"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255, 183, 30, 0.6) 0%, transparent 97%)",
                  backgroundSize: "100% 100%",
                }}
              >
                <div className="absolute -left-1 -top-3 z-0 flex items-center justify-center px-2 py-1 lg:left-2 lg:top-1">
                  <Image
                    alt=""
                    className="absolute inset-0 -z-10 size-full"
                    src={Step1}
                  />
                  <span className="font-extrabold leading-none text-primary text-xxs lg:text-base">
                    01
                  </span>
                </div>
                <div className="flex flex-row lg:flex-col lg:items-center">
                  <p className="flex grow flex-col items-center justify-center lg:order-2!">
                    <span className="text-sm font-extrabold text-primary lg:text-lg">
                      180% Bonus
                    </span>
                  </p>
                  <p className="rounded-lg bg-layer4 p-2 text-xs font-semibold text-secondary">
                    1st Deposit
                  </p>
                  <p />
                  <div className="shrink basis-1/3 lg:order-1! lg:w-32">
                    <Image alt="" className="w-full" src={StepBox1} />
                  </div>
                </div>
              </div>
              <div
                className="relative flex flex-col rounded-xl bg-layer2 p-2 lg:px-4 lg:pb-4"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(187, 255, 48, 0.6) 0%, transparent 97%)",
                  backgroundSize: "100% 100%",
                }}
              >
                <div className="absolute -left-1 -top-3 z-0 flex items-center justify-center px-2 py-1 lg:left-2 lg:top-1">
                  <Image
                    alt=""
                    className="absolute inset-0 -z-10 size-full"
                    src={Step1}
                  />
                  <span className="font-extrabold leading-none text-primary text-xxs lg:text-base">
                    02
                  </span>
                </div>
                <div className="flex lg:flex-col lg:items-center">
                  <p className="flex grow flex-col items-center justify-center lg:order-2">
                    <span className="text-sm font-extrabold text-primary lg:text-lg">
                      240% Bonus
                    </span>
                  </p>
                  <p className="rounded-lg bg-layer4 p-2 text-xs font-semibold text-secondary">
                    2nd Deposit
                  </p>
                  <p />
                  <div className="shrink basis-1/3 lg:order-1 lg:w-32">
                    <Image alt="" className="w-full" src={StepBox2} />
                  </div>
                </div>
              </div>
              <div
                className="relative flex flex-col rounded-xl bg-layer2 p-2 lg:px-4 lg:pb-4"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255, 98, 48, 0.6) 0%, transparent 97%)",
                  backgroundSize: "100% 100%",
                }}
              >
                <div className="absolute -left-1 -top-3 z-0 flex items-center justify-center px-2 py-1 lg:left-2 lg:top-1">
                  <Image
                    alt=""
                    className="absolute inset-0 -z-10 size-full"
                    src={Step3}
                  />
                  <span className="font-extrabold leading-none text-primary text-xxs lg:text-base">
                    03
                  </span>
                </div>
                <div className="flex lg:flex-col lg:items-center">
                  <p className="flex grow flex-col items-center justify-center lg:order-2">
                    <span className="text-sm font-extrabold text-primary lg:text-lg">
                      300% Bonus
                    </span>
                  </p>
                  <p className="rounded-lg bg-layer4 p-2 text-xs font-semibold text-secondary">
                    3rd Deposit
                  </p>
                  <p />
                  <div className="shrink basis-1/3 lg:order-1 lg:w-32">
                    <Image alt="" className="w-full" src={StepBox3} />
                  </div>
                </div>
              </div>
              <div
                className="relative flex flex-col rounded-xl bg-layer2 p-2 lg:px-4 lg:pb-4"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(224, 55, 255, 0.6) 0%, transparent 97%)",
                  backgroundSize: "100% 100%",
                }}
              >
                <div className="absolute -left-1 -top-3 z-0 flex items-center justify-center px-2 py-1 lg:left-2 lg:top-1">
                  <Image
                    alt=""
                    className="absolute inset-0 -z-10 size-full"
                    src={Step3}
                  />
                  <span className="font-extrabold leading-none text-primary text-xxs lg:text-base">
                    04
                  </span>
                </div>
                <div className="flex lg:flex-col lg:items-center">
                  <p className="flex grow flex-col items-center justify-center lg:order-2">
                    <span className="text-sm font-extrabold text-primary lg:text-lg">
                      360% Bonus
                    </span>
                  </p>
                  <p className="rounded-lg bg-layer4 p-2 text-xs font-semibold text-secondary">
                    4th Deposit
                  </p>
                  <p />
                  <div className="shrink basis-1/3 lg:order-1 lg:w-32">
                    <Image alt="" className="w-full" src={StepBox4} />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:hidden">
              <div className="flex flex-row items-start gap-4">
                <button
                  className="button button-brand button-m grow"
                  type="button"
                >
                  Deposit Now
                </button>
                <button
                  className="button button-m grow border border-solid border-third bg-black_alpha5 font-semibold text-primary"
                  type="button"
                >
                  More Details
                </button>
              </div>
            </div>
          </div>

          {/*  */}

          <PromotionTabs />
        </div>
      </div>
    </div>
  );
}

