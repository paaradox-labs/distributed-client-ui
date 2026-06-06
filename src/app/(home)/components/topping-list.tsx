'use client';
import { startTransition, useEffect, useState } from 'react';
import ToppingCard from './topping-card';
import { Topping } from '@/lib/types';

const ToppingList = ({selectedToppings, handleCheckBoxCheck}:{selectedToppings: Topping[], handleCheckBoxCheck: (topping: Topping) => void}) => {

    const[toppings, setToppings] = useState<Topping[]>([])

    useEffect(() => {
        const fetchData = async() => {
        // todo: Make tenantId Dynamic
        const toppingResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=4`)
        const toppings = await toppingResponse.json()
        setToppings(toppings)
        }
        fetchData()
    },[])

    

    return (
        <section className="mt-4 md:mt-6">
            <h3>Extra toppings</h3>
            <div className="grid grid-cols-3 gap-2 md:gap-4 mt-2">
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