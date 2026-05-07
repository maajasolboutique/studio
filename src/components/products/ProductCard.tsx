
"use client";

import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/app/lib/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/context/cart-context';
import { useToast } from '@/hooks/use-toast';

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
      title: "Added to cart",
      description: `${product.name} has been added to your shopping bag.`,
    });
  };

  return (
    <div className="group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-square relative overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="secondary" size="sm" className="gap-2">
              <Eye className="h-4 w-4" /> View Details
            </Button>
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">{product.category}</p>
              <h3 className="font-headline font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </div>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 h-10">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-bold font-headline">${product.price.toFixed(2)}</span>
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="bg-primary hover:bg-primary/90 rounded-full w-10 h-10 p-0"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Add to Cart</span>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
