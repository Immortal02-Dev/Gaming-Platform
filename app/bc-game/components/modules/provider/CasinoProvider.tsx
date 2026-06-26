"use client";

import Link from "next/link";
import Image from "next/image";
import { useProviders } from "@/lib/useProviders";

export default function CasinoProvider() {
  const { providers } = useProviders();

  return (
    <>
      {providers.map((provider) => (
        <Link
          key={provider.id}
          href={`/casino/provider/${provider.slug}`}
          className="inactive"
        >
          <div className="flex items-center justify-center rounded-xl bg-layer4 p-4 font-semibold h-17">
            <Image
              alt={provider.name}
              className="h-full w-full object-contain"
              src={provider.logo}
              width={136}
              height={36}
            />
            <span style={{ display: "none" }}>{provider.name}</span>
          </div>
        </Link>
      ))}
    </>
  );
}
