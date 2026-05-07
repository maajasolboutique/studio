
"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl border shadow-xl">
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-3xl font-headline font-bold text-accent">Jasol Maa Rajputi Boutique</h1>
            <p className="text-muted-foreground">राजवाड़ी पहचान, शाही अंदाज़</p>
          </div>

          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 rounded-full p-1 bg-muted">
              <TabsTrigger value="login" className="rounded-full">Log In</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-10" type="email" placeholder="name@example.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Password</Label>
                    <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-10" type="password" placeholder="••••••••" required />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 bg-accent hover:bg-accent/90 rounded-xl" disabled={loading}>
                  {loading ? "Signing in..." : "Continue"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-10" placeholder="John Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-10" type="email" placeholder="name@example.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-10" type="password" placeholder="••••••••" required />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 bg-[#E91E63] hover:bg-[#C2185B] text-white rounded-xl" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
                <p className="text-xs text-center text-muted-foreground px-4">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-8 pt-6 border-t flex flex-col gap-3">
            <Button variant="outline" className="w-full h-12 gap-3 rounded-xl">
              <img src="https://www.google.com/favicon.ico" className="h-4 w-4" alt="Google" />
              Continue with Google
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
