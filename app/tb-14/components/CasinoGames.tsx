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

function toGameCard(game: any, idx: number) {
  return {
    id: game.id ?? idx,
    title: game.title || game.name,
    image: game.image || game.thumbnail || "/assets/slots/1.png",
    subtitle: game.provider_name,
    overlay: casinoOverlay(idx),
  };
}

const CasinoGames = () => {
  const { favorites, toggleFavorite } = useFavorites("casino");
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const BACKEND_URL =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
        const res = await fetch(`${BACKEND_URL}/api/games?limit=24`);
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

  const recentGames = games.slice(0, 6);
  const favoriteGames = games.filter((g: any) => favorites.includes(g.id));
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<{ card?: any; raw?: any } | null>(
    null,
  );

  async function launchGame(game: any) {
    try {
      const BACKEND_URL =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      if (game?.api_endpoint) {
        window.open(game.api_endpoint, "_blank", "noopener");
        return;
      }

      const res = await fetch(
        `${BACKEND_URL}/api/games/${game.slug || game.id}/launch`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ demo: true }),
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
    setSelected({ raw: game, card: toGameCard(game, idx) });
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
              <span className="game-titleText">
                카지노 제공사 로비 바로가기
              </span>
            </div>
          </div>

          <div className="card-container">
            {games.map((game: any, idx: number) => {
              const card = toGameCard(game, idx);
              return (
                <GameCard
                  key={game.id || idx}
                  game={card}
                  isFavorite={favorites.includes(game.id)}
                  toggleFavorite={toggleFavorite}
                  onClick={() => openModalFor(game, idx)}
                />
              );
            })}
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
                {recentGames.map((game: any, idx: number) => {
                  const card = toGameCard(game, idx);
                  return (
                    <GameCard
                      key={`recent-${game.id || idx}`}
                      game={card}
                      isFavorite={favorites.includes(game.id)}
                      toggleFavorite={toggleFavorite}
                      onClick={() => openModalFor(game, idx)}
                    />
                  );
                })}
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
                  favoriteGames.map((game: any, idx: number) => {
                    const card = toGameCard(game, idx);
                    return (
                      <GameCard
                        key={`fav-${game.id || idx}`}
                        game={card}
                        isFavorite={true}
                        toggleFavorite={toggleFavorite}
                        onClick={() => openModalFor(game, idx)}
                      />
                    );
                  })
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

export default CasinoGames;
