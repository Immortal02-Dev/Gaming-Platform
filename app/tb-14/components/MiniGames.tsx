'use client'

import useFavorites from '@/lib/hooks/useFavorites'
import { GameCard, Game } from './GameCard'

const MiniGames = () => {
  const { favorites, toggleFavorite } = useFavorites('minigame')

  const miniGames: Game[] = [
    { id: 1, title: '동행복권 파워볼', vendor: '동행복권', image: '/assets/minigame/1.png', overlay: 'overlay-oneMini' }
  ]

  const recentGames = miniGames.slice(0, 6)
  const favoriteGames = miniGames.filter(game => favorites.includes(game.id))

  return (
    <>
      <div className="game-container">
        <div className="game-innerList">
          <div className="game-header">
            <div className="game-title">
              <span className="game-titleText">미니게임 바로가기</span>
            </div>
          </div>

          <div className="card-container">
            {miniGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isFavorite={favorites.includes(game.id)}
                toggleFavorite={toggleFavorite}
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
                {recentGames.map(game => (
                  <GameCard
                    key={`recent-${game.id}`}
                    game={game}
                    isFavorite={favorites.includes(game.id)}
                    toggleFavorite={toggleFavorite}
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
                  favoriteGames.map(game => (
                    <GameCard
                      key={`fav-${game.id}`}
                      game={game}
                      isFavorite={true}
                      toggleFavorite={toggleFavorite}
                    />
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
    </>
  )
}

export default MiniGames;
