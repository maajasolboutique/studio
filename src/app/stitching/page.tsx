"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Camera, 
  Scissors, 
  Ruler, 
  CheckCircle2, 
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CustomStitchingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
      toast({
        title: "Request Received",
        description: "Your custom stitching request has been sent to our royal tailors.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBFB]">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-headline font-bold text-accent">Custom Rajputi Stitching</h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic">
            Experience the luxury of garments tailored exclusively for you by our master craftsmen.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-16 px-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 border-2 ${
                step >= s ? 'bg-[#E91E63] border-[#E91E63] text-white shadow-xl scale-110' : 'bg-white border-muted text-muted-foreground'
              }`}>
                {step > s ? <CheckCircle2 className="h-7 w-7" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-24 h-1.5 mx-4 rounded-full transition-all duration-500 ${
                  step > s ? 'bg-[#E91E63]' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
              <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden">
                <div className="bg-[#6D1B1B] p-8 text-white flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl">
                    <Sparkles className="h-8 w-8 text-[#D4AF37]" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-headline">Design & Style</CardTitle>
                    <CardDescription className="text-white/60">Choose your preferences for the master tailor</CardDescription>
                  </div>
                </div>
                <CardContent className="p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-accent font-bold">Stitching Type</Label>
                      <Select defaultValue="poshak">
                        <SelectTrigger className="h-12 rounded-xl border-muted bg-muted/20">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="poshak">Complete Rajputi Poshak</SelectItem>
                          <SelectItem value="lehenga">Heavy Lehenga Set</SelectItem>
                          <SelectItem value="blouse">Designer Blouse Only</SelectItem>
                          <SelectItem value="suit">Cotton Rajputi Suit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-accent font-bold">Embroidery Style</Label>
                      <Select defaultValue="zardosi">
                        <SelectTrigger className="h-12 rounded-xl border-muted bg-muted/20">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="zardosi">Hand Zardosi</SelectItem>
                          <SelectItem value="gotapatti">Traditional Gota Patti</SelectItem>
                          <SelectItem value="kundan">Kundan & Stone</SelectItem>
                          <SelectItem value="thread">Silk Thread Work</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-accent font-bold">Urgency Level</Label>
                      <Select defaultValue="standard">
                        <SelectTrigger className="h-12 rounded-xl border-muted bg-muted/20">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard (15-20 Days)</SelectItem>
                          <SelectItem value="express">Express (7-10 Days) + ₹500</SelectItem>
                          <SelectItem value="super">Super Express (3-5 Days) + ₹1500</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-accent font-bold">Fabric Lining</Label>
                      <Select defaultValue="cotton">
                        <SelectTrigger className="h-12 rounded-xl border-muted bg-muted/20">
                          <SelectValue placeholder="Select lining" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cotton">Soft Cotton (Standard)</SelectItem>
                          <SelectItem value="satin">Premium Satin</SelectItem>
                          <SelectItem value="shantoon">Heavy Shantoon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-accent font-bold">Upload Reference Image (Optional)</Label>
                    <div className="border-2 border-dashed border-muted rounded-3xl p-12 text-center hover:border-[#E91E63] transition-colors cursor-pointer bg-muted/5 group">
                      <div className="bg-[#E91E63]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Camera className="h-10 w-10 text-[#E91E63]" />
                      </div>
                      <p className="text-accent font-bold text-lg">Click or drag your design here</p>
                      <p className="text-muted-foreground text-sm mt-2">JPG, PNG or PDF (Max 5MB)</p>
                    </div>
                  </div>

                  <Button type="button" onClick={handleNext} className="w-full h-14 bg-[#E91E63] hover:bg-[#C2185B] text-xl rounded-full shadow-lg">
                    Continue to Measurements <Scissors className="ml-2 h-6 w-6" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
              <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden">
                <div className="bg-[#6D1B1B] p-8 text-white flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl">
                    <Ruler className="h-8 w-8 text-[#D4AF37]" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-headline">Body Measurements</CardTitle>
                    <CardDescription className="text-white/60">Precise measurements for a perfect royal fit (in inches)</CardDescription>
                  </div>
                </div>
                <CardContent className="p-10 space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {[
                      { label: 'Bust', id: 'bust' },
                      { label: 'Waist', id: 'waist' },
                      { label: 'Hip', id: 'hip' },
                      { label: 'Height', id: 'height' },
                      { label: 'Sleeve Length', id: 'sleeve' },
                      { label: 'Shoulder', id: 'shoulder' },
                    ].map((m) => (
                      <div key={m.id} className="space-y-3">
                        <Label className="text-accent font-bold" htmlFor={m.id}>{m.label}</Label>
                        <Input id={m.id} type="number" placeholder="0.0" className="h-12 rounded-xl border-muted bg-muted/20" />
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#D4AF37]/10 p-6 rounded-2xl border border-[#D4AF37]/30 flex gap-4">
                    <Info className="h-6 w-6 text-[#D4AF37] shrink-0" />
                    <p className="text-sm text-accent italic">
                      Tip: Measure with the footwear you intend to wear with the poshak for correct height.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-accent font-bold">Special Notes or Requirements</Label>
                    <Textarea 
                      placeholder="E.g., extra long sleeves, high neck design, specific embroidery placement..." 
                      className="min-h-[120px] rounded-2xl border-muted bg-muted/20"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={handlePrev} className="flex-1 h-14 text-lg rounded-full border-muted">
                      Back
                    </Button>
                    <Button type="button" onClick={handleNext} className="flex-[2] h-14 bg-[#E91E63] hover:bg-[#C2185B] text-xl rounded-full shadow-lg">
                      Review Order <CheckCircle2 className="ml-2 h-6 w-6" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
              <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden">
                <div className="bg-[#6D1B1B] p-8 text-white flex items-center gap-4">
                  <CardTitle className="text-2xl font-headline">Review Your Request</CardTitle>
                </div>
                <CardContent className="p-10 space-y-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <span className="text-muted-foreground font-medium">Base Stitching Fee</span>
                      <span className="text-xl font-bold text-accent">₹2,499</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b">
                      <span className="text-muted-foreground font-medium">Embroidery Surcharge (Hand Zardosi)</span>
                      <span className="text-xl font-bold text-accent">₹1,500</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b">
                      <span className="text-muted-foreground font-medium">Estimated Completion Time</span>
                      <span className="text-xl font-bold text-[#E91E63] flex items-center gap-2">
                        <Clock className="h-5 w-5" /> 15-20 Days
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <span className="text-2xl font-headline font-bold text-accent">Total Estimated Cost</span>
                      <span className="text-3xl font-headline font-bold text-[#E91E63]">₹3,999</span>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button type="button" variant="outline" onClick={handlePrev} className="flex-1 h-14 text-lg rounded-full border-muted">
                      Edit Details
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex-[2] h-14 bg-[#E91E63] hover:bg-[#C2185B] text-xl rounded-full shadow-lg"
                    >
                      {isSubmitting ? "Submitting..." : "Confirm & Send Request"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-8 animate-in zoom-in duration-500 py-12">
              <div className="w-32 h-32 gold-gradient rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle2 className="h-20 w-20 text-accent" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-headline font-bold text-accent">Request Submitted Successfully!</h2>
                <p className="text-xl text-muted-foreground max-w-lg mx-auto italic">
                  Thank you! Our master tailor will review your details and contact you within 24 hours to confirm the design.
                </p>
              </div>
              <div className="p-6 bg-[#6D1B1B]/5 rounded-3xl border border-[#6D1B1B]/10 inline-block">
                <p className="text-accent font-bold">Request Reference: #JM-ST-8829</p>
              </div>
              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#E91E63] rounded-full px-12 h-14 text-lg">
                  <Link href="/">Return to Home</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-12 h-14 text-lg border-muted">
                  View My Requests
                </Button>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
