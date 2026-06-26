"use client";

import { useEffect, useState } from "react";
import useFavorites from "@/lib/hooks/useFavorites";
import { GameCard } from "./GameCard";
import GameDetailModal from "./GameDetailModal";

const CASINO_OVERLAYS = [
  "overlay-one",
  "overlay-two",
  "overlay-three",
  "overlay-four",
  "overlay-five",
  "overlay-six",
  "overlay-seven",
  "overlay-eight",
  "overlay-nine",
  "overlay-ten",
] as const;

function casinoOverlay(idx: number) {
  return CASINO_OVERLAYS[idx % CASINO_OVERLAYS.length];
}

function normalizeGameImageUrl(input: any) {
  const placeholder = "/assets/slots/1.png";
  if (!input || typeof input !== "string") return placeholder;

  const s = input.trim();
  if (!s) return placeholder;

  const disableExternal =
    process.env.NEXT_PUBLIC_DISABLE_EXTERNAL_IMAGES === "true";
  if (disableExternal) {
    try {
      const u = new URL(s.startsWith("//") ? `https:${s}` : s);
      const host = u.hostname.toLowerCase();
      if (
        host.endsWith("pragmaticplay.net") ||
        host.endsWith("gameimgdata.net")
      ) {
        return placeholder;
      }
    } catch {
      // ignore
    }
  }

  if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("/"))
    return s;
  if (s.startsWith("//")) return `https:${s}`;

  return placeholder;
}

const SlotGames = () => {
  const { favorites, toggleFavorite } = useFavorites("slots");
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<{ card?: any; raw?: any } | null>(
    null,
  );

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const BACKEND_URL =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
        const res = await fetch(
          `${BACKEND_URL}/api/games?category=slots&limit=100`,
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        if (mounted) setGames(json.data || []);
      } catch (err: any) {
        setError(err?.message || "Error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const allGames = games;
  const recentGames = allGames.slice(0, 6);
  const favoriteGames = allGames.filter((g: any) => favorites.includes(g.id));

  async function launchGame(game: any) {
    try {
      const BACKEND_URL =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const res = await fetch(
        `${BACKEND_URL}/api/games/${game.slug || game.id}/launch`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );
      const json = await res.json();
      if (json?.data?.launchUrl) {
        window.open(json.data.launchUrl, "_blank", "noopener");
      } else {
        alert(json?.message || "Failed to create launch URL");
      }
    } catch (e) {
      console.error(e);
      alert("Launch failed");
    }
  }

  function openModalFor(game: any, idx: number) {
    setSelected({
      raw: game,
      card: {
        id: game.id,
        title: game.title,
        image: normalizeGameImageUrl(game.image),
        subtitle: game.provider_name,
        overlay: casinoOverlay(idx),
      },
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelected(null);
  }

  return (
    <>
      {loading && <p>로딩중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="game-container">
        <div className="game-innerList">
          <div className="game-header">
            <div className="game-title">
              <span className="game-titleText">슬롯 제공사별 전체보기</span>
            </div>
          </div>

          <div className="card-container">
            {allGames.map((game: any, idx: number) => (
              <GameCard
                key={game.id}
                game={{
                  id: game.id,
                  title: game.title,
                  image: normalizeGameImageUrl(game.image),
                  subtitle: game.provider_name,
                  overlay: casinoOverlay(idx),
                }}
                isFavorite={favorites.includes(game.id)}
                toggleFavorite={toggleFavorite}
                onClick={() => openModalFor(game, idx)}
              />
            ))}
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
                    game={{
                      id: game.id,
                      title: game.title,
                      image: normalizeGameImageUrl(game.image),
                      subtitle: game.provider_name,
                      overlay: casinoOverlay(idx),
                    }}
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
                    <GameCard
                      key={`fav-${game.id}`}
                      game={{
                        id: game.id,
                        title: game.title,
                        image: normalizeGameImageUrl(game.image),
                        subtitle: game.provider_name,
                        overlay: casinoOverlay(idx),
                      }}
                      isFavorite={true}
                      toggleFavorite={toggleFavorite}
                      onClick={() => openModalFor(game, idx)}
                    />
                  ))
                ) : (
                  <p style={{ color: "var(--on-surface)", padding: "20px" }}>
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
        onLaunch={(raw) => {
          launchGame(raw);
          closeModal();
        }}
      />
    </>
  );
};

export default SlotGames;
