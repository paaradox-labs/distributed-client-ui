import { TabsList, TabsTrigger, TabsContent, Tabs } from '@/components/ui/tabs'
import ProductCard from './product-card'
import { Category, Product } from '@/lib/types'

const ProductList =async () => {

      const categoryResponse = await fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
        next:{
          revalidate: 3600
        }
      })
    
      if(!categoryResponse.ok){
        throw new Error("Failed to fetch categories")
      }
    
      const categories: Category[] = await categoryResponse.json()

      const productsResponse = await fetch(`${process.env.BACKEND_URL}/api/catalog/products?limit=100&tenantId=4`, {
    next:{
      revalidate: 3600
    }
  })

  const products: {data: Product[]} = await productsResponse.json()

  return (
        <section>
      <div  className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <Tabs defaultValue={categories[0]._id}>
    <TabsList>
      {
        categories.map((category) => {
          return (
                  <TabsTrigger value={category._id} key={category._id} className="text-md">{category.name}</TabsTrigger>
          )
        })
      }
    </TabsList>
    {
      categories.map((category) => {
        return (
          <TabsContent key={category._id} value={category._id}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {products.data.filter(product => product.category._id ===  category._id).map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
    </TabsContent>
        )
      })
    }
</Tabs>
      </div>
    </section>
  )
}

export default ProductList