import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SDGs, Goal } from "@/lib/goals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Share2, 
  Twitter, 
  Linkedin, 
  Instagram,
  Copy,
  Wallet,
  Utensils,
  Heart,
  GraduationCap,
  Users,
  Droplets,
  Zap,
  Briefcase,
  Factory,
  Equal,
  Building2,
  Recycle,
  ThermometerSun,
  Fish,
  TreePine,
  Shield,
  Handshake,
  Globe
} from "lucide-react";
import { Certificate } from "@/components/ui/certificate-card";
import { toPng } from "html-to-image";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  goalId: z.string().min(1, "Please select a goal"),
  story: z.string().optional(),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  photo: z.any().optional(), // We'll handle file validation manually or refine this
});

// Icon mapping for SDGs
const GoalIcons: Record<number, React.ElementType> = {
  1: Wallet,
  2: Utensils,
  3: Heart,
  4: GraduationCap,
  5: Users,
  6: Droplets,
  7: Zap,
  8: Briefcase,
  9: Factory,
  10: Equal,
  11: Building2,
  12: Recycle,
  13: ThermometerSun,
  14: Fish,
  15: TreePine,
  16: Shield,
  17: Handshake
};

export default function Pledge() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialGoalId = searchParams.get("goal") || "";
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      goalId: initialGoalId,
      story: "",
      city: "",
      country: "",
      photo: undefined,
    },
  });

  const selectedGoalId = form.watch("goalId");
  // Ensure we always have a goal if ID is present, otherwise fallback (handle missing ID gracefully)
  const selectedGoal = SDGs.find((g) => g.id.toString() === selectedGoalId);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      form.setValue("photo", file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In a real app, we'd send data to backend and get an ID.
    // For mockup, we'll generate a random ID and navigate to a "success" state or just show the certificate here.
    const pledgeId = Math.random().toString(36).substring(7);
    
    // Navigate to certificate page (or show inline)
    // Let's show inline for the mockup flow to feel complete without complexity
    setStep(4);
    setIsSubmitting(false);
  }

  const downloadCertificate = async () => {
    if (certificateRef.current) {
      try {
        // Small delay to ensure rendering
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const dataUrl = await toPng(certificateRef.current, { 
          cacheBust: true, 
          pixelRatio: 2,
          skipAutoScale: true,
          style: { transform: 'scale(1)' } // Ensure no transform issues
        });
        
        const link = document.createElement("a");
        link.download = `pledge-certificate-${selectedGoal?.id}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Failed to generate image", err);
        toast({
           title: "Download failed",
           description: "Could not generate certificate image. Please try again.",
           variant: "destructive"
        });
      }
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText("https://global-pledge.replit.app");
    toast({
      title: "Link Copied",
      description: "Share this link with your friends!",
    });
  };

  const sharePledge = (platform: string) => {
    const text = `I just pledged to support ${selectedGoal?.title} with the Global Pledge Initiative! Join me.`;
    const url = "https://global-pledge.replit.app";
    
    let shareUrl = "";
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing via URL, usually prompts to open app
        toast({
          title: "Open Instagram",
          description: "Post your certificate to your Story!",
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Take the Pledge</h1>
        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <span className={step >= 1 ? "text-primary font-bold" : ""}>1. Choose Goal</span>
          <ChevronRight className="w-4 h-4" />
          <span className={step >= 2 ? "text-primary font-bold" : ""}>2. Your Details</span>
          <ChevronRight className="w-4 h-4" />
          <span className={step >= 3 ? "text-primary font-bold" : ""}>3. Preview</span>
        </div>
        <div className="h-1 bg-slate-100 mt-4 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {step === 4 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="bg-green-50 text-green-700 px-6 py-4 rounded-lg mb-8 text-center w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">Pledge Verified!</h2>
            <p>You are now officially part of the movement. Share your commitment with the world.</p>
          </div>

          <div className="mb-8 w-full max-w-4xl flex justify-center shadow-2xl rounded-xl overflow-hidden">
             {selectedGoal && (
                <Certificate
                  ref={certificateRef}
                  name={form.getValues("fullName")}
                  goal={selectedGoal}
                  story={form.getValues("story")}
                  date={new Date().toLocaleDateString()}
                  pledgeId="OFFICIAL-VERIFIED-XXXX"
                  photoUrl={photoUrl}
                />
             )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
            <div className="space-y-4">
               <h3 className="font-bold text-lg">1. Save Your Certificate</h3>
               <Button onClick={downloadCertificate} size="lg" className="w-full">
                 Download High-Res PNG
               </Button>
            </div>

            <div className="space-y-4">
               <h3 className="font-bold text-lg">2. Share to Inspire Others</h3>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                 <Button variant="outline" onClick={() => sharePledge('twitter')} className="w-full">
                   <Twitter className="w-4 h-4 mr-2" /> X
                 </Button>
                 <Button variant="outline" onClick={() => sharePledge('linkedin')} className="w-full">
                   <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                 </Button>
                 <Button variant="outline" onClick={() => sharePledge('whatsapp')} className="w-full">
                   <Share2 className="w-4 h-4 mr-2" /> WhatsApp
                 </Button>
                 <Button variant="outline" onClick={() => sharePledge('instagram')} className="w-full">
                   <Instagram className="w-4 h-4 mr-2" /> Instagram
                 </Button>
                 <Button variant="outline" onClick={copyLink} className="w-full col-span-2 md:col-span-1">
                   <Copy className="w-4 h-4 mr-2" /> Copy Link
                 </Button>
               </div>
            </div>
          </div>
          
          <div className="mt-12">
            <Button variant="ghost" onClick={() => setLocation("/")}>
              Return Home
            </Button>
          </div>
        </motion.div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <FormField
                    control={form.control}
                    name="goalId"
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {SDGs.map((goal) => {
                            const Icon = GoalIcons[goal.id] || Globe;
                            return (
                              <div
                                key={goal.id}
                                onClick={() => {
                                  field.onChange(goal.id.toString());
                                  setStep(2);
                                }}
                                className={`cursor-pointer aspect-square rounded-xl p-4 flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                                  field.value === goal.id.toString() 
                                    ? "ring-4 ring-offset-2 ring-primary scale-105 shadow-xl" 
                                    : "shadow-sm opacity-90 hover:opacity-100"
                                }`}
                                style={{ backgroundColor: goal.color }}
                              >
                                <div className="flex justify-between items-start">
                                  <span className="text-white/90 font-bold text-2xl font-serif">{goal.id}</span>
                                  <Icon className="text-white/40 w-8 h-8" />
                                </div>
                                <span className="text-white font-bold text-sm leading-tight">{goal.title}</span>
                                {field.value === goal.id.toString() && (
                                  <div className="absolute top-2 right-2 bg-white rounded-full p-1 text-primary shadow-sm">
                                    <Check className="w-4 h-4" />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 max-w-lg mx-auto"
                >
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-32 h-32 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative group cursor-pointer hover:border-primary transition-colors">
                      {photoUrl ? (
                        <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-2">
                          <Upload className="w-8 h-8 mx-auto text-slate-400 mb-1" />
                          <span className="text-xs text-muted-foreground">Upload Photo</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={handlePhotoUpload}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Required for certificate</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name (for Certificate)</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="jane@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="relative z-50"> 
                    {/* Z-Index fix for Select dropdown overlapping subsequent fields */}
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-[200px]">
                              <SelectItem value="USA">United States</SelectItem>
                              <SelectItem value="UK">United Kingdom</SelectItem>
                              <SelectItem value="CA">Canada</SelectItem>
                              <SelectItem value="DE">Germany</SelectItem>
                              <SelectItem value="FR">France</SelectItem>
                              <SelectItem value="JP">Japan</SelectItem>
                              <SelectItem value="IN">India</SelectItem>
                              <SelectItem value="BR">Brazil</SelectItem>
                              <SelectItem value="AU">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="story"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Why is this goal important to you? (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="I believe that..." 
                            className="resize-none h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col items-center"
                >
                  <h3 className="text-xl font-bold mb-6">Preview Your Certificate</h3>
                  {selectedGoal ? (
                    <div className="scale-75 md:scale-100 origin-top mb-8 shadow-xl rounded-lg overflow-hidden">
                       <Certificate
                          name={form.getValues("fullName") || "Your Name"}
                          goal={selectedGoal}
                          story={form.getValues("story")}
                          date={new Date().toLocaleDateString()}
                          pledgeId="PREVIEW-MODE"
                          photoUrl={photoUrl}
                        />
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground bg-slate-50 rounded-lg">
                      <p>Please select a goal in Step 1 to preview your certificate.</p>
                      <Button variant="link" onClick={() => setStep(1)}>Go to Step 1</Button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between pt-8 border-t">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  <ChevronLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              ) : (
                <div></div>
              )}
              
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Generating..." 
                ) : step === 3 ? (
                  "Confirm Pledge" 
                ) : (
                  <>Next <ChevronRight className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
