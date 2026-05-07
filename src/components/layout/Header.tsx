
"use client";

import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, Phone, Heart, Globe } from 'lucide-react';
import { useCart } from '@/app/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export function Header() {
  const { totalItems, items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const [lang, setLang] = useState('EN');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="bg-[#6D1B1B] text-white py-2 text-center text-xs font-bold tracking-widest uppercase">
        Festive Sale: Get 10% Extra Points on Bridal Collection
      </div>
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex flex-col items-center group">
            <span className="text-3xl font-headline font-extrabold text-[#E91E63] group-hover:text-[#D4AF37] transition-colors leading-none tracking-tighter">JASOL MAA</span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#6D1B1B] uppercase">Rajputi Boutique</span>
          </Link>
          <nav className="hidden xl:flex gap-8 text-sm font-bold uppercase tracking-wider text-accent">
            <Link href="/products" className="transition-all hover:text-[#E91E63] hover:scale-105">Catalog</Link>
            <Link href="/products?category=Bridal Wear" className="transition-all hover:text-[#E91E63] hover:scale-105">Bridal</Link>
            <Link href="/stitching" className="transition-all hover:text-[#E91E63] hover:scale-105">Custom Stitching</Link>
            <Link href="/products?category=Jewellery" className="transition-all hover:text-[#E91E63] hover:scale-105">Jewellery</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex relative items-center w-72">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search poshak, lehenga..."
              className="pl-10 bg-muted/50 border-none h-11 rounded-full focus:ring-2 ring-[#D4AF37]"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden sm:flex gap-2 font-bold text-accent"
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
            >
              <Globe className="h-4 w-4" />
              {lang}
            </Button>

            <Link href="/auth">
              <Button variant="ghost" size="icon" className="text-accent hover:text-[#E91E63] hover:bg-transparent">
                <User className="h-6 w-6" />
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="hidden sm:flex text-accent hover:text-[#E91E63] hover:bg-transparent">
              <Heart className="h-6 w-6" />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-accent hover:text-[#E91E63] hover:bg-transparent">
                  <ShoppingBag className="h-6 w-6" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-[#E91E63] text-white animate-pulse">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md flex flex-col bg-[#FFFBFB]">
                <SheetHeader>
                  <SheetTitle className="font-headline text-2xl text-accent border-b pb-4">Royal Shopping Bag</SheetTitle>
                  <SheetDescription className="sr-only">Review the items in your cart before checking out.</SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto py-8">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
                      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground opacity-20" />
                      </div>
                      <p className="text-muted-foreground text-lg">Your royal bag is empty.</p>
                      <Button asChild className="bg-[#E91E63] rounded-full px-8">
                        <Link href="/products">Browse Heritage</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-6 animate-in slide-in-from-right-4">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border shadow-sm">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="flex justify-between text-base font-bold text-accent">
                              <h3 className="line-clamp-1">{item.name}</h3>
                              <p className="ml-4">₹{(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center border rounded-full bg-white shadow-sm overflow-hidden">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1 hover:bg-muted transition-colors"
                                >
                                  -
                                </button>
                                <span className="px-3 font-bold">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1 hover:bg-muted transition-colors"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-[#E91E63] font-bold hover:underline"
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
                  <div className="border-t pt-8 space-y-6">
                    <div className="flex justify-between text-xl font-headline font-bold text-accent">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">Taxes and shipping calculated at checkout.</p>
                    <Button asChild className="w-full h-14 text-xl bg-[#E91E63] hover:bg-[#C2185B] rounded-full shadow-xl">
                      <Link href="/checkout">Checkout Now</Link>
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden text-accent">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="sr-only">Main Menu</SheetTitle>
                  <SheetDescription className="sr-only">Explore boutique sections and collections.</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-6 mt-12 text-lg font-bold uppercase tracking-widest text-accent">
                  <Link href="/products" className="hover:text-[#E91E63]">Catalog</Link>
                  <Link href="/products?category=Rajputi Poshak" className="hover:text-[#E91E63]">Poshak</Link>
                  <Link href="/products?category=Bridal Wear" className="hover:text-[#E91E63]">Bridal</Link>
                  <Link href="/stitching" className="hover:text-[#E91E63]">Custom Stitching</Link>
                  <Link href="/products?category=Jewellery" className="hover:text-[#E91E63]">Jewellery</Link>
                  <Link href="/products?category=Kids Rajputi Wear" className="hover:text-[#E91E63]">Kids Wear</Link>
                  <div className="pt-8 border-t flex flex-col gap-4">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Connect With Us</p>
                    <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-3 text-sm hover:text-[#E91E63]">
                      <Phone className="h-4 w-4" /> Call Boutique
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
