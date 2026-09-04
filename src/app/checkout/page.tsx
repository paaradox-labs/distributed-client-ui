import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import CustomerForm from './components/customerForm';

/**
 * Shell is synchronous (Cache Components/PPR): searchParams and the
 * session (cookies()) are read inside the streamed <Suspense> section.
 */
export default function Checkout({ searchParams }: { searchParams: Promise<{ restaurantId?: string }> }) {
    return (
        <Suspense
            fallback={
                <div className="max-w-2xl mx-auto px-4 py-12">
                    <div className="h-8 w-48 bg-gray-100 rounded animate-pulse" />
                    <div className="h-64 bg-gray-50 rounded mt-6 animate-pulse" />
                </div>
            }
        >
            <CheckoutContent searchParams={searchParams} />
        </Suspense>
    )
}

async function CheckoutContent({ searchParams }: { searchParams: Promise<{ restaurantId?: string }> }) {
    const resolved = await searchParams
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

    return <CustomerForm />
}
