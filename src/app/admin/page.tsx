"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Scissors, 
  Package, 
  Plus,
  LayoutDashboard,
  Settings,
  TicketPercent,
  MessageSquare,
  Search,
  BarChart3,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const db = useFirestore();
  const { toast } = useToast();

  // State for new product
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Rajputi Poshak',
    price: '',
    fabric: '',
    description: '',
    image: '',
    stockStatus: 'In Stock'
  });

  // Queries for real data
  const productsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(50));
  }, [db]);

  const { data: products, isLoading: productsLoading } = useCollection(productsQuery);

  const validateImageUrl = (url: string) => {
    if (!url) return false;
    // Reject tracking/ad links
    if (url.includes('google.com/aclk') || url.includes('doubleclick') || url.includes('ad-services')) {
      return false;
    }
    // Check for direct image extensions or firebase storage
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const isDirectLink = validExtensions.some(ext => url.toLowerCase().split('?')[0].endsWith(ext));
    const isFirebase = url.includes('firebasestorage.googleapis.com');
    
    return isDirectLink || isFirebase;
  };

  const handleAddProduct = async () => {
    if (!db) return;
    
    // Validation
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Price, Image).",
      });
      return;
    }

    if (!validateImageUrl(newProduct.image)) {
      toast({
        variant: "destructive",
        title: "Invalid Image URL",
        description: "Please enter a valid direct product image URL (e.g., ends in .jpg, .png). Ad links are not allowed.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price) || 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isNew: true
      };

      await addDoc(collection(db, 'products'), productData);
      
      setIsAddProductOpen(false);
      toast({
        title: "Product Added",
        description: `${newProduct.name} has been added successfully to your royal collection.`,
      });
      
      // Reset form
      setNewProduct({
        name: '',
        category: 'Rajputi Poshak',
        price: '',
        fabric: '',
        description: '',
        image: '',
        stockStatus: 'In Stock'
      });
    } catch (error: any) {
      console.error("Firestore Error:", error);
      let errorMessage = "Could not save product. Please verify product details.";
      
      if (error.code === 'permission-denied') {
        errorMessage = "Database permission issue. Please contact support.";
      } else if (error.message.includes('network')) {
        errorMessage = "Check your internet connection and try again.";
      }

      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { title: "Monthly Revenue", value: "₹4,85,200", trend: "+12%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { title: "Pending Orders", value: "24", trend: "5 New", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Stitch Requests", value: "18", trend: "Active", icon: Scissors, color: "text-[#E91E63]", bg: "bg-pink-50" },
    { title: "Royal Members", value: "1,450", trend: "+80", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'stitching', label: 'Stitching', icon: Scissors },
    { id: 'marketing', label: 'Marketing', icon: TicketPercent },
    { id: 'support', label: 'Support', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const recentOrders = [
    { id: "ORD-9921", customer: "Rajkumari Devi", amount: "₹24,999", status: "Stitching", date: "5 mins ago", items: 2 },
    { id: "ORD-9920", customer: "Anjali Singh", amount: "₹4,499", status: "Shipped", date: "1 hour ago", items: 1 },
    { id: "ORD-9919", customer: "Padma Rathore", amount: "₹18,500", status: "Confirmed", date: "3 hours ago", items: 3 },
    { id: "ORD-9918", customer: "Kaveri Kanwar", amount: "₹1,999", status: "Delivered", date: "Yesterday", items: 1 },
  ];

  const isFormValid = newProduct.name && newProduct.price && validateImageUrl(newProduct.image);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBFB]">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Admin Sidebar */}
        <aside className="w-72 bg-white border-r hidden lg:flex flex-col p-6 space-y-2">
          <div className="pb-6 border-b mb-6">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest px-4 mb-2">Management</h2>
            <div className="flex items-center gap-3 px-4 py-2 bg-accent/5 rounded-2xl border border-accent/10">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">A</div>
              <div>
                <p className="text-sm font-bold text-accent">Boutique Admin</p>
                <p className="text-[10px] text-muted-foreground">Jasol Maa Control</p>
              </div>
            </div>
          </div>
          
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex items-center gap-4 px-4 h-12 rounded-2xl text-sm font-bold transition-all ${
                activeView === item.id 
                ? 'bg-accent text-white shadow-lg royal-shadow' 
                : 'text-muted-foreground hover:bg-muted hover:text-accent'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          {activeView === 'dashboard' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-4xl font-headline font-bold text-accent">Royal Analytics</h1>
                  <p className="text-muted-foreground italic">Overview of your boutique's performance</p>
                </div>
                <div className="flex gap-4">
                  <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-accent rounded-full h-11 px-6 gap-2">
                        <Plus className="h-5 w-5" /> Add Collection
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] rounded-[2rem] border-none shadow-2xl overflow-y-auto max-h-[90vh]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-headline text-accent">Add New Royal Item</DialogTitle>
                        <DialogDescription>Enter the details and upload a photo for your new boutique masterpiece.</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Product Name *</Label>
                            <Input 
                              id="name" 
                              placeholder="e.g. Maharani Poshak" 
                              value={newProduct.name}
                              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                              className="rounded-xl"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="price">Price (₹) *</Label>
                              <Input 
                                id="price" 
                                type="number" 
                                placeholder="0" 
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                className="rounded-xl"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="category">Category</Label>
                              <Select 
                                defaultValue={newProduct.category}
                                onValueChange={(val) => setNewProduct({...newProduct, category: val})}
                              >
                                <SelectTrigger className="rounded-xl">
                                  <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Rajputi Poshak">Rajputi Poshak</SelectItem>
                                  <SelectItem value="Bridal Wear">Bridal Wear</SelectItem>
                                  <SelectItem value="Lehenga">Lehenga</SelectItem>
                                  <SelectItem value="Jewellery">Jewellery</SelectItem>
                                  <SelectItem value="Dupatta">Dupatta</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="fabric">Fabric Type</Label>
                            <Input 
                              id="fabric" 
                              placeholder="e.g. Pure Satin" 
                              value={newProduct.fabric}
                              onChange={(e) => setNewProduct({...newProduct, fabric: e.target.value})}
                              className="rounded-xl"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="image">Image URL *</Label>
                            <div className="relative">
                              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input 
                                id="image" 
                                placeholder="https://example.com/photo.jpg" 
                                value={newProduct.image}
                                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                                className={`pl-10 rounded-xl ${newProduct.image && !validateImageUrl(newProduct.image) ? 'border-destructive' : ''}`}
                              />
                            </div>
                            {newProduct.image && !validateImageUrl(newProduct.image) && (
                              <p className="text-[10px] text-destructive font-bold">Error: Ad links are blocked. Please provide a direct image link.</p>
                            )}
                            <p className="text-[10px] text-muted-foreground italic">Paste a direct .jpg, .png, or .webp link.</p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label>Photo Preview</Label>
                            <div className="aspect-[3/4] rounded-2xl border-2 border-dashed border-muted flex items-center justify-center overflow-hidden bg-muted/5 group relative">
                              {newProduct.image && validateImageUrl(newProduct.image) ? (
                                <img 
                                  src={newProduct.image} 
                                  alt="Preview" 
                                  className="w-full h-full object-cover animate-in fade-in zoom-in-95" 
                                  onError={() => {
                                    toast({
                                      variant: "destructive",
                                      title: "Image Error",
                                      description: "The provided URL could not be loaded as an image.",
                                    });
                                  }}
                                />
                              ) : (
                                <div className="text-center p-6">
                                  <ImageIcon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
                                  <p className="text-xs text-muted-foreground">No valid image preview</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description">Product Description</Label>
                            <Textarea 
                              id="description" 
                              placeholder="Describe the royal craftsmanship..." 
                              value={newProduct.description}
                              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                              className="rounded-xl min-h-[80px]"
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter className="pt-4 border-t">
                        <Button 
                          onClick={handleAddProduct} 
                          disabled={!isFormValid || isSubmitting}
                          className="w-full bg-[#E91E63] hover:bg-[#C2185B] rounded-full h-12 text-lg shadow-lg"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Adding to Vault...
                            </>
                          ) : (
                            'Save to Collection'
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </header>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {stats.map((stat, idx) => (
                  <Card key={idx} className="border-none shadow-xl rounded-[2.5rem] overflow-hidden group hover:scale-105 transition-transform duration-500">
                    <CardContent className="p-8 flex items-center gap-6">
                      <div className={`p-5 rounded-3xl ${stat.bg} ${stat.color} transition-colors group-hover:bg-accent group-hover:text-white`}>
                        <stat.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.title}</p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-headline font-extrabold text-accent">{stat.value}</p>
                          <span className="text-[10px] font-bold text-green-600">{stat.trend}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* Recent Orders Table */}
                <Card className="xl:col-span-2 border-none shadow-2xl rounded-[3rem] overflow-hidden">
                  <div className="flex flex-row items-center justify-between p-10 border-b bg-white">
                    <h2 className="text-2xl font-headline text-accent font-bold">Latest Royal Orders</h2>
                    <div className="relative w-72 hidden sm:block">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Track order..." className="pl-12 rounded-full h-12 bg-muted/30 border-none" />
                    </div>
                  </div>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent border-none">
                          <TableHead className="px-10 h-16 font-bold uppercase text-xs">Order ID</TableHead>
                          <TableHead className="font-bold uppercase text-xs">Customer</TableHead>
                          <TableHead className="font-bold uppercase text-xs">Total</TableHead>
                          <TableHead className="font-bold uppercase text-xs">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order) => (
                          <TableRow key={order.id} className="hover:bg-muted/30 transition-colors border-none">
                            <TableCell className="px-10 py-6 font-bold text-accent">{order.id}</TableCell>
                            <TableCell className="font-medium">{order.customer}</TableCell>
                            <TableCell className="font-bold text-accent">{order.amount}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`rounded-full px-4 py-1.5 border-none font-bold text-[10px] ${
                                order.status === 'Stitching' ? 'bg-pink-100 text-[#E91E63]' :
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-600' :
                                'bg-green-100 text-green-600'
                              }`}>
                                {order.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Performance Widget */}
                <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden">
                  <div className="p-10 pb-0">
                    <h2 className="text-2xl font-headline text-accent flex items-center gap-3 font-bold">
                      <BarChart3 className="h-6 w-6 text-[#D4AF37]" /> Revenue
                    </h2>
                  </div>
                  <CardContent className="p-10">
                    <div className="h-64 bg-muted/10 rounded-[2rem] flex items-end justify-between p-8 gap-3">
                      {[40, 65, 45, 100, 75, 85, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-[#E91E63]/20 rounded-2xl relative overflow-hidden">
                          <div className="bg-[#E91E63] w-full absolute bottom-0" style={{ height: `${h}%` }} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeView === 'products' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <header className="flex justify-between items-center">
                <h1 className="text-4xl font-headline font-bold text-accent">Inventory Catalog</h1>
                <Button 
                  onClick={() => setIsAddProductOpen(true)}
                  className="bg-[#E91E63] rounded-full px-8 h-12 text-lg"
                >
                  Add New Design
                </Button>
              </header>
              <Card className="border-none shadow-2xl rounded-[3rem]">
                <CardContent className="p-0">
                  <div className="p-8 flex justify-between gap-6 border-b">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Filter collection..." className="pl-12 rounded-2xl h-12 border-muted" />
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="h-16 px-8">
                        <TableHead className="px-10 font-bold uppercase text-xs">Image</TableHead>
                        <TableHead className="font-bold uppercase text-xs">Name</TableHead>
                        <TableHead className="font-bold uppercase text-xs">Category</TableHead>
                        <TableHead className="font-bold uppercase text-xs">Price</TableHead>
                        <TableHead className="font-bold uppercase text-xs">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productsLoading ? (
                        <TableRow><TableCell colSpan={5} className="h-32 text-center text-muted-foreground italic">Loading your masterpieces...</TableCell></TableRow>
                      ) : products?.map((product: any) => (
                        <TableRow key={product.id} className="h-24 hover:bg-muted/20">
                          <TableCell className="px-10">
                            <div className="w-14 h-14 rounded-xl overflow-hidden border bg-muted flex items-center justify-center">
                              {product.image ? (
                                <img src={product.image} className="w-full h-full object-cover" alt="" />
                              ) : (
                                <ImageIcon className="h-6 w-6 text-muted-foreground/30" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-bold text-accent">{product.name}</TableCell>
                          <TableCell><Badge variant="secondary" className="bg-muted text-accent border-none">{product.category}</Badge></TableCell>
                          <TableCell className="font-bold">₹{product.price?.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-700 border-none font-bold uppercase text-[10px]">
                              {product.stockStatus || 'In Stock'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === 'stitching' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <header className="flex justify-between items-center">
                <h1 className="text-4xl font-headline font-bold text-accent">Tailoring Requests</h1>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="border-none shadow-xl rounded-[2.5rem] overflow-hidden">
                    <div className="bg-accent p-6 flex justify-between items-center text-white">
                      <div className="flex items-center gap-3">
                        <Scissors className="h-5 w-5 text-[#D4AF37]" />
                        <span className="font-headline font-bold">REQ-882{i}</span>
                      </div>
                      <Badge className="bg-white/10 text-white border-none uppercase text-[10px]">New Request</Badge>
                    </div>
                    <CardContent className="p-8">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Customer</p>
                          <p className="text-lg font-bold text-accent">Maharani Devi</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Style</p>
                          <p className="text-sm font-medium">Zardosi Bridal</p>
                        </div>
                      </div>
                      <Button className="w-full bg-[#E91E63] hover:bg-[#C2185B] rounded-2xl h-12">Process Measurement</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}