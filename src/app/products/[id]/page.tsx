
"use client";

import { use } from 'react';
import { Header } from '@/components/layout/Header';
import { useCart } from '@/app/context/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, ShieldCheck, Truck, RefreshCcw, Star, Loader2 } from 'lucide-react';
import { RecommendationList } from '@/components/products/RecommendationList';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useDoc, useMemoFirebase, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const db = useFirestore();

  const productRef = useMemoFirebase(() => {
    if (!db || !id) return null;
    return doc(db, 'products', id);
  }, [db, id]);

  const { data: product, isLoading } = useDoc(productRef);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product as any);
    toast({
      title: "Added to Bag",
      description: `${product.name} is ready for checkout.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
        <p className="mt-4 text-accent font-bold">Loading royal details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Masterpiece Not Found</h1>
          <Button asChild className="rounded-full bg-accent">
            <Link href="/products">Back to Catalog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden border bg-white shadow-xl">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <Badge className="bg-accent/10 text-accent border-none font-bold">{product.category}</Badge>
                <div className="flex items-center text-sm text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-2 text-muted-foreground">(Verified Purchase)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-accent">{product.name}</h1>
              <div className="flex items-baseline gap-4 mt-4">
                <p className="text-3xl font-bold font-headline text-[#E91E63]">₹{product.price.toLocaleString()}</p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed italic">
              {product.description}
            </p>

            <div className="space-y-4 pt-6 border-t">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-2 text-sm font-bold text-accent">
                  <span>Fabric:</span>
                  <span className="text-muted-foreground font-normal">{product.fabric || "Pure Satin / Georgette"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-accent">
                  <span>Status:</span>
                  <Badge className="bg-green-100 text-green-700 border-none">{product.stockStatus || "In Stock"}</Badge>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button onClick={handleAddToCart} size="lg" className="flex-1 h-14 text-lg gap-2 bg-[#E91E63] hover:bg-[#C2185B] rounded-full shadow-lg">
                  <ShoppingCart className="h-5 w-5" /> Add to Shopping Bag
                </Button>
                <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-muted">
                  <Heart className="h-6 w-6 text-[#E91E63]" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-muted rounded-full"><Truck className="h-5 w-5 text-accent" /></div>
                <p className="text-xs font-bold">Fast Shipping</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-muted rounded-full"><RefreshCcw className="h-5 w-5 text-accent" /></div>
                <p className="text-xs font-bold">Quality Check</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-muted rounded-full"><ShieldCheck className="h-5 w-5 text-accent" /></div>
                <p className="text-xs font-bold">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <RecommendationList currentProduct={product as any} />
      </main>
    </div>
  );
}
