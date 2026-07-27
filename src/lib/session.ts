import { cookies } from "next/headers"
import type { Session, User } from "./types"

export const getSession = async() => {
    return await getSelf()
}

const getSelf  = async(): Promise<Session | null> => {
    const accessToken = (await cookies()).get("accessToken")?.value
    if (!accessToken) return null

    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/self`,{
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
    })

    if (!response.ok){
        return null
    }

    return {
        user: await response.json() as User
    }
}
