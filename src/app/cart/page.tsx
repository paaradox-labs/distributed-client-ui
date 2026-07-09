import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import CartItems from "./cartItems/cartItems";

const Cart = async ({ searchParams }: { searchParams: Promise<{ restaurantId?: string }> }) => {
    const resolved = await searchParams
    const cookieStore = await cookies()
    const restaurantId = resolved.restaurantId || cookieStore.get('restaurantId')?.value

    if (!resolved.restaurantId && restaurantId) {
        redirect(`/cart?restaurantId=${restaurantId}`)
    }

    const session = await getSession()

    if(!session){
        const returnToQuery = restaurantId ? `?restaurantId=${restaurantId}` : ''
        const returnTo = `/cart${returnToQuery}`

        const loginParams = new URLSearchParams()
        if (restaurantId) loginParams.set('restaurantId', restaurantId)
        loginParams.set('returnTo', returnTo)

        redirect(`/login?${loginParams.toString()}`)
    }

   return (
        <section>
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
                <h1 className="text-lg font-bold">Shopping cart</h1>
                {restaurantId && (
                    <p className="text-sm text-gray-500 mt-1">Restaurant ID: {restaurantId}</p>
                )}
                <div className="bg-white rounded-lg p-4 sm:p-6 mt-6">
                    <CartItems restaurantId={restaurantId} />
                </div>
            </div>
        </section>
    );
}

export default Cart