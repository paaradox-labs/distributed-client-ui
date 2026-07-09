import Image from 'next/image';
import { changeQty, CartItem as Item } from '@/lib/store/features/cart/cartSlice';
import { Trash2 } from 'lucide-react';
import QtyChanger from "./qtyChanger"
import { useAppDispatch } from '@/lib/store/hooks';
import { useTotal } from '@/lib/hooks/useTotal';

const CartItem = ({ item }: { item: Item }) => {

    const dispatch = useAppDispatch()
    const total = useTotal(item)

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 py-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Image src={item.image} width={80} height={80} alt={item.name} className="rounded-lg shrink-0 w-20 h-20 object-cover" />
                    <div className="min-w-0">
                        <h2 className="font-bold text-sm sm:text-base truncate">{item.name}</h2>
                        <p className="text-xs text-gray-500 truncate">
                            {Object.values(item.chosenConfiguration.priceConfiguration)
                                .map((value) => value)
                                .join(', ')}
                        </p>
                        {item.chosenConfiguration.selectedToppings.length > 0 && (
                            <p className="text-xs text-gray-500 truncate">
                                {item.chosenConfiguration.selectedToppings
                                    .map((topping) => topping.name)
                                    .join(', ')}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 ml-0 sm:ml-4">
                    <div>
                        <QtyChanger handleQtyChange={(data) => {
                            dispatch(changeQty({hash: item.hash as string, qty: data}))
                        }}>{item.qty}</QtyChanger>
                    </div>
                    <div className="font-bold text-sm sm:text-base whitespace-nowrap">&#8377;{total * item.qty}</div>
                    <button className="text-gray-400 hover:text-destructive transition-colors p-1" onClick={() => {
                        dispatch(changeQty({hash: item.hash as string, qty: 0}))
                    }}>
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
            <hr />
        </>
    );
};

export default CartItem;
