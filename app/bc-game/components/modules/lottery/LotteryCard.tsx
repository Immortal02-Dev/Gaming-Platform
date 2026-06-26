import Image from "next/image";
import { LotteryItem } from "@/types/game"; // I-import ang type dito

export const LotteryCard = ({
  title,
  drawTime,
  prize,
  iconSrc,
  iconStyle,
  isExclusive,
  buttons,
}: Omit<LotteryItem, "id">) => {
  return (
    <section className="popularSectionItemWrap p-3 rounded-xl bg-layer4 flex flex-col justify-between cursor-pointer">
      <div className="flex justify-between">
        <span className="inline-flex items-center justify-center w-6 h-6 cursor-pointer rounded-lg like_layer">
          <div className="size-4 fill-tertiary">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.2579 25.0916L10.3082 27.8097C9.52925 28.2367 8.56657 27.925 8.15768 27.1115C7.99465 26.788 7.93858 26.4169 7.99724 26.0565L8.94267 20.2996C9.03152 19.76 8.85986 19.2095 8.48462 18.8275L4.48034 14.7509C3.85062 14.1094 3.83768 13.0562 4.45187 12.3986C4.69685 12.1364 5.01689 11.9661 5.36366 11.9139L10.8974 11.0742C11.4158 10.9958 11.8644 10.6553 12.0964 10.1643L14.5713 4.92726C14.9603 4.10382 15.9152 3.76508 16.7045 4.17139C17.0185 4.33356 17.273 4.59843 17.4283 4.92726L19.9031 10.1643C20.1352 10.6553 20.5837 10.9958 21.1022 11.0742L26.6359 11.9139C27.5062 12.0463 28.1092 12.8905 27.9833 13.7995C27.9332 14.1617 27.7693 14.4959 27.5192 14.7518L23.5149 18.8284C23.1397 19.2104 22.968 19.7609 23.0569 20.3005L24.0023 26.0574C24.1507 26.9628 23.5684 27.8223 22.7015 27.9781C22.3564 28.0403 22.001 27.9808 21.6913 27.8106L16.7416 25.0925C16.2775 24.8375 15.7237 24.8375 15.2596 25.0925L15.2579 25.0916Z"></path>
            </svg>
          </div>
        </span>
        <div className="flex items-center">
          {isExclusive && (
            <label className="center h-6 leading-6 -mr-3 text-primary text-xs! font-extrabold border-l border-t border-b border-brand rounded-tl-3xl rounded-bl-3xl pl-2.5 pr-5 whitespace-nowrap">
              BC Exclusive
            </label>
          )}
          <div className="relative min-w-6 min-h-6 w-6 h-6 overflow-hidden border border-solid border-third rounded-full">
            <Image
              className="w-6 min-w-6 absolute"
              alt="flag"
              src={iconSrc}
              style={iconStyle}
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>

      <div className="draw-time text-xs font-semibold text-secondary mt-2">
        Next Draw in <span className="ml-0.5">{drawTime}</span>
      </div>

      <div className="text-primary text-sm font-extrabold my-2">
        <label className="line-clamp-2">{title}</label>
      </div>

      <div className="flex justify-between items-center">
        <label className="text-secondary text-xs font-semibold">
          Top prize
        </label>
        <label className="text-primary text-sm italic font-extrabold">
          {prize}
        </label>
      </div>

      <div className="flex gap-2 mt-2">
        {buttons.map((label, idx) => (
          <button
            key={idx}
            className={`button min-h-8 h-auto! text-sm font-extrabold bg-black_alpha5 dark:bg-layer6 text-primary py-1 ${
              buttons.length === 1 ? "w-full" : "w-1/2"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
};
