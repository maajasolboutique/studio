
"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { useCart } from '@/app/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, ChevronRight, CreditCard, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Generate order ID on client side to avoid hydration mismatch
  useEffect(() => {
    setOrderId(`JM-${Math.floor(Math.random() * 90000) + 10000}`);
  }, []);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      nextStep();
    }, 2000);
  };

  if (items.length === 0 && step < 3) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Steps Progress */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                step >= s ? 'bg-[#E91E63] text-white' : 'bg-white text-muted-foreground border'
              }`}>
                {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-20 h-1 mx-2 transition-colors ${
                  step > s ? 'bg-[#E91E63]' : 'bg-muted border'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {step === 1 && (
              <div className="bg-white p-8 rounded-2xl border shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
                  <Truck className="h-6 w-6 text-[#E91E63]" /> Shipping Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Street Address</Label>
                  <Input placeholder="123 Digital Ave" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input placeholder="Tech City" />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input placeholder="Silicon" />
                  </div>
                  <div className="space-y-2">
                    <Label>ZIP Code</Label>
                    <Input placeholder="94103" />
                  </div>
                </div>
                <Button onClick={nextStep} className="w-full h-12 text-lg bg-[#E91E63] hover:bg-[#C2185B]">
                  Continue to Payment <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white p-8 rounded-2xl border shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-[#E91E63]" /> Payment Method
                </h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-xl bg-muted/20 border-[#E91E63]">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold">Credit / Debit Card</span>
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Card Number</Label>
                        <Input placeholder="•••• •••• •••• ••••" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Expiry Date</Label>
                          <Input placeholder="MM / YY" />
                        </div>
                        <div className="space-y-2">
                          <Label>CVV</Label>
                          <Input placeholder="•••" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={prevStep} className="flex-1 h-12">
                    Back
                  </Button>
                  <Button onClick={handlePlaceOrder} disabled={isProcessing} className="flex-2 h-12 bg-[#D4AF37] hover:bg-[#B8962D] text-white">
                    {isProcessing ? "Processing..." : `Pay ₹${totalPrice.toLocaleString()}`}
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white p-12 rounded-2xl border shadow-sm text-center space-y-6 animate-in zoom-in-95">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h2 className="text-3xl font-headline font-bold text-[#E91E63]">Order Confirmed!</h2>
                <p className="text-muted-foreground text-lg">
                  Thank you for shopping with Jasol Maa Boutique. We've received your order and we're getting it ready for shipment.
                </p>
                <div className="p-4 bg-muted/30 rounded-lg inline-block">
                  <p className="font-medium">Order Number: #{orderId}</p>
                </div>
                <div className="pt-8">
                  <Button asChild className="h-12 px-8 bg-[#E91E63] hover:bg-[#C2185B]">
                    <Link href="/">Return to Home</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          {step < 3 && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <h3 className="font-headline font-bold mb-6 text-accent">Order Summary</h3>
                <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 text-sm">
                      <div className="h-12 w-12 rounded border bg-muted flex-shrink-0">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium line-clamp-1">{item.name}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-4 border-t text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between pt-4 text-lg font-bold text-accent">
                    <span>Total</span>
                    <span className="text-[#E91E63]">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#6D1B1B]/5 p-4 rounded-xl border border-[#6D1B1B]/10 flex gap-3">
                <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
                <p className="text-xs text-accent-foreground">
                  Your transaction is secure and encrypted. We never store your full card details.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
