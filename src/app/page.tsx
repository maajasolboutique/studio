
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { products } from './lib/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Laptop, Smartphone, Watch, Camera } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://picsum.photos/seed/42/1200/600" 
              alt="CommerceFlow Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 z-10">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-accent/10 text-accent ring-1 ring-inset ring-accent/20">
                Newly Arrived: AuraPhone 15
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-primary leading-tight">
                Elevate Your Digital Lifestyle
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Experience precision engineering and sophisticated design. Discover our curated collection of high-end electronics.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="bg-primary text-white h-14 px-8 text-lg rounded-full">
                  <Link href="/products">Shop Catalog <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full">
                  <Link href="#">View Lookbook</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-bold">Shop by Category</h2>
                <p className="text-muted-foreground">Premium gear tailored for your specific needs.</p>
              </div>
              <Button variant="link" className="text-primary font-semibold">View All Categories</Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Laptops', icon: Laptop, color: 'bg-blue-100 text-blue-600' },
                { name: 'Phones', icon: Smartphone, color: 'bg-purple-100 text-purple-600' },
                { name: 'Wearables', icon: Watch, color: 'bg-orange-100 text-orange-600' },
                { name: 'Photography', icon: Camera, color: 'bg-green-100 text-green-600' },
              ].map((cat) => (
                <Link key={cat.name} href={`/products?category=${cat.name}`} className="group">
                  <div className="flex flex-col items-center p-8 rounded-2xl bg-white border border-border shadow-sm transition-all hover:shadow-md hover:-translate-y-1 text-center">
                    <div className={`p-4 rounded-full mb-4 ${cat.color}`}>
                      <cat.icon className="h-8 w-8" />
                    </div>
                    <span className="font-headline font-bold text-lg">{cat.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 text-center md:text-left">
              <div className="space-y-2">
                <h2 className="text-4xl font-headline font-bold">Featured Innovations</h2>
                <p className="text-muted-foreground text-lg">The latest and greatest in tech, handpicked by our experts.</p>
              </div>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/products">See All Products</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-primary-foreground/10 pb-12 mb-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-headline font-bold">CommerceFlow</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                We believe that technology should be as beautiful as it is functional. Our mission is to provide you with the best digital tools to enhance your life.
              </p>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-6">Shop</h4>
              <ul className="space-y-4 text-sm text-primary-foreground/70">
                <li><Link href="/products" className="hover:text-accent transition-colors">All Products</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Laptops</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Accessories</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Exclusive Deals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-primary-foreground/70">
                <li><Link href="#" className="hover:text-accent transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Support</Link></li>
                <li><Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-bold mb-6">Stay Connected</h4>
              <p className="text-sm text-primary-foreground/70 mb-4">Subscribe to our newsletter for the latest updates.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  className="bg-primary-foreground/10 border-none rounded-md px-3 py-2 text-sm w-full focus:ring-1 focus:ring-accent"
                />
                <Button className="bg-accent text-white hover:bg-accent/90">Join</Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>&copy; 2024 CommerceFlow. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-accent">Twitter</Link>
              <Link href="#" className="hover:text-accent">Instagram</Link>
              <Link href="#" className="hover:text-accent">LinkedIn</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
