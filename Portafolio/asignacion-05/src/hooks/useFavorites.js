import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'favorites'

function parseFavorites(raw) {
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(id => typeof id === 'number') : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(() =>
    parseFavorites(localStorage.getItem(STORAGE_KEY))
  )

  useEffect(() => {
    function handleStorageChange(e) {
      if (e.key === STORAGE_KEY) {
        setFavorites(parseFavorites(e.newValue))
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev => {
      const updated = prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {
        return prev
      }

      return updated
    })
  }, [])

  return { favorites, toggleFavorite }
}
