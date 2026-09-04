import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import CartItems from "./cartItems/cartItems";

/**
 * Shell is synchronous (Cache Components/PPR): searchParams and cookies()
 * are read inside the streamed <Suspense> section.
 */
const Cart = ({ searchParams }: { searchParams: Promise<{ restaurantId?: string }> }) => {
    return (
        <section>
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
                <h1 className="text-lg font-bold">Shopping cart</h1>
                <Suspense
                    fallback={
                        <div className="bg-white rounded-lg p-4 sm:p-6 mt-6">
                            <div className="h-6 w-40 bg-gray-100 rounded animate-pulse" />
                            <div className="h-24 bg-gray-50 rounded mt-4 animate-pulse" />
                        </div>
                    }
                >
                    <CartContent searchParams={searchParams} />
                </Suspense>
            </div>
        </section>
    );
}

async function CartContent({ searchParams }: { searchParams: Promise<{ restaurantId?: string }> }) {
    const resolved = await searchParams
    const cookieStore = await cookies()
    const restaurantId = resolved.restaurantId || cookieStore.get('restaurantId')?.value

    if (!resolved.restaurantId && restaurantId) {
        redirect(`/cart?restaurantId=${restaurantId}`)
    }

    return (
        <>
            {restaurantId && (
                <p className="text-sm text-gray-500 mt-1">Restaurant ID: {restaurantId}</p>
            )}
            <div className="bg-white rounded-lg p-4 sm:p-6 mt-6">
                <CartItems restaurantId={restaurantId} />
            </div>
        </>
    );
}

export default Cart
