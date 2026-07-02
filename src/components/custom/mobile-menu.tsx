"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, ShoppingBasket, Menu as MenuIcon, X } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Button } from "../ui/button"

const MobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const searchParams = useSearchParams()

  const cartHref = searchParams.get('restaurantId')
    ? `/cart?restaurantId=${searchParams.get('restaurantId')}`
    : '/cart'

  return (
    <>
      <div className="flex md:hidden items-center gap-4">
        <div className="relative">
          <Link href={cartHref}>
            <ShoppingBasket className="hover:text-primary transition-colors h-6 w-6" />
          </Link>
          <span className="absolute -top-3 -right-3 h-5 w-5 flex items-center justify-center rounded-full bg-primary font-bold text-white text-xs">
            3
          </span>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1 text-gray-600 hover:text-primary focus:outline-none transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-inner animate-in slide-in-from-top duration-200">
          <div className="px-4 py-6 space-y-6 flex flex-col">
            <ul className="space-y-4 font-semibold text-lg text-gray-800">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block hover:text-primary transition-colors py-1"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="block hover:text-primary transition-colors py-1"
                >
                  Orders
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-3 py-3 border-t border-b border-gray-100 font-medium text-gray-700">
              <Phone className="h-5 w-5 text-primary" />
              <span>+91 9800 098 998</span>
            </div>

            <Button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-6 rounded-full font-bold text-base shadow-md shadow-primary/10"
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileMenu
