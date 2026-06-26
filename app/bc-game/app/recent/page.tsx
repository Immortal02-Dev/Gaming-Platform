"use client";

import GameCard from "@/components/ui/game-card/GameCard";
import RecommendedGames from "@/components/modules/favorite/RecommendedGames";
import { useGames } from "@/lib/useGames";
import { useAuth } from "@/contexts/AuthContext";

export default function Recent() {
  const { token, isLoggedIn } = useAuth();
  const { games: myRecent, loading } = useGames({
    recent: true,
    token: token || "",
  });

  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="flex items-center my-6">
        <button
          className="button button-m mr-3 size-8! rounded-lg! bg-layer4 p-0! text-secondary"
          type="button"
        >
          <div className="icon size-5!">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
            </svg>
          </div>
        </button>
        <div className="text-xl font-extrabold">Continue Playing</div>
      </div>

      {!isLoggedIn ? (
        <div className="py-10 text-center text-secondary">
          Please log in to see your recent games.
        </div>
      ) : loading ? (
        <div className="py-10 text-center text-secondary">Loading...</div>
      ) : myRecent.length > 0 ? (
        <div className="grid mt-4 gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {myRecent.map((item) => (
            <GameCard key={item.id} game={item} />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-secondary">
          You haven't played any games yet.
        </div>
      )}

      <RecommendedGames />
    </div>
  );
}
