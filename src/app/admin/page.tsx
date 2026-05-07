"use client";

import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Scissors, 
  Package, 
  Bell,
  BarChart3,
  Search,
  Plus
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

export default function AdminDashboard() {
  const stats = [
    { title: "Total Revenue", value: "₹2,45,000", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { title: "Active Orders", value: "12", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Stitch Requests", value: "8", icon: Scissors, color: "text-[#E91E63]", bg: "bg-pink-50" },
    { title: "Total Customers", value: "1,240", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const recentOrders = [
    { id: "ORD-1234", customer: "Priyanka Singh", amount: "₹14,999", status: "Stitching", date: "2 mins ago" },
    { id: "ORD-1235", customer: "Anjali Rathore", amount: "₹4,499", status: "Shipped", date: "1 hour ago" },
    { id: "ORD-1236", customer: "Sneha Kanwar", amount: "₹24,999", status: "Confirmed", date: "3 hours ago" },
    { id: "ORD-1237", customer: "Meera Bhati", amount: "₹1,999", status: "Delivered", date: "Yesterday" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-bold text-accent">Admin Dashboard</h1>
            <p className="text-muted-foreground italic">Welcome back to Jasol Maa Boutique Management</p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-accent rounded-full px-6 gap-2">
              <Plus className="h-5 w-5" /> Add Product
            </Button>
            <Button variant="outline" className="rounded-full border-accent text-accent">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, idx) => (
            <Card key={idx} className="border-none shadow-lg rounded-[2rem] overflow-hidden">
              <CardContent className="p-8 flex items-center gap-6">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.title}</p>
                  <p className="text-3xl font-headline font-extrabold text-accent">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Orders Table */}
          <Card className="lg:col-span-2 border-none shadow-xl rounded-[2rem]">
            <CardHeader className="flex flex-row items-center justify-between p-8 border-b">
              <CardTitle className="text-2xl font-headline text-accent">Recent Royal Orders</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-10 rounded-full h-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="px-8 font-bold">Order ID</TableHead>
                    <TableHead className="font-bold">Customer</TableHead>
                    <TableHead className="font-bold">Amount</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="text-right px-8 font-bold">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="px-8 font-medium text-accent">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell className="font-bold text-accent">{order.amount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`rounded-full px-3 py-1 border-none font-bold ${
                          order.status === 'Stitching' ? 'bg-pink-100 text-[#E91E63]' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-600' :
                          order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8 text-muted-foreground italic text-sm">{order.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="p-8 border-t text-center">
                <Button variant="link" className="text-accent font-bold">View All Orders</Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Notifications */}
          <div className="space-y-8">
            <Card className="border-none shadow-xl rounded-[2rem]">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-2xl font-headline text-accent flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-[#D4AF37]" /> Sales Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="h-48 bg-muted/20 rounded-3xl flex items-end justify-between p-6 gap-2">
                  {[40, 60, 45, 90, 75, 85, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-[#E91E63]/20 rounded-t-lg relative group">
                      <div 
                        className="bg-[#E91E63] w-full rounded-t-lg transition-all duration-1000 group-hover:bg-[#D4AF37]" 
                        style={{ height: `${h}%` }} 
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-center font-bold text-muted-foreground uppercase tracking-widest">Weekly Revenue Growth</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl rounded-[2rem]">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-2xl font-headline text-accent">Quick Tasks</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                <Button variant="outline" className="w-full justify-start gap-4 h-14 rounded-2xl border-muted hover:border-accent">
                  <Package className="h-5 w-5 text-accent" /> Manage Inventory
                </Button>
                <Button variant="outline" className="w-full justify-start gap-4 h-14 rounded-2xl border-muted hover:border-accent">
                  <Bell className="h-5 w-5 text-[#E91E63]" /> Send Push Notification
                </Button>
                <Button variant="outline" className="w-full justify-start gap-4 h-14 rounded-2xl border-muted hover:border-accent">
                  <BarChart3 className="h-5 w-5 text-green-600" /> Generate Sales Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
