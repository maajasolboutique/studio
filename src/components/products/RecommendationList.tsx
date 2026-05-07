
"use client";

import { useEffect, useState } from 'react';
import { recommendProductDetails, RecommendProductDetailsOutput } from '@/ai/flows/recommend-product-details';
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

        // Map the placeholder IDs back to our mock products where possible
        // or just show random related products from our list for demo
        const related = products
          .filter(p => p.id !== currentProduct.id)
          .slice(0, 3);
        
        setRecommendations(related);
      } catch (error) {
        console.error("AI Recommendation failed", error);
      } finally {
        setLoading(false);
      }
    }

    getRecs();
  }, [currentProduct]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex items-center gap-2 mb-8">
        <Sparkles className="h-5 w-5 text-accent" />
        <h2 className="text-2xl font-headline font-bold">Recommended for You</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
