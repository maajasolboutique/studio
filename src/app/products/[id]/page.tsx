
"use client";

import { use, useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { useCart } from '@/app/context/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, ShieldCheck, Truck, RefreshCcw, Star, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { RecommendationList } from '@/components/products/RecommendationList';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useDoc, useMemoFirebase, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { cn } from '@/lib/utils';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const db = useFirestore();
  const [activeImage, setActiveImage] = useState<string>('');

  const productRef = useMemoFirebase(() => {
    if (!db || !id) return null;
    return doc(db, 'products', id);
  }, [db, id]);

  const { data: product, isLoading } = useDoc(productRef);

  useEffect(() => {
    if (product?.image) {
      setActiveImage(product.image);
    }
  }, [product]);

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

  // Combine images array if it exists
  const allImages = product.images && Array.isArray(product.images) 
    ? [...new Set([product.image, ...product.images])] 
    : [product.image];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery Section */}
          <div className="space-y-6">
            <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden border bg-white shadow-2xl relative group">
              <img 
                src={activeImage || product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-all duration-500"
              />
              
              {/* Navigation Arrows for Mobile-style quick switch */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full bg-white/80"
                  onClick={() => {
                    const idx = allImages.indexOf(activeImage);
                    const prevIdx = idx > 0 ? idx - 1 : allImages.length - 1;
                    setActiveImage(allImages[prevIdx]);
                  }}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full bg-white/80"
                  onClick={() => {
                    const idx = allImages.indexOf(activeImage);
                    const nextIdx = idx < allImages.length - 1 ? idx + 1 : 0;
                    setActiveImage(allImages[nextIdx]);
                  }}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 px-1 scrollbar-hide">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={cn(
                      "h-24 w-20 flex-shrink-0 rounded-2xl border-2 overflow-hidden transition-all",
                      activeImage === img ? "border-[#E91E63] scale-105 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`View ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge className="bg-accent/10 text-accent border-none font-bold px-4 py-1 rounded-full">{product.category}</Badge>
                <div className="flex items-center text-sm text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-2 text-muted-foreground font-medium">(Verified Boutique Piece)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-accent leading-tight">{product.name}</h1>
              <div className="flex items-baseline gap-4 mt-6">
                <p className="text-4xl font-bold font-headline text-[#E91E63]">₹{product.price.toLocaleString()}</p>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Free Delivery</Badge>
              </div>
            </div>

            <div className="p-6 bg-muted/30 rounded-3xl border border-muted-foreground/5 italic text-lg leading-relaxed text-muted-foreground">
              {product.description}
            </div>

            <div className="space-y-6 pt-6 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Fabric</p>
                  <p className="text-accent font-bold">{product.fabric || "Premium Rajputi Satin"}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Stock</p>
                  <p className="text-green-600 font-bold">{product.stockStatus || "In Stock"}</p>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button onClick={handleAddToCart} size="lg" className="flex-1 h-16 text-xl gap-3 bg-[#E91E63] hover:bg-[#C2185B] rounded-full shadow-2xl transition-all active:scale-95">
                  <ShoppingCart className="h-6 w-6" /> Add to Shopping Bag
                </Button>
                <Button variant="outline" size="icon" className="h-16 w-16 rounded-full border-muted hover:bg-pink-50 hover:border-pink-200 group">
                  <Heart className="h-7 w-7 text-[#E91E63] group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t">
              {[
                { icon: Truck, label: 'Express Delivery' },
                { icon: RefreshCcw, label: 'Quality Tested' },
                { icon: ShieldCheck, label: 'Royal Guarantee' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center gap-3">
                  <div className="p-4 bg-muted/50 rounded-2xl"><item.icon className="h-6 w-6 text-accent" /></div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <RecommendationList currentProduct={product as any} />
      </main>
    </div>
  );
}
