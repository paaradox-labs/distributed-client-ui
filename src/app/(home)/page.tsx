import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProductCard, { Product } from "./components/product-card";
import { Category } from "@/lib/types";

const products: Product[] = [
    {
        id: '1',
        name: 'Margarita Pizza',
        description: 'This is a very tasty pizza',
        image: '/pizza-main.png',
        price: 500,
    },
    {
        id: '2',
        name: 'Margarita Pizza',
        description: 'This is a very tasty pizza',
        image: '/pizza-main.png',
        price: 500,
    },
    {
        id: '3',
        name: 'Margarita Pizza',
        description: 'This is a very tasty pizza',
        image: '/pizza-main.png',
        price: 500,
    },
    {
        id: '4',
        name: 'Margarita Pizza',
        description: 'This is a very tasty pizza',
        image: '/pizza-main.png',
        price: 500,
    },
    {
        id: '5',
        name: 'Margarita Pizza',
        description: 'This is a very tasty pizza',
        image: '/pizza-main.png',
        price: 500,
    },
];


export default async function Home() {

  const categoryResponse = await fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
    next:{
      revalidate: 3600
    }
  })

  if(!categoryResponse.ok){
    throw new Error("Failed to fetch categories")
  }

  const categories: Category[] = await categoryResponse.json()
  console.log(categories);
  
  return (
    <>
      <section className="bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
            {/* Left Column (Text & CTA) */}
            <div className="flex-1 text-center md:text-left max-w-xl lg:max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-black font-sans leading-tight tracking-tight text-gray-900">
                Super Delicious Pizza in <br className="hidden sm:inline" />
                <span className="text-primary">Only 45 Minutes!</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-xl lg:text-2xl mt-4 md:mt-6 text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">
                Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
              </p>
              <Button className="mt-6 md:mt-8 text-base sm:text-lg rounded-full py-7 px-6 font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-md">
                Get your pizza now
              </Button>
            </div>

            {/* Right Column (Image) */}
            <div className="flex-1 flex justify-center md:justify-end w-full max-w-sm md:max-w-none">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] transition-transform duration-300 hover:rotate-3">
                <Image 
                  alt="pizza-main" 
                  src="/pizza-main.png" 
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 350px, 450px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>  

    <section>
      <div  className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <Tabs defaultValue="pizza">
    <TabsList>
      {
        categories.map((category) => {
          return (
                  <TabsTrigger value={category._id} key={category._id} className="text-md">{category.name}</TabsTrigger>
          )
        })
      }
    </TabsList>
    <TabsContent value="pizza">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
    </TabsContent>
    <TabsContent value="beverages">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
    </TabsContent>
</Tabs>
      </div>
    </section>
    </>
  );
}
