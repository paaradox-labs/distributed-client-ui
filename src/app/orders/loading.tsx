import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function OrdersLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8 mb-12">
      <Card>
        <CardHeader className="px-6 md:px-8">
          <CardTitle className="text-2xl">Orders</CardTitle>
          <CardDescription className="text-base">My complete order history.</CardDescription>
        </CardHeader>
        <CardContent className="px-6 md:px-8 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 w-full rounded-lg bg-gray-200 animate-pulse" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
