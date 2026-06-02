import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"
import ToppingList from "./topping-list"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"



export type Product = {
    id: string
    name: string
    description: string
    image: string
    price: number
}

type PropTypes = { product: Product }

const ProductCard = ({
    product
}: PropTypes) => {
  return (
    <Card>
  <CardHeader className="flex items-center justify-center">
    <Image src={product.image} alt="pizza-image" height={150} width={150} />
  </CardHeader>
  <CardContent>
    <h2 className="text-xl font-bold">
        {product.name}
    </h2>
    <p className="mt-2">
        {product.description}
    </p>
  </CardContent>
  <CardFooter className="flex items-center justify-between">
    <p>
        <span>
            From {" "}
        </span>
        <span className="font-bold">
            ₹{" "}{product.price}
        </span>
    </p>
    <Dialog>
        <DialogTitle className="sr-only"/>
  <DialogTrigger
  className="bg-orange-500 hover:bg-orange-500/90 text-white px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
  >Choose</DialogTrigger>
  <DialogContent className="max-w-3xl p-0">
    <div className="flex">
      <div className="w-1/3 bg-white rounded p-8 flex items-center justify-center">
        <Image
        src={'/pizza-main.png'}
        alt={product.name}
        height={450}
        width={450}
        />
      </div>
      <div className="w-2/3 p-8 bg-muted">
         <h3 className="text-xl font-bold">{product.name}</h3>
         <p className="mt-1">{product.description}</p>

      <div>
        <h4 className="mt-6">
          Choose the size
        </h4>
      <RadioGroup
                                        defaultValue="small"
                                        className="grid grid-cols-3 gap-4 mt-2">
                                        <div>
                                            <RadioGroupItem
                                                value="small"
                                                id="small"
                                                className="peer sr-only"
                                                aria-label="Small"
                                            />
                                            <Label
                                                htmlFor="small"
                                                className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                Small
                                            </Label>
                                        </div>

                                        <div>
                                            <RadioGroupItem
                                                value="medium"
                                                id="medium"
                                                className="peer sr-only"
                                                aria-label="Medium"
                                            />
                                            <Label
                                                htmlFor="medium"
                                                className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                Medium
                                            </Label>
                                        </div>

                                        <div>
                                            <RadioGroupItem
                                                value="large"
                                                id="large"
                                                className="peer sr-only"
                                                aria-label="Large"
                                            />
                                            <Label
                                                htmlFor="large"
                                                className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                Large
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div>
                                    <h4 className="mt-6">Choose the crust</h4>
                                    <RadioGroup
                                        defaultValue="thin"
                                        className="grid grid-cols-3 gap-4 mt-2">
                                        <div>
                                            <RadioGroupItem
                                                value="thin"
                                                id="thin"
                                                className="peer sr-only"
                                                aria-label="Thin"
                                            />
                                            <Label
                                                htmlFor="thin"
                                                className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                Thin
                                            </Label>
                                        </div>

                                        <div>
                                            <RadioGroupItem
                                                value="thick"
                                                id="thick"
                                                className="peer sr-only"
                                                aria-label="Thick"
                                            />
                                            <Label
                                                htmlFor="thick"
                                                className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                Thick
                                            </Label>
                                        </div>
                                    </RadioGroup>
      </div>

        <ToppingList />

        <div className="mt-12 flex items-center justify-between">
            <span className="font-bold">
                ₹ {product.price}
            </span>
            <Button>
                <ShoppingCart size={`20`} />
                <span className="ml-2">
                    Add to cart
                </span>
            </Button>
        </div>

        </div>
        </div>  
  </DialogContent>
</Dialog>
  </CardFooter>
</Card>
  )
}

export default ProductCard