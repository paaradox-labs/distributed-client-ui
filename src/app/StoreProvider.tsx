/* eslint-disable react-hooks/refs */
'use client'
import { setInitialCartItems } from '@/lib/store/features/cart/cartSlice'
import { AppStore, makeStore } from '@/lib/store/store'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'


export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  // Hydrate persisted cart AFTER mount so the first client render
  // matches the server-rendered HTML (avoids hydration mismatch).
  useEffect(() => {
    const cartItems = window.localStorage.getItem("cartItems")
    if (!cartItems) return
    try {
      const parsedItems = JSON.parse(cartItems)
      if (Array.isArray(parsedItems)) {
        storeRef.current?.dispatch(setInitialCartItems(parsedItems))
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}