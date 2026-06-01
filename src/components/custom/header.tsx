"use client"

import { useState } from "react"
import Link from "next/link"
import { SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, Select } from "../ui/select"
import { Phone, ShoppingBasket, Menu as MenuIcon, X } from "lucide-react"
import { Button } from "../ui/button"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left Side: Logo & Restaurant Selector */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/">
            <svg
              data-testid="logo"
              width="90"
              height="27"
              viewBox="0 0 90 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 sm:h-7 w-auto"
            >
              <circle cx="11" cy="13.5" r="7.5" stroke="#F65F42" strokeWidth="7" />
              <path
                d="M33.474 23.84V8.088H35.564L35.806 9.782C36.158 9.26867 36.642 8.814 37.258 8.418C37.874 8.022 38.666 7.824 39.634 7.824C40.69 7.824 41.6213 8.07333 42.428 8.572C43.2347 9.07067 43.8653 9.75267 44.32 10.618C44.7893 11.4833 45.024 12.466 45.024 13.566C45.024 14.666 44.7893 15.6487 44.32 16.514C43.8653 17.3647 43.2347 18.0393 42.428 18.538C41.6213 19.022 40.6827 19.264 39.612 19.264C38.7613 19.264 38.006 19.0953 37.346 18.758C36.7007 18.4207 36.1873 17.944 35.806 17.328V23.84H33.474ZM39.216 17.24C40.2133 17.24 41.0347 16.9027 41.68 16.228C42.3253 15.5387 42.648 14.644 42.648 13.544C42.648 12.8253 42.5013 12.1873 42.208 11.63C41.9147 11.0727 41.5113 10.64 40.998 10.332C40.4847 10.0093 39.8907 9.848 39.216 9.848C38.2187 9.848 37.3973 10.1927 36.752 10.882C36.1213 11.5713 35.806 12.4587 35.806 13.544C35.806 14.644 36.1213 15.5387 36.752 16.228C37.3973 16.9027 38.2187 17.24 39.216 17.24ZM48.8663 6.02C48.4263 6.02 48.0596 5.888 47.7663 5.624C47.4876 5.34533 47.3483 5.00067 47.3483 4.59C47.3483 4.17933 47.4876 3.842 47.7663 3.578C48.0596 3.29933 48.4263 3.16 48.8663 3.16C49.3063 3.16 49.6656 3.29933 49.9443 3.578C50.2376 3.842 50.3843 4.17933 50.3843 4.59C50.3843 5.00067 50.2376 5.34533 49.9443 5.624C49.6656 5.888 49.3063 6.02 48.8663 6.02ZM47.7003 19V8.088H50.0323V19H47.7003ZM52.3847 19V17.108L58.2147 10.024H52.4727V8.088H60.8547V9.98L54.9807 17.064H60.9647V19H52.3847ZM62.6328 19V17.108L68.4628 10.024H62.7208V8.088H71.1028V9.98L65.2288 17.064H71.2128V19H62.6328ZM77.3028 19.264C76.3788 19.264 75.6161 19.11 75.0148 18.802C74.4135 18.494 73.9661 18.0907 73.6728 17.592C73.3795 17.0787 73.2328 16.5213 73.2328 15.92C73.2328 14.864 73.6435 14.028 74.4648 13.412C75.2861 12.796 76.4595 12.488 77.9848 12.488H80.8448V12.29C80.8448 11.4393 80.6101 10.8013 80.1408 10.376C79.6861 9.95067 79.0921 9.738 78.3588 9.738C77.7135 9.738 77.1488 9.89933 76.6648 10.222C76.1955 10.53 75.9095 10.992 75.8068 11.608H73.4748C73.5481 10.816 73.8121 10.1413 74.2668 9.584C74.7361 9.012 75.3228 8.088H77.9848"
                fill="#484848"
              />
            </svg>
          </Link>
          <Select>
            <SelectTrigger className="w-[140px] sm:w-[180px] focus-visible:ring-0 focus:ring-0 focus-visible:border-input text-xs sm:text-sm h-9 sm:h-10">
              <SelectValue placeholder="Select Restaurant" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="cheesy-delight">Cheesy Delight</SelectItem>
                <SelectItem value="pizza-hut">Pizza Hut</SelectItem>
                <SelectItem value="kids-corner">Kids corner</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop & Tablet Navigation (md:flex) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <ul className="flex items-center font-medium gap-6 text-sm lg:text-base">
            <li className="hover:text-primary transition-colors">
              <Link href="/">Menu</Link>
            </li>
            <li className="hover:text-primary transition-colors">
              <Link href="/">Orders</Link>
            </li>
          </ul>

          <div className="relative">
            <Link href="/cart">
              <ShoppingBasket className="hover:text-primary transition-colors h-6 w-6" />
            </Link>
            <span className="absolute -top-3 -right-3 h-5 w-5 flex items-center justify-center rounded-full bg-primary font-bold text-white text-xs">
              3
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-sm lg:text-base font-medium">
            <Phone className="h-4 w-4 text-primary" />
            <span>+91 9800 098 998</span>
          </div>

          <Button className="h-9 sm:h-10 px-4 sm:px-6 rounded-full font-semibold">
            Logout
          </Button>
        </div>

        {/* Mobile Controls (md:hidden) */}
        <div className="flex md:hidden items-center gap-4">
          <div className="relative">
            <Link href="/cart">
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
      </nav>

      {/* Mobile Slide-down Menu Container */}
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
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
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
    </header>
  )
}

export default Header
