"use client"

import { logout } from "@/lib/actions/logout"
import { Button } from "../ui/button"

const Logout = () => {
  return (
    <Button onClick={async() => {
                await logout()
              }} className="h-9 sm:h-10 px-4 sm:px-6 rounded-full font-semibold">
                Logout
          </Button>
  )
}

export default Logout