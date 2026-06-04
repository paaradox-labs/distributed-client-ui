'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';


type PropType = {
    topping: Topping;
    selectedToppings: Topping[];
    handleCheckBoxCheck: (topping: Topping) => void;
};
const ToppingCard = ({ topping, selectedToppings, handleCheckBoxCheck }: PropType) => {
    const isCurrentSelected = selectedToppings.some((element) => element.id === topping.id);

    return (
        <Button
            onClick={() => handleCheckBoxCheck(topping)}
            variant={'outline'}
            className={cn(
                'flex flex-col h-auto md:h-42 relative py-2 md:py-4',
                isCurrentSelected ? 'border-primary' : ''
            )}>
            <Image src={topping.image} width={60} height={60} className="md:w-[80px] md:h-[80px]" alt={topping.name} />
            <h4>{topping.name}</h4>
            <p>&#8377;{topping.price}</p>
            {isCurrentSelected && <CircleCheck className="absolute top-1 right-1 text-primary" />}
        </Button>
    );
};

export default ToppingCard;