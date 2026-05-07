
"use client";

import { useEffect, useState } from 'react';
import { recommendProductDetails } from '@/ai/flows/recommend-product-details';
import { Product } from '@/app/lib/products';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';

interface RecommendationListProps {
  currentProduct: Product;
}

export function RecommendationList({ currentProduct }: RecommendationListProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const db = useFirestore();

  // Fetch related products from Firestore as a base
  const relatedQuery = useMemoFirebase(() => {
    if (!db || !currentProduct) return null;
    return query(
      collection(db, 'products'),
      where('category', '==', currentProduct.category),
      limit(4)
    );
  }, [db, currentProduct]);

  const { data: dbRelated, isLoading: dbLoading } = useCollection(relatedQuery);

  useEffect(() => {
    async function getRecs() {
      if (!currentProduct) return;
      setLoading(true);
      try {
        const result = await recommendProductDetails({
          productId: currentProduct.id,
          productName: currentProduct.name,
          productCategory: currentProduct.category,
          productDescription: currentProduct.description,
        });

        // Use Firestore data filtered by the current product ID
        if (dbRelated) {
          const filtered = dbRelated
            .filter(p => p.id !== currentProduct.id)
            .slice(0, 3) as any[];
          setRecommendations(filtered);
        }
      } catch (error) {
        console.error("AI Recommendation client side failed", error);
        if (dbRelated) {
          setRecommendations(dbRelated.filter(p => p.id !== currentProduct.id).slice(0, 3) as any[]);
        }
      } finally {
        setLoading(false);
      }
    }

    if (!dbLoading) {
      getRecs();
    }
  }, [currentProduct, dbRelated, dbLoading]);

  if (loading || dbLoading) {
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
