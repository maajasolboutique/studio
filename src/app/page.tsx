
"use client";

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, where, limit, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const db = useFirestore();

  // Fetch Trending Products (isHot)
  const trendingQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'products'), where('isHot', '==', true), limit(4));
  }, [db]);

  // Fetch New Arrivals (isNew)
  const newArrivalsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'products'), where('isNew', '==', true), limit(4));
  }, [db]);

  const { data: trendingProducts, isLoading: trendingLoading } = useCollection(trendingQuery);
  const { data: newArrivals, isLoading: newArrivalsLoading } = useCollection(newArrivalsQuery);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBFB]">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[700px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://picsum.photos/seed/hero-rajputi/1920/1080" 
              alt="Jasol Maa Boutique Hero" 
              className="w-full h-full object-cover"
              data-ai-hint="rajputi bride"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#6D1B1B]/80 via-transparent to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 z-10">
            <div className="max-w-2xl space-y-6 text-white">
              <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold gold-gradient text-accent-foreground shadow-lg animate-bounce">
                New: Bridal Poshak Collection 2024
              </div>
              <h1 className="text-6xl md:text-8xl font-headline font-bold leading-tight drop-shadow-lg">
                Rajwadi Pehchan,<br />
                <span className="text-[#D4AF37]">Shahi Andaz</span>
              </h1>
              <p className="text-2xl text-white/90 max-w-lg font-medium">
                Experience the pinnacle of Rajputi heritage. Handcrafted elegance for the modern queen.
              </p>
              <div className="flex flex-wrap gap-4 pt-6">
                <Button asChild size="lg" className="bg-[#E91E63] hover:bg-[#C2185B] text-white h-16 px-10 text-xl rounded-full shadow-2xl transition-all hover:scale-105">
                  <Link href="/products">Shop Collection <ArrowRight className="ml-2 h-6 w-6" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-10 text-xl rounded-full border-2 border-white text-white bg-transparent hover:bg-white/10 backdrop-blur-sm">
                  <Link href="/stitching">Custom Stitching</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-accent">Browse Categories</h2>
              <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full" />
              <p className="text-muted-foreground text-lg">Curated traditional wear for every special occasion.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: 'Rajputi Poshak', img: 'poshak1' },
                { name: 'Bridal Wear', img: 'bridal1' },
                { name: 'Lehenga', img: 'lehenga1' },
                { name: 'Jewellery', img: 'jewel1' },
              ].map((cat) => (
                <Link key={cat.name} href={`/products?category=${cat.name}`} className="group relative">
                  <div className={`aspect-[4/5] rounded-3xl overflow-hidden border-2 border-transparent group-hover:border-[#D4AF37] transition-all duration-500 shadow-xl`}>
                    <img 
                      src={`https://picsum.photos/seed/${cat.img}/600/800`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt={cat.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                      <span className="text-2xl font-headline font-bold text-white">{cat.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* WhatsApp Banner */}
        <section className="container mx-auto px-4 mb-24">
          <div className="pink-gradient rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="space-y-6 relative z-10">
              <h2 className="text-4xl md:text-5xl font-headline font-bold">Personalized Styling on WhatsApp</h2>
              <p className="text-xl text-white/80 max-w-xl">
                Chat with our boutique experts for custom stitching, size guidance, or real fabric videos.
              </p>
              <Button asChild size="lg" className="bg-white text-[#E91E63] hover:bg-white/90 h-16 px-10 text-xl rounded-full">
                <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  <MessageCircle className="h-6 w-6" /> Order on WhatsApp
                </a>
              </Button>
            </div>
            <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-2xl relative z-10 rotate-3 transition-transform">
              <img src="https://picsum.photos/seed/whatsapp-model/600/600" className="w-full h-full object-cover" alt="WhatsApp Support" />
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="py-24 bg-white border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-16">
              <div className="space-y-2">
                <h2 className="text-4xl font-headline font-bold text-accent">Trending Now</h2>
                <p className="text-muted-foreground text-lg">Most loved designs this wedding season.</p>
              </div>
              <Button asChild variant="outline" className="rounded-full border-[#D4AF37] text-accent hover:bg-[#D4AF37]/10 px-8">
                <Link href="/products">View All</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {trendingLoading ? (
                Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-[400px] w-full rounded-3xl" />)
              ) : trendingProducts?.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
              {!trendingLoading && trendingProducts?.length === 0 && (
                <p className="col-span-full text-center text-muted-foreground italic">New royal designs coming soon...</p>
              )}
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-16">
              <div className="space-y-2">
                <h2 className="text-4xl font-headline font-bold text-accent">New Arrivals</h2>
                <p className="text-muted-foreground text-lg">Your newly added masterpieces.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {newArrivalsLoading ? (
                Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-[400px] w-full rounded-3xl" />)
              ) : newArrivals?.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
              {!newArrivalsLoading && newArrivals?.length === 0 && (
                <p className="col-span-full text-center text-muted-foreground italic">Add your first product to see it here!</p>
              )}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: 'Handmade Excellence', desc: 'Every stitch reflects our heritage and dedication to craftsmanship.', icon: Star },
                { title: 'Royal Quality', desc: 'We use only the finest Thakurji Pure and Satin fabrics.', icon: ShieldCheck },
                { title: 'Global Delivery', desc: 'Secure shipping to your doorstep, across India and worldwide.', icon: Truck },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-white border shadow-sm transition-all hover:shadow-xl hover:-translate-y-2">
                  <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center text-accent shadow-inner">
                    <item.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#6D1B1B] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 border-b border-white/10 pb-16 mb-16">
            <div className="space-y-8">
              <h3 className="text-3xl font-headline font-bold text-[#D4AF37]">Jasol Maa Boutique</h3>
              <p className="text-white/70 leading-relaxed text-lg">
                Preserving the timeless beauty of Rajputi culture through exquisite hand-crafted ethnic wear. Based in Nanda Nagar, Indore.
              </p>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-8 text-xl border-b border-[#D4AF37] pb-2 inline-block">Our Shop</h4>
              <ul className="space-y-4 text-white/70 text-lg">
                <li><Link href="/products?category=Rajputi Poshak" className="hover:text-[#D4AF37] transition-colors">Rajputi Poshak</Link></li>
                <li><Link href="/products?category=Bridal Wear" className="hover:text-[#D4AF37] transition-colors">Bridal Collection</Link></li>
                <li><Link href="/products?category=Lehenga" className="hover:text-[#D4AF37] transition-colors">Designer Lehengas</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-8 text-xl border-b border-[#D4AF37] pb-2 inline-block">Support</h4>
              <ul className="space-y-4 text-white/70 text-lg">
                <li><Link href="/stitching" className="hover:text-[#D4AF37] transition-colors">Custom Stitching</Link></li>
                <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Shipping Policy</Link></li>
                <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Return & Refund</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-8 text-xl border-b border-[#D4AF37] pb-2 inline-block">Contact Us</h4>
              <p className="text-white/70 text-lg mb-4">Nanda Nagar, Indore, Madhya Pradesh</p>
              <p className="text-white/70 text-lg">support@jasolmaa.com</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 font-medium">
            <p className="text-lg">&copy; 2024 Jasol Maa Rajputi Boutique. Crafted with Heritage.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
