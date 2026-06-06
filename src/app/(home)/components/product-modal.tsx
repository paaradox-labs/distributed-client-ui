"use client"

import { Button } from "@/components/ui/button"
import { DialogTitle, DialogTrigger, DialogContent, Dialog } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ShoppingCart } from "lucide-react"
import ToppingList from "./topping-list"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Product, Topping } from "@/lib/types"
import { startTransition, Suspense, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { addToCart, CartItem } from "@/lib/store/features/cart/cartSlice"
import { cn, hashTheItem } from "@/lib/utils"
import { toast } from "sonner"

type ChosenConfig = {
     [key: string]: string
}

type PropTypes = { product: Product }


const ProductModal = ({
    product
}: PropTypes) => {

    const [dialogOpen, setDialogOpen] = useState(false)
    const cartItems = useAppSelector((state) => state.cart.cartItems)
    const dispatch = useAppDispatch()

    const defaultConfiguration = Object.entries(product.category.priceConfiguration).map(([key,value]) => {
        return {
            [key]: value.availableOptions[0]
        }
    }).reduce((acc, curr) => ({
        ...acc,
        ...curr
    }),{})
    const [chosenConfig, setChosenConfig] = useState<ChosenConfig>(defaultConfiguration as unknown as ChosenConfig)
    const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

        const totalPrice = useMemo(() => {
        const toppingsTotal = selectedToppings.reduce((acc,curr) => acc + curr.price, 0)

        const configPricing = Object.entries(chosenConfig).reduce((acc, [key,value]:[string,string]) => {
            const price = product.priceConfiguration[key].availableOptions[value]
            return acc + price
        },0)
        return toppingsTotal + configPricing
    },[chosenConfig, product, selectedToppings])

    const alreadyHasInCart = useMemo(() => {
        const currentConfiguration = {
            _id: product._id,
            name: product.name,
            image: product.image,
            priceConfiguration: product.priceConfiguration,
            chosenConfiguration: {
                priceConfiguration: {...chosenConfig},
                selectedToppings: selectedToppings
            },
            qty: 1,
        }
        const hash = hashTheItem(currentConfiguration) 
        return cartItems.some((item) => item.hash === hash)
    },[product, chosenConfig, selectedToppings, cartItems])

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

    const handleAddToCart = (product: Product) => {
        const itemToAdd: CartItem = {
            _id: product._id,
            name: product.name,
            image: product.image,
            priceConfiguration: product.priceConfiguration,
            chosenConfiguration:{
                priceConfiguration: chosenConfig!,
                selectedToppings: selectedToppings
            },
            qty: 1,
        };
        dispatch(addToCart(itemToAdd));
        setSelectedToppings([]);
        setDialogOpen(false);
        toast.success("Item added to cart.")
    }
    

        const handleRadioChange = (key: string, data: string) => {
        
        startTransition(() => {
            setChosenConfig((prev) => {
            return{
                ...prev,
                [key]: data
            }
        })
    })
    }

  return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTitle className="sr-only"/>
  <DialogTrigger
  className="bg-orange-500 hover:bg-orange-500/90 text-white px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
  >Choose</DialogTrigger>
  <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl p-0">
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 bg-white rounded-t-lg md:rounded-l-lg md:rounded-t-none p-4 md:p-8 flex items-center justify-center">
        <div className="relative h-28 w-28 sm:h-[180px] sm:w-[180px] md:h-[250px] md:w-[250px] rounded-xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 112px, (max-width: 1024px) 180px, 250px"
          />
        </div>
      </div>
      <div className="w-full md:w-2/3 p-4 md:p-8 bg-muted">
         <h3 className="text-xl font-bold">{product.name}</h3>
         <p className="mt-1">{product.description}</p>

    {Object.entries(product.category.priceConfiguration).map(([key,value]) => {
        return(
            <div key={key}>
        <h4 className="mt-4 md:mt-6">
          Choose the {`${key}`}
        </h4>
      <RadioGroup
                                        onValueChange={(data) => {
                                            handleRadioChange(key, data)
                                        }}
                                        defaultValue={value.availableOptions[0]}
                                        className="grid grid-cols-3 gap-2 md:gap-4 mt-2">
                                        {
                                            value.availableOptions.map((option) => {
                                                return(
                                                    <div key={option}>
                                            <RadioGroupItem
                                                value={option}
                                                id={option}
                                                className="peer sr-only"
                                                aria-label={option}
                                            />
                                            <Label
                                                htmlFor={option}
                                                className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-2 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                {option}
                                            </Label>
                                        </div>
                                                )
                                            })
                                        }
        </RadioGroup>
                                </div>
        )
    })}

    {/* Todo: make this condition dynamic (add  hasToppings field in category service (backend work)) */}
    {/* This is a temp solution and not scalabale */}
    {
        product.category.name === "Pizza" && (
            <Suspense fallback={`Toppings Loading...`}>
        <ToppingList selectedToppings={selectedToppings} handleCheckBoxCheck={handleCheckBoxCheck} />
        </Suspense>
        )
    }
        <div className="mt-6 md:mt-12 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-bold text-lg">
                {totalPrice}
            </span>
            <Button disabled={alreadyHasInCart} className={cn("w-full sm:w-auto", alreadyHasInCart ? "bg-green-600 disabled:opacity-90" : "bg-primary")} onClick={() => handleAddToCart(product)}>
                <ShoppingCart size={`20`} />
                <span className="ml-2">
                    {alreadyHasInCart ? "Already in cart": "Add to cart"}
                </span>
            </Button>
        </div>
        </div>
        </div>  
  </DialogContent>
    </Dialog>
  )
}

export default ProductModal