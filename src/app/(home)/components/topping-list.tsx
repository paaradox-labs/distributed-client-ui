'use client';
import { startTransition, useEffect, useState } from 'react';
import ToppingCard from './topping-card';
import { Topping } from '@/lib/types';

const ToppingList = () => {

    const[toppings, setToppings] = useState<Topping[]>([])

    useEffect(() => {
        const fetchData = async() => {
        // todo: Make tenantId Dynamic
        const toppingResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=4`)
        const toppings = await toppingResponse.json()
        setToppings(toppings)
        console.log("toppings: ", toppings);
        }
        fetchData()
    },[])

    const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

    const handleCheckBoxCheck = (topping: Topping) => {
        const isAlreadyExists = selectedToppings.some((element) => element.id === topping.id);

        startTransition(() => {
        if (isAlreadyExists) {
            setSelectedToppings((prev) => prev.filter((elm) => elm.id !== topping.id));
            return;
        }

        setSelectedToppings((prev) => [...prev, topping]);
        })
    };

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