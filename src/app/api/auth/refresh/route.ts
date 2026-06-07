import { parseSetCookie } from "cookie";
import { cookies } from "next/headers";

export async function POST() {
        const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/refresh`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
                Cookie: `refreshToken=${(await cookies()).get("refreshToken")?.value}`
            }
        })

        if(!response.ok){
            console.log("Refresh Failed");
            return Response.json({
                success: false
            })
        }

        const c = response.headers.getSetCookie();
                const accessToken = c.find((cookie) => cookie.includes('accessToken'));
                const refreshToken = c.find((cookie) => cookie.includes('refreshToken'));
        
                if (!accessToken || !refreshToken) {
                    console.log("Tokens are missing");
                    return Response.json({
                    success: false
                    })
                }
        
                const parsedAccessToken = parseSetCookie(accessToken);
                const parsedRefreshToken = parseSetCookie(refreshToken);
        
                if (
                    !parsedAccessToken.value ||
                    !parsedRefreshToken.value
                ) {
                    return {
                        type: 'error',
                        message: 'Malformed auth cookies received!',
                    };
                }
        
                const cookieStore = await cookies();
        
                cookieStore.set({
                    name: 'accessToken',
                    value: parsedAccessToken.value,
                    expires: parsedAccessToken.expires,
                    httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
                    path: parsedAccessToken.path,
                    domain: parsedAccessToken.domain,
                    sameSite: parsedAccessToken.sameSite as 'strict',
                });
        
                cookieStore.set({
                    name: 'refreshToken',
                    value: parsedRefreshToken.value,
                    expires: parsedRefreshToken.expires,
                    httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
                    path: parsedRefreshToken.path,
                    domain: parsedRefreshToken.domain,
                    sameSite: parsedRefreshToken.sameSite as 'strict',
                });
        
        return Response.json({
            success: true
        })
}