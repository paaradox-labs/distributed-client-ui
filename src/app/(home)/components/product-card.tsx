import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import Image from "next/image"
import { Product } from "@/lib/types"
import ProductModal from "./product-modal"


type PropTypes = { product: Product }

const ProductCard = ({
    product
}: PropTypes) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex items-center justify-center">
        <div className="relative h-24 w-24 sm:h-[150px] sm:w-[150px] rounded-xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 96px, 150px"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <h2 className="text-xl font-bold">
            {product.name}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
            {product.description}
        </p>
      </CardContent>
  <CardFooter className="flex items-center justify-between">
    <p>
        <span>
            From {" "}
        </span>
        <span className="font-bold">
            ₹{" "}{100}
        </span>
    </p>
    <ProductModal product={product} />
  </CardFooter>
</Card>
  )
}

export default ProductCard