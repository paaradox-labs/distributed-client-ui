'use client';
import { useEffect, useMemo, useState } from 'react';
import CartItem from './cartItem';
import Link from 'next/link';
import { useAppSelector } from '@/lib/store/hooks';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getItemTotal } from '@/lib/utils';

const CartItems = ({ restaurantId }: { restaurantId?: string }) => {
    const router = useRouter()

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsClient(true);
    }, []);

    const cart = useAppSelector((state) => state.cart.cartItems);

    const finalTotal = useMemo(() => {
        return cart.reduce((acc, curr) => {
            return acc + curr.qty * getItemTotal(curr)
        },0)
    },[cart])

    if (!isClient) {
        return null;
    }

    if (!cart.length) {
        return (
            <div className="flex flex-col items-center gap-4 py-16">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                <p className="text-gray-500 text-center">
                    Your cart is empty!{' '}
                    <Link
                        className="text-orange-500 hover:underline"
                        href={restaurantId ? `/?restaurantId=${restaurantId}` : '/'}>
                        Continue shopping.
                    </Link>
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {cart.map((cartItem) => (
                <CartItem key={cartItem.hash} item={cartItem} />
            ))}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-6 pt-4 border-t">
                <span className="font-bold text-xl text-center sm:text-left">Total: &#8377;{finalTotal}</span>
                <Button
                 onClick={() => {
                        const id = restaurantId || localStorage.getItem('restaurantId')
                        router.push(id ? `/checkout/?restaurantId=${id}` : '/checkout')
                    }}
                    className="w-full sm:w-auto"
                >
                    Proceed to Checkout
                    <ArrowRight size={16} className="ml-2" />
                </Button>
            </div>
        </div>
    );
};

export default CartItems;
