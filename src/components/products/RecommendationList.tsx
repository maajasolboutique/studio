"use client";

import { useEffect, useState } from 'react';
import { recommendProductDetails } from '@/ai/flows/recommend-product-details';
import { Product, products } from '@/app/lib/products';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';

interface RecommendationListProps {
  currentProduct: Product;
}

export function RecommendationList({ currentProduct }: RecommendationListProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRecs() {
      setLoading(true);
      try {
        const result = await recommendProductDetails({
          productId: currentProduct.id,
          productName: currentProduct.name,
          productCategory: currentProduct.category,
          productDescription: currentProduct.description,
        });

        // Use related products as a base for demo/fallback
        // In a real app, 'result.recommendations' would contain AI-curated IDs to match against
        const related = products
          .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
          .slice(0, 3);
        
        // If related by category is too small, just get some random ones
        if (related.length < 3) {
          const others = products
            .filter(p => p.id !== currentProduct.id && p.category !== currentProduct.category)
            .slice(0, 3 - related.length);
          related.push(...others);
        }
        
        setRecommendations(related);
      } catch (error) {
        console.error("AI Recommendation client side failed", error);
        // Silent fallback to standard related products
        setRecommendations(products.filter(p => p.id !== currentProduct.id).slice(0, 3));
      } finally {
        setLoading(false);
      }
    }

    getRecs();
  }, [currentProduct]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[400px] w-full rounded-[2rem]" />
        ))}
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <section className="mt-24">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 gold-gradient rounded-xl">
          <Sparkles className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h2 className="text-3xl font-headline font-bold text-accent">Recommended for You</h2>
          <p className="text-muted-foreground italic">Specially curated heritage pieces for your royal taste.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
