import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8 mb-12">
      <Card>
        <CardContent className="px-6 md:px-8 py-4">
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-muted-foreground/20 rounded-lg">
            <SearchX className="h-16 w-16 text-muted-foreground mb-6" />
            <p className="text-sm font-semibold text-primary mb-2">404</p>
            <h1 className="text-xl font-semibold mb-2">Page not found</h1>
            <p className="text-muted-foreground max-w-sm mb-6">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
              have been moved or no longer exists.
            </p>
            <Button asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Back to home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
