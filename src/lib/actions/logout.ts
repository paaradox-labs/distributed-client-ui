"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const logout = async(returnTo?: string, restaurantId?: string) => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/logout`, {
        method: "POST",
        headers:{
            Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
            cookie: `refreshToken=${(await cookies()).get("refreshToken")?.value }`
        }
    })

    if(!response.ok){
        console.log("Logout Failed: ", response.status);
        return false
    }

    const cookieStore = await cookies()
    cookieStore.set({ name: "accessToken", value: "", expires: new Date(0), path: "/" })
    cookieStore.set({ name: "refreshToken", value: "", expires: new Date(0), path: "/" })

    const loginParams = new URLSearchParams()
    if (restaurantId) loginParams.set('restaurantId', restaurantId)
    if (returnTo) loginParams.set('returnTo', returnTo)

    redirect(loginParams.toString() ? `/login?${loginParams.toString()}` : '/login')
}