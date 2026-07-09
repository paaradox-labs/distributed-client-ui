"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Phone, ShoppingBasket, Menu as MenuIcon, X } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import { useAppSelector } from "@/lib/store/hooks"

const MobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const searchParams = useSearchParams()
  const cartItems = useAppSelector((state) => state.cart.cartItems)
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0)

  const cartHref = searchParams.get('restaurantId')
    ? `/cart?restaurantId=${searchParams.get('restaurantId')}`
    : '/cart'

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <div className="flex md:hidden items-center gap-4">
        <div className="relative">
          <Link href={cartHref}>
            <ShoppingBasket className="hover:text-primary transition-colors h-6 w-6" />
          </Link>
          {cartCount > 0 && (
            <span className="absolute -top-3 -right-3 h-5 w-5 flex items-center justify-center rounded-full bg-primary font-bold text-white text-xs">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-1 text-gray-600 hover:text-primary focus:outline-none transition-colors"
          aria-label="Open Menu"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
          <span className="font-bold text-lg">Navigation</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 text-gray-600 hover:text-primary focus:outline-none transition-colors"
            aria-label="Close Menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-4 py-6 space-y-6 flex flex-col h-[calc(100%-64px)]">
          <ul className="space-y-2 font-semibold text-lg text-gray-800">
            <li>
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Orders
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3 px-4 py-3 border-t border-b border-gray-100 font-medium text-gray-700">
            <Phone className="h-5 w-5 text-primary shrink-0" />
            <span>+91 9800 098 998</span>
          </div>

          <div className="mt-auto">
            <Button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-6 rounded-full font-bold text-base shadow-md shadow-primary/10"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
