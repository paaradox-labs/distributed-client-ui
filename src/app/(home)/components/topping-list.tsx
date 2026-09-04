'use client';
import { useEffect, useState } from 'react';
import ToppingCard from './topping-card';
import { Topping } from '@/lib/types';
import { useSearchParams } from 'next/navigation';

const ToppingList = ({selectedToppings, handleCheckBoxCheck}:{selectedToppings: Topping[], handleCheckBoxCheck: (topping: Topping) => void}) => {

    const searchParams  = useSearchParams();
    const[toppings, setToppings] = useState<Topping[]>([])

    useEffect(() => {
        const fetchData = async() => {
        // Same-origin path - the storefront ingress routes /api/catalog to the
        // catalog service (NEXT_PUBLIC_* vars are inlined at build time, so a
        // build without them would produce "undefined/api/..." here).
        const toppingResponse = await fetch(`/api/catalog/toppings?tenantId=${searchParams.get("restaurantId")}`)
        const toppings = await toppingResponse.json()
        setToppings(toppings)
        }
        fetchData()
    },[searchParams])

    

    return (
        <section className="mt-4 md:mt-6">
            <h3>Extra toppings</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 mt-2">
                {toppings.map((topping) => {
                    return (
                        <ToppingCard
                            key={topping.id}
                            topping={topping}
                            selectedToppings={selectedToppings}
                            handleCheckBoxCheck={handleCheckBoxCheck}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default ToppingList;