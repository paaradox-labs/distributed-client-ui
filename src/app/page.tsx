"use client"

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
        <h1>
          Welcome to pizza shop
        </h1>
        <Button
        onClick={() => alert("hello")}>
          Click me
        </Button>
    </div>
  );
}
