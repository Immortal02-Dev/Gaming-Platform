'use client'

import { useEffect, useState } from 'react'
import useFavorites from '@/lib/hooks/useFavorites'
import { GameCard } from './GameCard'
import GameDetailModal from './GameDetailModal'

type Provider = {
  id: number
  name: string
  logo_url?: string
  is_active?: boolean
  games?: any[]
}

const CasinoGames = () => {
  const { favorites, toggleFavorite } = useFavorites('casino')
  const [games, setGames] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      setLoading(true)
      try {
        const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000')
        const res = await fetch(`${BACKEND_URL}/api/games?limit=24`)
        if (!res.ok) throw new Error('Failed to fetch')
        const json = await res.json()
        if (mounted) setGames(json.data || [])
      } catch (err: any) {
        setError(err?.message || 'Error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    return () => { mounted = false }
  }, [])

  const recentGames = games.slice(0, 6)
  const favoriteGames = games.filter((g: any) => favorites.includes(g.providerGameId || g.id))
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState<{ card?: any; raw?: any } | null>(null)

  async function launchGame(game: any) {
    try {
      const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000')
      if (game?.api_endpoint) {
        window.open(game.api_endpoint, '_blank', 'noopener')
        return
      }

      // Get auth token from cookies (which Next.js handles for us if using same domain, but since it's external BACKEND_URL, we might need to send credentials)
      // Actually, since this is called from the client, we should probably fetch through Next.js API or ensure cookies are sent.
      const res = await fetch(`${BACKEND_URL}/api/games/${game.slug || game.id}/launch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit', // Let's use demo for now as it doesn't strictly need auth in some mock backends
        body: JSON.stringify({ demo: true })
      })
      const json = await res.json()
      if (json?.success && json.url) {
        window.open(json.url, '_blank', 'noopener')
      } else {
        alert(json?.message || 'Failed to create launch URL')
      }
    } catch (e) {
      console.error(e)
      alert('Launch failed')
    }
  }

  function openModalFor(game: any, idx: number) {
    setSelected({ raw: game, card: { id: game.id || idx, title: game.title || game.name, image: game.image || game.thumbnail || '/assets/slots/1.png', subtitle: game.provider_name } })
    setModalOpen(true)
  }

  function closeModal() { setModalOpen(false); setSelected(null) }

  return (
    <>
      {loading && <p>로딩중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="game-container">
        <div className="game-innerList">
          <div className="game-header">
            <div className="game-title">
              <span className="game-titleText">카지노 제공사 로비 바로가기</span>
            </div>
          </div>

          <div className="card-container">
            <div className="provider-group">
              <div className="provider-games">
                {games.map((game: any, idx: number) => (
                  <GameCard
                    key={game.providerGameId || game.id || idx}
                    game={{
                      id: game.id || idx,
                      title: game.title || game.name,
                      image: game.image || game.thumbnail || '/assets/slots/1.png',
                      overlay: game.overlay || `overlay-${idx}`,
                    }}
                    isFavorite={favorites.includes(game.providerGameId || game.id)}
                    toggleFavorite={toggleFavorite}
                    onClick={() => openModalFor(game, idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-favorite">
        <div className="favorite-game">
          <div className="favorite-head">
            <div className="favorite-title">
              <span className="favorite-titleText">최근게임</span>
            </div>
          </div>
          <div className="favorite-card">
            <div className="favorite-inner">
              <div className="favorite-item">
                {recentGames.map((game: any, idx: number) => (
                  <GameCard
                    key={`recent-${game.providerGameId || game.id || idx}`}
                    game={{
                      id: game.id || idx,
                      title: game.title || game.name,
                      image: game.image || game.thumbnail || '/assets/slots/1.png',
                      overlay: game.overlay || `overlay-recent-${idx}`,
                    }}
                    isFavorite={favorites.includes(game.providerGameId || game.id)}
                    toggleFavorite={toggleFavorite}
                    onClick={() => openModalFor(game, idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="favorite-game">
          <div className="favorite-head">
            <div className="favorite-title">
              <span className="favorite-titleText">즐겨찾기</span>
            </div>
          </div>
          <div className="favorite-card">
            <div className="favorite-inner">
              <div className="favorite-item">
                {favoriteGames.length > 0 ? (
                  favoriteGames.map((game: any, idx: number) => (
                    <GameCard
                      key={`fav-${game.providerGameId || game.id || idx}`}
                      game={{
                        id: game.id || idx,
                        title: game.title || game.name,
                        image: game.image || game.thumbnail || '/assets/slots/1.png',
                        overlay: game.overlay || `overlay-fav-${idx}`,
                      }}
                      isFavorite={true}
                      toggleFavorite={toggleFavorite}
                      onClick={() => openModalFor(game, idx)}
                    />
                  ))
                ) : (
                  <p style={{ color: 'var(--on-surface)', padding: '20px' }}>즐겨찾기한 게임이 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <GameDetailModal
        open={modalOpen}
        game={selected?.card}
        rawGame={selected?.raw}
        onClose={closeModal}
        onLaunch={(raw) => { launchGame(raw); closeModal() }}
      />
    </>
  )
}

export default CasinoGames
