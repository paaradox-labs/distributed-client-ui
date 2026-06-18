import { cookies } from "next/headers"
import type { Session, User } from "./types"

export const getSession = async() => {
    return await getSelf()
}

const getSelf  = async(): Promise<Session | null> => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/self`,{
        headers:{
            Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
        }
    })

    if (!response.ok){
        return null
    }

    return {
        user: await response.json() as User
    }
}