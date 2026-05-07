
"use client";

import { use } from 'react';
import { products } from '@/app/lib/products';
import { Header } from '@/components/layout/Header';
import { useCart } from '@/app/context/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, ShieldCheck, Truck, RefreshCcw, Star } from 'lucide-react';
import { RecommendationList } from '@/components/products/RecommendationList';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button asChild>
            <Link href="/products">Back to Catalog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} is ready for checkout.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden border bg-white shadow-sm">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-lg border bg-white cursor-pointer hover:border-primary transition-colors overflow-hidden">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-60 hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-accent/10 text-accent border-none">{product.category}</Badge>
                <div className="flex items-center text-sm text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-2 text-muted-foreground">(48 reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">{product.name}</h1>
              <p className="text-3xl font-bold font-headline mt-4">${product.price.toFixed(2)}</p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-4 pt-6 border-t">
              <div className="flex gap-4">
                <Button onClick={handleAddToCart} size="lg" className="flex-1 h-14 text-lg gap-2 bg-primary hover:bg-primary/90 rounded-full">
                  <ShoppingCart className="h-5 w-5" /> Add to Shopping Bag
                </Button>
                <Button variant="outline" size="icon" className="h-14 w-14 rounded-full">
                  <Heart className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="flex gap-3">
                <div className="p-2 bg-accent/10 rounded-lg"><Truck className="h-5 w-5 text-accent" /></div>
                <div>
                  <p className="text-sm font-bold">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over $500</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="p-2 bg-accent/10 rounded-lg"><RefreshCcw className="h-5 w-5 text-accent" /></div>
                <div>
                  <p className="text-sm font-bold">30-Day Returns</p>
                  <p className="text-xs text-muted-foreground">Hassle-free exchange</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="p-2 bg-accent/10 rounded-lg"><ShieldCheck className="h-5 w-5 text-accent" /></div>
                <div>
                  <p className="text-sm font-bold">Secure Checkout</p>
                  <p className="text-xs text-muted-foreground">Encrypted payments</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specs Table */}
        {product.specs && (
          <section className="py-16 border-t">
            <h2 className="text-2xl font-headline font-bold mb-8">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-4 border-b">
                  <span className="text-muted-foreground font-medium">{key}</span>
                  <span className="font-bold">{value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* AI Recommendations */}
        <RecommendationList currentProduct={product} />
      </main>
    </div>
  );
}
