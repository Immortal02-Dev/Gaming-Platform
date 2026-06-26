"use client";

import Link from "next/link";
import Image from "next/image";
import { useProviders } from "@/lib/useProviders";

export default function CasinoThemes() {
  const { providers, loading } = useProviders();

  if (loading) {
    return (
      <div className="col-span-full text-center py-8">Loading providers...</div>
    );
  }

  return (
    <>
      {providers.map((provider) => (
        <Link
          key={provider.id}
          href={`/provider/${provider.slug}`}
          className="fix-light-hover ellipsis rounded-xl bg-layer4 p-4 text-center font-semibold capitalize hover:bg-layer5 inactive"
        >
          {provider.name}
        </Link>
      ))}
    </>
  );
}
