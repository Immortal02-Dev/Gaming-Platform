'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type CardGame = {
  id: number | string
  title: string
  subtitle?: string
  image?: string
}

type Props = {
  open: boolean
  game?: CardGame | null
  rawGame?: any
  onClose: () => void
  onLaunch: (rawGame: any) => void
}

export default function GameDetailModal({ open, game, rawGame, onClose, onLaunch }: Props) {
  const [detail, setDetail] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    const fetchDetail = async () => {
      if (!open || !game) return
      // if card contains id referencing DB record, fetch DB detail
      if (game.id && typeof game.id === 'number') {
        setLoading(true)
        try {
          const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
          const res = await fetch(`${BACKEND_URL}/api/casino/game/${game.id}`)
          if (!res.ok) throw new Error('Failed to load game detail')
          const json = await res.json()
          if (mounted) setDetail(json.data || null)
        } catch (e) {
          console.warn('Could not fetch game detail', e)
        } finally {
          if (mounted) setLoading(false)
        }
      } else {
        setDetail(null)
      }
    }

    fetchDetail()
    return () => { mounted = false }
  }, [open, game])

  if (!open || !game) return null

  const iframeSrc = detail?.api_endpoint || detail?.iframe_url || rawGame?.iframe || rawGame?.iframe_url || null

  return (
    <div className="gd-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="gd-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`game-modal-title-${game.id}`}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: iframeSrc ? '1000px' : '560px' }}
      >
        <header className="gd-modal-header">
          <h3 id={`game-modal-title-${game.id}`} className="gd-modal-title">{game.title}</h3>
          <button aria-label="Close" className="gd-modal-close" onClick={onClose}>×</button>
        </header>

        <div className="gd-modal-body">
          {game.image ? (
            <div className="gd-modal-image">
              <Image src={game.image} alt={game.title || 'Game image'} width={360} height={200} />
            </div>
          ) : null}

          {game.subtitle && <p className="gd-modal-subtitle">{game.subtitle}</p>}

          {loading && <p className="gd-loading">Loading game data...</p>}

          {!loading && iframeSrc ? (
            <div className="gd-iframe-wrap">
              <iframe src={iframeSrc} className="gd-iframe" title={game.title} />
            </div>
          ) : (
            <div className="gd-placeholder">
              <strong>Waiting for API Provider</strong>
              <p>Admin has not configured the API endpoint for this game yet. It will appear here automatically once the database contains the provider API info.</p>
            </div>
          )}
        </div>

        <footer className="gd-modal-actions">
          <button className="gd-btn gd-btn-secondary" onClick={onClose}>Close</button>
          <button className="gd-btn gd-btn-primary" onClick={() => onLaunch(detail || rawGame)}>Launch Demo</button>
        </footer>
      </div>

      <style jsx>{`
        .gd-modal-backdrop {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px);
          z-index: 1000;
          padding: 20px;
        }
        .gd-modal {
          background: var(--surface-container, #0f0e0e);
          color: var(--on-surface, #e9ebec);
          border-radius: 10px;
          padding: 18px;
          width: 100%;
          box-shadow: 0 12px 40px rgba(0,0,0,0.6);
          position: relative;
          max-height: calc(100vh - 64px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .gd-modal-header { display:flex; align-items:center; justify-content:space-between; gap:12px }
        .gd-modal-title { font-size:18px; margin:0; color:var(--on-surface) }
        .gd-modal-close { background:transparent; border:none; color:var(--on-surface); font-size:22px; cursor:pointer }

        .gd-modal-body { overflow:auto; padding-top:12px; }
        .gd-modal-image { display:flex; justify-content:center; margin-bottom:12px }
        .gd-modal-subtitle { color: var(--on-surface-variant); margin:0 0 12px 0 }

        .gd-iframe-wrap { width:100%; height:600px; margin-top:8px }
        .gd-iframe { width:100%; height:100%; border:0; border-radius:6px }

        .gd-placeholder { padding:16px; background:var(--surface-container, #27272b); border-radius:8px; color:var(--on-surface-variant) }

        .gd-modal-actions { display:flex; gap:10px; justify-content:flex-end; padding-top:12px }
        .gd-btn { padding:9px 14px; border-radius:8px; border:1px solid transparent; cursor:pointer; font-weight:600 }
        .gd-btn-primary { background: linear-gradient(180deg, var(--primary) 0%, var(--primary-container, var(--primary)) 100%); color:var(--on-primary, #000); }
        .gd-btn-secondary { background: transparent; color:var(--on-surface); border:1px solid rgba(255,255,255,0.06) }

        @media (max-width: 720px) {
          .gd-iframe-wrap { height: 420px }
          .gd-modal { padding:14px }
          .gd-modal-title { font-size:16px }
        }
      `}</style>
    </div>
  )
}
