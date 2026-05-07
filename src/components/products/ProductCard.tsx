"use client";

import Link from 'next/link';
import { ShoppingCart, Eye, Heart, Sparkles } from 'lucide-react';
import { Product } from '@/app/lib/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to Bag",
      description: `${product.name} is ready for your royal collection.`,
    });
  };

  return (
    <div className="group relative bg-white rounded-3xl border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-[3/4] relative overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
          />
          
          {/* Status Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-[#E91E63] text-white border-none font-bold uppercase text-[10px] tracking-widest rounded-full px-3">New Arrival</Badge>
            )}
            {product.isHot && (
              <Badge className="gold-gradient text-accent-foreground border-none font-bold uppercase text-[10px] tracking-widest rounded-full px-3 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Best Seller
              </Badge>
            )}
          </div>

          <div className="absolute top-4 right-4">
            <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart className="h-5 w-5 text-[#E91E63]" />
            </Button>
          </div>

          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="secondary" size="lg" className="rounded-full font-bold gap-2 gold-gradient text-accent-foreground shadow-xl scale-90 group-hover:scale-100 transition-transform">
              <Eye className="h-5 w-5" /> View Details
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-3">
            <p className="text-xs font-bold text-[#E91E63] uppercase tracking-[0.2em] mb-1">{product.category}</p>
            <h3 className="font-headline font-bold text-xl leading-tight text-accent group-hover:text-[#E91E63] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-6 h-10 italic">
            {product.fabric} fabric • {product.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              {product.discountPrice ? (
                <>
                  <span className="text-2xl font-bold font-headline text-accent">₹{product.discountPrice.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground line-through">₹{product.price.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-2xl font-bold font-headline text-accent">₹{product.price.toLocaleString()}</span>
              )}
            </div>
            
            <Button
              onClick={handleAddToCart}
              size="icon"
              className="bg-accent hover:bg-[#E91E63] rounded-2xl w-12 h-12 shadow-lg transition-all active:scale-95"
            >
              <ShoppingCart className="h-6 w-6 text-white" />
              <span className="sr-only">Add to Cart</span>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
