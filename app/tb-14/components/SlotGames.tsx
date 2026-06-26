'use client'

import { useEffect, useState } from 'react'
import useFavorites from '@/lib/hooks/useFavorites'
import { GameCard } from './GameCard'
import GameDetailModal from './GameDetailModal'

function normalizeGameImageUrl(input: any) {
  const placeholder = '/assets/slots/1.png'
  if (!input || typeof input !== 'string') return placeholder

  const s = input.trim()
  if (!s) return placeholder

  const disableExternal = process.env.NEXT_PUBLIC_DISABLE_EXTERNAL_IMAGES === 'true'
  if (disableExternal) {
    try {
      const u = new URL(s.startsWith('//') ? `https:${s}` : s)
      const host = u.hostname.toLowerCase()
      if (
        host.endsWith('pragmaticplay.net') ||
        host.endsWith('gameimgdata.net')
      ) {
        return placeholder
      }
    } catch {
      // ignore
    }
  }

  if (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('/')) return s
  if (s.startsWith('//')) return `https:${s}`

  return placeholder
}

const SlotGames = () => {
  const { favorites, toggleFavorite } = useFavorites('slots')
  const [games, setGames] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pragmaticTest, setPragmaticTest] = useState<any | null>(null)
  const [pragmaticLoading, setPragmaticLoading] = useState(false)

  useEffect(() => {
    let mounted = true
  const fetchData = async () => {
      setLoading(true)
      try {
  const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000')
  const res = await fetch(`${BACKEND_URL}/api/slot/games`)
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

  useEffect(() => {
    let mounted = true
    const fetchPragmatic = async () => {
      setPragmaticLoading(true)
      try {
        const res = await fetch('/api/slot/pragmatic-test?provider=pragmatic')
        const json = await res.json()
        if (mounted) setPragmaticTest(json)
      } catch (e: any) {
        if (mounted) setPragmaticTest({ success: false, error: e?.message || 'Error' })
      } finally {
        setPragmaticLoading(false)
      }
    }

    fetchPragmatic()
    return () => { mounted = false }
  }, [])

  const allGames = games
  const recentGames = allGames.slice(0, 6)
  const favoriteGames = allGames.filter((g: any) => favorites.includes(g.providerGameId || g.id))
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState<{ card?: any; raw?: any } | null>(null)

  async function launchGame(game: any) {
    try {
      const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000')
      // If the game object contains api_endpoint from DB, open it directly in a new window (iframe handled in modal)
      if (game?.api_endpoint) {
        window.open(game.api_endpoint, '_blank', 'noopener')
        return
      }

      const res = await fetch(`${BACKEND_URL}/api/slot/launch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerCode: game.providerCode || 'MOCK', providerGameId: game.providerGameId || game.id, demo: true })
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
    setSelected({
      raw: game,
      card: {
        id: game.providerGameId || game.id || idx,
        title: game.name || game.game_name,
        image: normalizeGameImageUrl(game.thumbnail_url),
        subtitle: game.subtitle,
      },
    })
    setModalOpen(true)
  }

  function closeModal() { setModalOpen(false); setSelected(null) }

  return (
    <>
      {loading && <p>로딩중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: 16, padding: 12, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 600 }}>Pragmatic 슬롯 연결 테스트</div>
          <button
            type="button"
            onClick={async () => {
              setPragmaticLoading(true)
              try {
                const res = await fetch('/api/slot/pragmatic-test?provider=pragmatic')
                const json = await res.json()
                setPragmaticTest(json)
              } catch (e: any) {
                setPragmaticTest({ success: false, error: e?.message || 'Error' })
              } finally {
                setPragmaticLoading(false)
              }
            }}
            style={{ padding: '6px 10px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'inherit', cursor: 'pointer' }}
          >
            {pragmaticLoading ? '확인중...' : '다시 확인'}
          </button>
        </div>

        <div style={{ marginTop: 10, fontSize: 13, opacity: 0.9, lineHeight: 1.5 }}>
          <div>
            상태:{' '}
            <strong>
              {pragmaticTest?.success ? 'OK' : pragmaticTest ? 'FAIL' : pragmaticLoading ? 'LOADING' : '-'}
            </strong>
          </div>
          <div>전체 슬롯 수: <strong>{typeof pragmaticTest?.totalAll === 'number' ? pragmaticTest.totalAll : '-'}</strong></div>
          <div>Pragmatic 슬롯 수: <strong>{typeof pragmaticTest?.totalProvider === 'number' ? pragmaticTest.totalProvider : '-'}</strong></div>
          {pragmaticTest?.error && (
            <div style={{ marginTop: 6, color: 'salmon' }}>에러: {String(pragmaticTest.error)}</div>
          )}
          {Array.isArray(pragmaticTest?.sample) && pragmaticTest.sample.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>샘플 게임</div>
              <div style={{ display: 'grid', gap: 2 }}>
                {pragmaticTest.sample.slice(0, 5).map((g: any, idx: number) => (
                  <div key={`pragmatic-sample-${idx}`} style={{ opacity: 0.9 }}>
                    {g?.name} <span style={{ opacity: 0.7 }}>({g?.providerCode})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="game-container">
        <div className="game-innerList">
          <div className="game-header">
            <div className="game-title">
              <span className="game-titleText">슬롯 제공사별 전체보기</span>
            </div>
          </div>

          <div className="card-container">
            <div className="provider-group">
              <div className="provider-games">
                {allGames.map((game: any, idx: number) => (
                  <GameCard
                    key={game.providerGameId || game.id || idx}
                    game={{ id: game.providerGameId || game.id || idx, title: game.name || game.game_name, image: normalizeGameImageUrl(game.thumbnail_url), overlay: `overlay-provider-${idx}` }}
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
                    key={`recent-${game.id}`}
                    game={{ id: game.id, title: game.game_name, image: normalizeGameImageUrl(game.thumbnail_url), overlay: `overlay-recent-${idx}` }}
                    isFavorite={favorites.includes(game.id)}
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
                    <GameCard key={`fav-${game.id}`} game={{ id: game.id, title: game.game_name, image: normalizeGameImageUrl(game.thumbnail_url), overlay: `overlay-fav-${idx}` }} isFavorite={true} toggleFavorite={toggleFavorite} onClick={() => openModalFor(game, idx)} />
                  ))
                ) : (
                  <p style={{ color: 'var(--on-surface)', padding: '20px' }}>
                    즐겨찾기한 게임이 없습니다.
                  </p>
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

export default SlotGames;
