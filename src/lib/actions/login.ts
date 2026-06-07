'use server';
import {parseSetCookie} from 'cookie';
import { cookies } from 'next/headers';

export default async function login(prevState: {type: string, message: unknown} | null, formData:FormData) {
    const email = formData.get('email');
    const password = formData.get('password');
    // todo: do request data validation

    // call auth service    
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.log('error', error);
            return {
                type: 'error',
                message: error.errors[0].message,
            };
        }

        const c = response.headers.getSetCookie();
        const accessToken = c.find((cookie) => cookie.includes('accessToken'));
        const refreshToken = c.find((cookie) => cookie.includes('refreshToken'));

        if (!accessToken || !refreshToken) {
            return {
                type: 'error',
                message: 'No cookies were found!',
            };
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

        return {
            type: 'success',
            message: 'Login successful!',
        };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return {
            type: 'error',
            message: err.message
        };
    }
}