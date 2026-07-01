"use client"

import { useAppDispatch } from "@/lib/store/hooks"
import { useEffect } from "react"
import { clearCart } from "@/lib/store/features/cart/cartSlice"

const CartCleaner = () => {
  
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(clearCart())
  },[dispatch])
    return (
    null  
  )
}

export default CartCleaner