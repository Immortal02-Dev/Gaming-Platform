'use client'

import React, { useState } from 'react'
import Image from 'next/image'

type Provider = { id: number; name: string }
type Game = { id: number; game_name: string; game_code: string; thumbnail_url?: string | null; iframe_url?: string | null }

export default function GameModal({ provider, games, onClose }: { provider: Provider; games: Game[]; onClose: () => void }) {
  const [activeIframe, setActiveIframe] = useState<string | null>(null)

  return (
    <div className="game-modal">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-body">
        <div className="modal-header">
          <h3>{provider.name} - Games</h3>
          <button onClick={onClose}>Close</button>
        </div>

        {!activeIframe ? (
          <div className="games-grid">
            {games.length === 0 ? <p style={{ color: 'var(--on-surface)' }}>No games</p> : games.map(g => (
              <div key={g.id} className="game-card" onClick={() => setActiveIframe(g.iframe_url || null)}>
                {g.thumbnail_url ? (
                  <Image src={g.thumbnail_url} alt={g.game_name} width={300} height={180} />
                ) : (
                  <div className="thumb-fallback">{g.game_name}</div>
                )}
                <div className="game-name">{g.game_name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="iframe-wrapper">
            <button onClick={() => setActiveIframe(null)}>Back to list</button>
            <iframe src={activeIframe || ''} title="game-frame" className="game-iframe" />
          </div>
        )}
      </div>
    </div>
  )
}
