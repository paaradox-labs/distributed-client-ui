"use client"

import { useAppSelector } from "@/lib/store/hooks"
import { ShoppingBasket } from "lucide-react"
import Link from "next/link"


const CartCounter = () => {

  const cartItems = useAppSelector((state) => state.cart.cartItems)
  

  return (
    <>
    <div className="relative">
            <Link href="/cart">
              <ShoppingBasket className="hover:text-primary transition-colors h-6 w-6" />
            </Link>
            <span className="absolute -top-3 -right-3 h-5 w-5 flex items-center justify-center rounded-full bg-primary font-bold text-white text-xs">
              {cartItems.length}
            </span>
          </div>
    </>
  )
}

export default CartCounter