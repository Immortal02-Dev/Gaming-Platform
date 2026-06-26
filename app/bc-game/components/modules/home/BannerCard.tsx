"use client";
import Image from "next/image";
import React from "react";
import casinoBonus from "@/public/assets/images/carousel/casino-top.webp"; // Example image, adjust path

interface BannerCardProps {
  type: "bonus" | "image";
  data: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    image?: string; // For regular image banners
    gradientColor?: string; // For bonus card background
    tagImage?: string; // For the "new player" tag etc.
    promoLink?: string; // Link for the whole banner
  };
}

export default function BannerCard({ type, data }: BannerCardProps) {
  if (type === "bonus") {
    return (
      <div
        className="relative z-0 flex h-44 cursor-pointer flex-col justify-center rounded-xl bg-layer4 px-7 py-4"
        style={
          {
            backgroundImage: `linear-gradient(240deg, ${
              data.gradientColor || "#24DC72"
            } -16%, transparent 70%)`,
          } as React.CSSProperties
        }
      >
        <div className="absolute right-0 top-0 -z-10 h-full w-auto">
          <Image
            className="h-full w-full object-contain"
            src={casinoBonus}
            alt="Casino Bonus"
            width={480}
            height={270}
          />
        </div>
        <div>
          <div className="flex flex-col gap-y-1">
            <div className="text-2xl font-extrabold text-brand">
              {data.title || "10% Bonus"}
            </div>
            <div className="max-w-44 text-wrap text-xl font-semibold text-primary">
              <div>{data.subtitle || "in Casino"}</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-end gap-x-2">
          <button
            className="button button-brand button-s px-4 py-1! text-sm rounded-lg"
            type="button"
            onClick={() =>
              data.buttonLink && window.location.assign(data.buttonLink)
            }
          >
            {data.buttonText || "Deposit Now"}
          </button>
        </div>
      </div>
    );
  }

  // Default type: 'image' banner
  return (
    <div className="px-3 pt-0.5 sm:px-0! relative h-44">
      {data.tagImage && (
        <div className="absolute -top-0.5 right-4 w-12 z-10">
          <Image src={data.tagImage} alt="Tag" />
        </div>
      )}
      <a
        href={data.promoLink || "#"}
        className="center size-full overflow-hidden rounded-xl text-5xl inactive block"
      >
        <Image
          className="banner-img size-full object-cover"
          src={data.image || ""}
          alt={data.title || "Promotion Banner"}
          width={480}
          height={270}
        />
      </a>
    </div>
  );
}
