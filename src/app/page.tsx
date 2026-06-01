"use client"

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
        <h1
        className="m-3"
        >
          Welcome to Pizza Shop
        </h1>
        <Button
        className="bg-white text-black m-3"
        onClick={() => alert("hello")}
        >
          Click me
        </Button>
    </div>
  );
}
