'use client'

import { useState, useEffect } from 'react'

type Favorites = {
  [key: string]: number[]
}

const useFavorites = (category: string) => {
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    try {
      const item = window.localStorage.getItem('favoriteGames')
      if (item) {
        const allFavorites: Favorites = JSON.parse(item)
        if (allFavorites[category]) {
          setFavorites(allFavorites[category])
        }
      }
    } catch (error) {
      console.error(error)
      setFavorites([])
    }
  }, [category])

  const toggleFavorite = (gameId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
      
      try {
        const item = window.localStorage.getItem('favoriteGames')
        const allFavorites: Favorites = item ? JSON.parse(item) : {}
        allFavorites[category] = newFavorites
        window.localStorage.setItem('favoriteGames', JSON.stringify(allFavorites))
      } catch (error) {
        console.error(error)
      }
      
      return newFavorites
    })
  }

  return { favorites, toggleFavorite }
}

export default useFavorites
