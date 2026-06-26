'use client'

import Image from 'next/image'

type Provider = {
  id: number;
  name: string;
  logo_url?: string | null;
  is_active?: boolean;
}

type Props = {
  provider: Provider;
  onClick: (provider: Provider) => void;
}

export default function ProviderCard({ provider, onClick }: Props) {
  return (
    <button className="provider-card" onClick={() => onClick(provider)}>
      {provider.logo_url ? (
        <Image src={provider.logo_url} alt={provider.name} width={140} height={80} className="provider-logo" />
      ) : (
        <div className="provider-fallback">{provider.name}</div>
      )}
      <div className="provider-name">{provider.name}</div>
    </button>
  )
}
