"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function OrdersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8 mb-12">
      <Card>
        <CardHeader className="px-6 md:px-8">
          <CardTitle className="text-2xl">Orders</CardTitle>
          <CardDescription className="text-base">My complete order history.</CardDescription>
        </CardHeader>
        <CardContent className="px-6 md:px-8">
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-muted-foreground/20 rounded-lg">
            <AlertCircle className="h-16 w-16 text-destructive mb-6" />
            <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              We couldn&apos;t load your orders. Please try again.
            </p>
            <Button onClick={reset}>Try again</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
