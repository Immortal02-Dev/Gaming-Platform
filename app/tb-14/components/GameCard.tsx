"use client";

import { useEffect, useState } from "react";

const FavoriteIcon = ({ isFavorite }: { isFavorite: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    viewBox={isFavorite ? "0 0 576 512" : "0 0 24 24"}
    className="card-favoriteIcon"
  >
    {isFavorite ? (
      <path
        fill="currentColor"
        d="M259.3 17.8L194 150.2L47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103l-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5l105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2L316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
      />
    ) : (
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m13.728 3.444l1.76 3.549c.24.494.88.968 1.42 1.058l3.189.535c2.04.343 2.52 1.835 1.05 3.307l-2.48 2.5c-.42.423-.65 1.24-.52 1.825l.71 3.095c.56 2.45-.73 3.397-2.88 2.117l-2.99-1.785c-.54-.322-1.43-.322-1.98 0L8.019 21.43c-2.14 1.28-3.44.322-2.88-2.117l.71-3.095c.13-.585-.1-1.402-.52-1.825l-2.48-2.5C1.39 10.42 1.86 8.929 3.899 8.586l3.19-.535c.53-.09 1.17-.564 1.41-1.058l1.76-3.549c.96-1.925 2.52-1.925 3.47 0"
        color="currentColor"
      />
    )}
  </svg>
);

export type Game = {
  id: number;
  title: string;
  subtitle?: string;
  vendor?: string;
  image: string;
  overlay: string;
};

type GameCardProps = {
  game: Game;
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
  onClick?: () => void;
};

export const GameCard = ({
  game,
  isFavorite,
  toggleFavorite,
  onClick,
}: GameCardProps) => {
  const fallbackSrc = "/assets/slots/1.png";
  const [src, setSrc] = useState(game.image);

  useEffect(() => {
    setSrc(game.image);
  }, [game.image]);

  return (
    <div
      className="card-game"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="card-boxImage">
        <img
          src={src}
          alt={game.title || "Game thumbnail"}
          className="card-image w-auto"
          width={300}
          height={500}
          onError={() => {
            if (src !== fallbackSrc) setSrc(fallbackSrc);
          }}
        />
        <button
          type="button"
          className={`card-favoriteBtn ${isFavorite ? "selected" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(game.id);
          }}
        >
          <FavoriteIcon isFavorite={isFavorite} />
        </button>
      </div>
      <div className={`card-footer ${game.overlay}`}>
        <p className="card-title">{game.title}</p>
        <span className="card-vendor">{game.subtitle || game.vendor}</span>
      </div>
    </div>
  );
};
