import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { products } from './lib/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, ShoppingBag, ShieldCheck, Truck, MessageCircle } from 'lucide-react';

export default function Home() {
  const trendingProducts = products.filter(p => p.isHot).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

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
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#6D1B1B]/80 via-transparent to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 z-10">
            <div className="max-w-2xl space-y-6 text-white">
              <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold gold-gradient text-accent-foreground shadow-lg animate-bounce">
                New: Bridal Poshak Collection 2024
              </div>
              <h1 className="text-6xl md:text-8xl font-headline font-extrabold leading-tight drop-shadow-lg">
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
                { name: 'Rajputi Poshak', img: 'poshak1', color: 'from-pink-50 to-pink-100' },
                { name: 'Bridal Wear', img: 'bridal1', color: 'from-red-50 to-red-100' },
                { name: 'Lehenga', img: 'lehenga1', color: 'from-yellow-50 to-yellow-100' },
                { name: 'Jewellery', img: 'jewel1', color: 'from-amber-50 to-amber-100' },
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
            <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-2xl relative z-10 rotate-3 group-hover:rotate-0 transition-transform">
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
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
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
              <div className="flex gap-6">
                <Link href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </Link>
                <Link href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.778h-2.954v-3.422h2.954v-2.527c0-2.925 1.787-4.516 4.396-4.516 1.25 0 2.324.093 2.637.135v3.058l-1.811.001c-1.419 0-1.694.675-1.694 1.664v2.185h3.384l-.441 3.422h-2.943v8.778h6.028c.732 0 1.325-.593 1.325-1.324v-21.351c0-.732-.593-1.325-1.325-1.325z"/></svg>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-8 text-xl border-b border-[#D4AF37] pb-2 inline-block">Our Shop</h4>
              <ul className="space-y-4 text-white/70 text-lg">
                <li><Link href="/products?category=Rajputi Poshak" className="hover:text-[#D4AF37] transition-colors">Rajputi Poshak</Link></li>
                <li><Link href="/products?category=Bridal Wear" className="hover:text-[#D4AF37] transition-colors">Bridal Collection</Link></li>
                <li><Link href="/products?category=Lehenga" className="hover:text-[#D4AF37] transition-colors">Designer Lehengas</Link></li>
                <li><Link href="/products?category=Jewellery" className="hover:text-[#D4AF37] transition-colors">Shahi Jewellery</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-8 text-xl border-b border-[#D4AF37] pb-2 inline-block">Support</h4>
              <ul className="space-y-4 text-white/70 text-lg">
                <li><Link href="/stitching" className="hover:text-[#D4AF37] transition-colors">Custom Stitching</Link></li>
                <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Shipping Policy</Link></li>
                <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Return & Refund</Link></li>
                <li><Link href="#" className="hover:text-[#D4AF37] transition-colors">Measurement Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-8 text-xl border-b border-[#D4AF37] pb-2 inline-block">Contact Us</h4>
              <p className="text-white/70 text-lg mb-4">Nanda Nagar, Indore, Madhya Pradesh</p>
              <p className="text-white/70 text-lg mb-4">+91 91111 22222</p>
              <p className="text-white/70 text-lg">support@jasolmaa.com</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 font-medium">
            <p className="text-lg">&copy; 2024 Jasol Maa Rajputi Boutique. Crafted with Heritage.</p>
            <div className="flex gap-8 text-lg">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
