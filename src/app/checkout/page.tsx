import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import CheckoutForm from './checkout-form';

export default async function Checkout({ searchParams }: { searchParams: Promise<{ restaurantId?: string }> }) {

    const resolved = await searchParams
    console.log("searchParams resolved:", JSON.stringify(resolved))

    const session = await getSession()

    const restaurantId = resolved.restaurantId || (await cookies()).get('restaurantId')?.value

    const params = new URLSearchParams()
    if (restaurantId) params.set('restaurantId', restaurantId)
    const queryString = params.toString()

    if(!session){
        redirect(queryString ? `/login?${queryString}` : '/login')
    }

    return <CheckoutForm session={session} />

}