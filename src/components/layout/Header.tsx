
"use client";

import Link from 'next/link';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { useCart } from '@/app/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const { totalItems, items, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-headline font-bold text-primary">CommerceFlow</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/products" className="transition-colors hover:text-primary">Catalog</Link>
            <Link href="#" className="transition-colors hover:text-primary">Deals</Link>
            <Link href="#" className="transition-colors hover:text-primary">Support</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex relative items-center w-64">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 bg-muted border-none h-9"
            />
          </div>

          <div className="flex items-center gap-2">
            <Link href="/auth">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-accent">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader>
                  <SheetTitle className="font-headline text-xl">Your Shopping Cart</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto py-6">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                      <ShoppingBag className="h-12 w-12 text-muted-foreground opacity-20" />
                      <p className="text-muted-foreground">Your cart is empty.</p>
                      <Button asChild variant="outline">
                        <Link href="/products">Start Shopping</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="flex justify-between text-base font-medium">
                              <h3>{item.name}</h3>
                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center border rounded-md">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-2 py-1 hover:bg-muted"
                                >
                                  -
                                </button>
                                <span className="px-2">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-2 py-1 hover:bg-muted"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-primary hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {items.length > 0 && (
                  <div className="border-t pt-6 space-y-4">
                    <div className="flex justify-between text-base font-semibold">
                      <span>Total Price</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <Button asChild className="w-full h-12 text-lg bg-primary hover:bg-primary/90">
                      <Link href="/checkout">Checkout</Link>
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
