"use client"

import { logout } from "@/lib/actions/logout"
import { Button } from "../ui/button"
import { usePathname, useSearchParams } from "next/navigation"

const Logout = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const returnTo = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname
  const restaurantId = searchParams.get('restaurantId') || undefined

  return (
    <Button onClick={async() => {
                await logout(returnTo, restaurantId)
              }} className="h-9 sm:h-10 px-4 sm:px-6 rounded-full font-semibold">
                Logout
          </Button>
  )
}

export default Logout