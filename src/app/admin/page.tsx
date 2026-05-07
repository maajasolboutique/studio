"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Scissors, 
  Package, 
  Bell,
  BarChart3,
  Search,
  Plus,
  LayoutDashboard,
  Settings,
  TicketPercent,
  MessageSquare,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  Clock
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const db = useFirestore();

  // Queries for real data (mocking the collection paths for now as per schema)
  const productsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(10));
  }, [db]);

  const { data: products, isLoading: productsLoading } = useCollection(productsQuery);

  const stats = [
    { title: "Monthly Revenue", value: "₹4,85,200", trend: "+12%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { title: "Pending Orders", value: "24", trend: "5 New", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Stitch Requests", value: "18", trend: "Active", icon: Scissors, color: "text-[#E91E63]", bg: "bg-pink-50" },
    { title: "Royal Members", value: "1,450", trend: "+80", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const recentOrders = [
    { id: "ORD-9921", customer: "Rajkumari Devi", amount: "₹24,999", status: "Stitching", date: "5 mins ago", items: 2 },
    { id: "ORD-9920", customer: "Anjali Singh", amount: "₹4,499", status: "Shipped", date: "1 hour ago", items: 1 },
    { id: "ORD-9919", customer: "Padma Rathore", amount: "₹18,500", status: "Confirmed", date: "3 hours ago", items: 3 },
    { id: "ORD-9918", customer: "Kaveri Kanwar", amount: "₹1,999", status: "Delivered", date: "Yesterday", items: 1 },
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

          <div className="mt-auto pt-6 border-t">
            <Button variant="ghost" className="w-full justify-start gap-4 text-destructive hover:bg-destructive/5 rounded-2xl h-12">
              <ChevronRight className="h-4 w-4 rotate-180" /> Logout
            </Button>
          </div>
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
                  <Button variant="outline" className="rounded-full border-accent text-accent h-11 px-6">
                    Download Report
                  </Button>
                  <Button className="bg-accent rounded-full h-11 px-6 gap-2">
                    <Plus className="h-5 w-5" /> Add Product
                  </Button>
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
                  <CardHeader className="flex flex-row items-center justify-between p-10 border-b bg-white">
                    <CardTitle className="text-2xl font-headline text-accent">Latest Royal Orders</CardTitle>
                    <div className="relative w-72 hidden sm:block">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Track specific order..." className="pl-12 rounded-full h-12 bg-muted/30 border-none" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent border-none">
                          <TableHead className="px-10 h-16 font-bold uppercase text-xs">Order Details</TableHead>
                          <TableHead className="font-bold uppercase text-xs">Customer</TableHead>
                          <TableHead className="font-bold uppercase text-xs">Total</TableHead>
                          <TableHead className="font-bold uppercase text-xs">Status</TableHead>
                          <TableHead className="text-right px-10 h-16 font-bold uppercase text-xs">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order) => (
                          <TableRow key={order.id} className="hover:bg-muted/30 transition-colors border-none">
                            <TableCell className="px-10 py-6">
                              <div className="flex flex-col">
                                <span className="font-bold text-accent">{order.id}</span>
                                <span className="text-[10px] text-muted-foreground">{order.date} • {order.items} items</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{order.customer}</TableCell>
                            <TableCell className="font-bold text-accent">{order.amount}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`rounded-full px-4 py-1.5 border-none font-bold text-[10px] ${
                                order.status === 'Stitching' ? 'bg-pink-100 text-[#E91E63]' :
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-600' :
                                order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                              }`}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right px-10">
                              <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/10">
                                <MoreVertical className="h-5 w-5 text-muted-foreground" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="p-10 border-t text-center">
                      <Button variant="link" className="text-accent font-bold h-auto p-0 hover:underline">View Entire Order History</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Right Column Widgets */}
                <div className="space-y-12">
                  <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden">
                    <CardHeader className="p-10 pb-0">
                      <CardTitle className="text-2xl font-headline text-accent flex items-center gap-3">
                        <BarChart3 className="h-6 w-6 text-[#D4AF37]" /> Revenue Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-10">
                      <div className="h-64 bg-muted/10 rounded-[2rem] flex items-end justify-between p-8 gap-3">
                        {[40, 65, 45, 100, 75, 85, 95].map((h, i) => (
                          <div key={i} className="flex-1 bg-[#E91E63]/10 rounded-2xl relative group cursor-pointer overflow-hidden">
                            <div 
                              className="bg-[#E91E63] w-full rounded-t-xl transition-all duration-1000 absolute bottom-0 group-hover:bg-[#D4AF37]" 
                              style={{ height: `${h}%` }} 
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-accent/20">
                              <span className="text-[10px] font-bold text-white">₹{h}k</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="mt-6 text-[10px] text-center font-bold text-muted-foreground uppercase tracking-[0.2em]">Weekly Performance Index</p>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden">
                    <CardHeader className="p-10 pb-0">
                      <CardTitle className="text-2xl font-headline text-accent">Active Alerts</CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 space-y-6">
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-pink-50 text-[#E91E63]">
                        <div className="p-2 bg-white rounded-xl shadow-sm"><Clock className="h-5 w-5" /></div>
                        <div>
                          <p className="text-xs font-bold">5 Stitching Requests Pending</p>
                          <p className="text-[10px] opacity-70 italic">Requires measurement approval</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50 text-orange-600">
                        <div className="p-2 bg-white rounded-xl shadow-sm"><Package className="h-5 w-5" /></div>
                        <div>
                          <p className="text-xs font-bold">Low Stock: Red Bridal Poshak</p>
                          <p className="text-[10px] opacity-70 italic">Only 2 units remaining</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeView === 'products' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <header className="flex justify-between items-center">
                <h1 className="text-4xl font-headline font-bold text-accent">Inventory Catalog</h1>
                <Button className="bg-[#E91E63] rounded-full px-8 h-12 text-lg">Add New Design</Button>
              </header>
              <Card className="border-none shadow-2xl rounded-[3rem]">
                <CardContent className="p-0">
                  <div className="p-8 flex justify-between gap-6 border-b">
                     <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Filter by product name, SKU or fabric..." className="pl-12 rounded-2xl h-12 border-muted" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-48 h-12 rounded-2xl">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="poshak">Rajputi Poshak</SelectItem>
                        <SelectItem value="bridal">Bridal Wear</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="h-16 px-8">
                        <TableHead className="px-10 font-bold uppercase text-xs">Product Image</TableHead>
                        <TableHead className="font-bold uppercase text-xs">Name</TableHead>
                        <TableHead className="font-bold uppercase text-xs">Category</TableHead>
                        <TableHead className="font-bold uppercase text-xs">Price</TableHead>
                        <TableHead className="font-bold uppercase text-xs">Stock</TableHead>
                        <TableHead className="text-right px-10 font-bold uppercase text-xs">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productsLoading ? (
                        <TableRow><TableCell colSpan={6} className="h-32 text-center text-muted-foreground italic">Fetching heritage collection...</TableCell></TableRow>
                      ) : products?.map((product: any) => (
                        <TableRow key={product.id} className="h-20 hover:bg-muted/20">
                          <TableCell className="px-10">
                            <div className="w-12 h-16 rounded-lg overflow-hidden border">
                              <img src={product.image} className="w-full h-full object-cover" alt="" />
                            </div>
                          </TableCell>
                          <TableCell className="font-bold text-accent">{product.name}</TableCell>
                          <TableCell><Badge variant="secondary" className="bg-muted text-accent border-none">{product.category}</Badge></TableCell>
                          <TableCell className="font-bold">₹{product.price.toLocaleString()}</TableCell>
                          <TableCell>
                            <span className={`text-xs font-bold ${product.stockStatus === 'In Stock' ? 'text-green-600' : 'text-orange-600'}`}>
                              {product.stockStatus}
                            </span>
                          </TableCell>
                          <TableCell className="text-right px-10">
                            <Button variant="ghost" size="sm" className="font-bold text-accent">Edit</Button>
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
                <h1 className="text-4xl font-headline font-bold text-accent">Tailoring Management</h1>
                <Badge className="bg-[#E91E63] h-8 px-4 text-xs">8 New Requests</Badge>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <Card key={i} className="border-none shadow-xl rounded-[2.5rem] overflow-hidden group">
                    <div className="bg-accent p-6 flex justify-between items-center text-white">
                      <div className="flex items-center gap-3">
                        <Scissors className="h-5 w-5 text-[#D4AF37]" />
                        <span className="font-headline font-bold">REQ-882{i}</span>
                      </div>
                      <Badge className="bg-white/10 text-white border-none uppercase text-[10px]">Pending Approval</Badge>
                    </div>
                    <CardContent className="p-8 space-y-6">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Customer</p>
                          <p className="text-lg font-bold text-accent">Maharani Singh</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Style</p>
                          <p className="text-sm font-medium">Heavy Zardosi Poshak</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                        <div className="text-center">
                          <p className="text-[10px] text-muted-foreground font-bold">Bust</p>
                          <p className="text-lg font-headline font-bold">36"</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-muted-foreground font-bold">Waist</p>
                          <p className="text-lg font-headline font-bold">28"</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-muted-foreground font-bold">Height</p>
                          <p className="text-lg font-headline font-bold">5'6"</p>
                        </div>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <Button className="flex-1 bg-green-600 hover:bg-green-700 rounded-2xl h-12">Approve Measurements</Button>
                        <Button variant="outline" className="flex-1 rounded-2xl h-12 border-muted text-accent">View Design</Button>
                      </div>
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