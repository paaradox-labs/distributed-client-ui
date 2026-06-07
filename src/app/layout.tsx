import type { Metadata } from "next";
import { Manrope} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/custom/header";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner"
import Refresher from "@/components/custom/refresher";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pizza.adityavyas.com"),
  title: "Pizza Restaurant | Fresh Hand-Tossed Pizza Delivered to Your Door",
  description: "Craving authentic pizza? We serve hand-tossed, oven-baked pizzas made from premium ingredients. Order online for fast, free delivery in your area tonight!",
  icons: {
    icon: "/pizza-main.png",
  },
  openGraph: {
  title: "Pizza Restaurant | Hand-Tossed Pizza Delivered to Your Door",
    description: "Craving authentic pizza? We serve hand-tossed, oven-baked pizzas made from premium ingredients. Order online for fast, free delivery in your area tonight!",
    url: "https://pizza.adityavyas.com",
    siteName: "Pizza Restaurant",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <StoreProvider>
      <body className={cn(
                        'min-h-screen bg-background font-manrope antialiased',
                        manrope.variable
                    )}
        >
          <Refresher>            
          <Header />
        <main>{children}</main>
        <Toaster />
          </Refresher>
      </body>
      </StoreProvider>
    </html>
  );
}
