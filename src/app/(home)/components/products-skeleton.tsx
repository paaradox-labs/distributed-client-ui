
const ProductsSkeleton = () => {
  const items = Array.from({ length: 8 })
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="flex gap-2 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-md bg-gray-200 animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {items.map((_, i) => (
            <div key={i} className="border rounded-xl p-4 space-y-4">
              <div className="flex justify-center">
                <div className="h-24 w-24 sm:h-[150px] sm:w-[150px] rounded-xl bg-gray-200 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-5 w-3/4 rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="h-5 w-16 rounded bg-gray-200 animate-pulse" />
                <div className="h-9 w-24 rounded-full bg-gray-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsSkeleton
