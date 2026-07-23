import { useState, useEffect, useCallback, useRef } from 'react'
import { mockProducts } from '../mockProducts'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const timeoutRef = useRef(null)

  const clearPendingLoad = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const loadProducts = useCallback(() => {
    clearPendingLoad()
    setIsLoading(true)
    setError('')

    timeoutRef.current = setTimeout(() => {
      setProducts(mockProducts)
      setIsLoading(false)
      timeoutRef.current = null
    }, 800)
  }, [clearPendingLoad])

  useEffect(() => {
    loadProducts()
    return clearPendingLoad
  }, [loadProducts, clearPendingLoad])

  return { products, isLoading, error, loadProducts }
}
