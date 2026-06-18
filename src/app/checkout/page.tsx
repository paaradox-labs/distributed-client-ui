import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import CheckoutForm from './checkout-form';

export default async function Checkout({ searchParams }: { searchParams: Promise<{ restaurantId?: string }> }) {

    const resolved = await searchParams
    console.log("searchParams resolved:", JSON.stringify(resolved))

    const session = await getSession()

    const restaurantId = resolved.restaurantId || (await cookies()).get('restaurantId')?.value

    if(!session){
        const returnToQuery = restaurantId ? `?restaurantId=${restaurantId}` : ''
        const returnTo = `/checkout${returnToQuery}`

        const loginParams = new URLSearchParams()
        if (restaurantId) loginParams.set('restaurantId', restaurantId)
        loginParams.set('returnTo', returnTo)

        redirect(`/login?${loginParams.toString()}`)
    }

    return <CheckoutForm session={session} />

}