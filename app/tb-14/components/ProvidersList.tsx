'use client'

import { useEffect, useState } from 'react'
import ProviderCard from './ProviderCard'
import GameModal from './GameModal'

type Provider = { id: number; name: string; logo_url?: string | null }
type Game = { id: number; game_name: string; game_code: string; thumbnail_url?: string | null; iframe_url?: string | null }

export default function ProvidersList() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => { fetchProviders() }, [])

  async function fetchProviders() {
    setLoading(true)
    try {
      const res = await fetch('/api/providers')
      const json = await res.json()
      if (json?.success) setProviders(json.data || [])
    } finally { setLoading(false) }
  }

  async function openProvider(p: Provider) {
    setSelectedProvider(p)
    setGames([])
    try {
      const res = await fetch(`/api/games/provider/${p.id}`)
      const json = await res.json()
      if (json?.success) setGames(json.data || [])
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="providers-list">
      <div className="providers-grid">
        {loading ? <p>Loading providers...</p> : providers.map(p => (
          <ProviderCard key={p.id} provider={p} onClick={openProvider} />
        ))}
      </div>

      {selectedProvider && (
        <GameModal provider={selectedProvider} games={games} onClose={() => setSelectedProvider(null)} />
      )}
    </div>
  )
}
