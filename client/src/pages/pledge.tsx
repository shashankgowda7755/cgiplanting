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
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Upload,
  Download,
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
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  goalId: z.string().min(1, "Please select a goal"),
  story: z.string().optional(),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  photo: z.any().optional(),
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  // Auto-advance if goal is present in URL
  if (initialGoalId && step === 1) {
    setStep(2);
  }

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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStep(4);
    setIsSubmitting(false);
  }

  const downloadCertificate = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1600;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Load and draw template
      const templateImg = new Image();
      templateImg.crossOrigin = "anonymous";
      templateImg.src = '/certificate-template.jpg';
      
      await new Promise((resolve, reject) => {
        templateImg.onload = resolve;
        templateImg.onerror = reject;
        setTimeout(() => reject(new Error('Template load timeout')), 5000);
      });

      ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

      // Draw user's photo in center circle
      // Circle center: approximately 47% from left, 42% from top
      const circleX = canvas.width * 0.47;
      const circleY = canvas.height * 0.42;
      const circleRadius = 190;

      if (photoUrl) {
        const photoImg = new Image();
        photoImg.crossOrigin = "anonymous";
        photoImg.src = photoUrl;
        
        await new Promise((resolve, reject) => {
          photoImg.onload = resolve;
          photoImg.onerror = reject;
          setTimeout(() => reject(new Error('Photo load timeout')), 5000);
        });

        // Clip to circle and draw photo
        ctx.save();
        ctx.beginPath();
        ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(photoImg, circleX - circleRadius, circleY - circleRadius, circleRadius * 2, circleRadius * 2);
        ctx.restore();

        // Draw circle border
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw user's name on right side where "Mr." text is
      const name = form.getValues("fullName") || "PLEDGER";
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 56px Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      // Position: right side, roughly where "Mr." text is (~70% from left, 30% from top)
      const nameX = canvas.width * 0.65;
      const nameY = canvas.height * 0.35;
      
      // Split long names
      const nameParts = name.split(' ');
      if (nameParts.length > 1) {
        ctx.fillText(nameParts[0], nameX, nameY);
        ctx.fillText(nameParts.slice(1).join(' '), nameX, nameY + 70);
      } else {
        ctx.fillText(name, nameX, nameY);
      }

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `pledge-certificate-${form.getValues("fullName")}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          
          toast({
            title: "Success!",
            description: "Certificate downloaded successfully!",
          });
        }
      }, 'image/png');
    } catch (err) {
      console.error("Download error:", err);
      toast({
        title: "Download failed",
        description: "Could not generate certificate. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const shareOnSocial = (platform: string) => {
    const text = `I just took the pledge to make a positive impact! Join the movement with MyGov Pledge.`;
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
    }
    if (shareUrl) window.open(shareUrl, '_blank');
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
          {step >= 4 && (
            <>
              <ChevronRight className="w-4 h-4" />
              <span className="text-primary font-bold">4. Certificate</span>
            </>
          )}
        </div>
        <div className="h-1 bg-slate-100 mt-4 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min((step / 4) * 100, 100)}%` }}
          />
        </div>
      </div>

      {step === 4 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="bg-green-50 text-green-700 px-6 py-4 rounded-lg mb-8 text-center w-full">
            <h2 className="text-2xl font-bold mb-2">Pledge Verified! 🎉</h2>
            <p>Your certificate is ready to download and share with the world.</p>
          </div>

          <div ref={certificateRef} className="mb-8 w-full max-w-2xl shadow-2xl rounded-lg" style={{ position: 'relative', width: '100%' }}>
            {/* Template base image */}
            <img src="/certificate-template.jpg" alt="Certificate" className="w-full" style={{ display: 'block', position: 'relative', zIndex: 1 }} />
            
            {/* Photo overlay - white circle with user photo */}
            {photoUrl && (
              <div style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 10
              }}>
                <div style={{ 
                  position: 'absolute',
                  left: '47%', 
                  top: '42%', 
                  transform: 'translate(-50%, -50%)',
                  width: '380px', 
                  height: '380px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '14px solid white',
                  boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.3)',
                  backgroundColor: '#ffffff',
                  flexShrink: 0
                }}>
                  <img 
                    src={photoUrl} 
                    alt="Your certificate photo" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      backgroundColor: 'white'
                    }} 
                  />
                </div>
              </div>
            )}

            {/* Name overlay */}
            <div style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 15
            }}>
              <div style={{ 
                position: 'absolute',
                left: '66%', 
                top: '30%',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '56px',
                textShadow: '4px 4px 8px rgba(0,0,0,0.6)',
                lineHeight: '1.05',
                fontFamily: 'Arial, sans-serif',
                textAlign: 'left'
              }}>
                {form.getValues("fullName") && form.getValues("fullName").split(' ').length > 1 ? (
                  <>
                    <div>{form.getValues("fullName").split(' ')[0]}</div>
                    <div style={{ marginTop: '8px' }}>{form.getValues("fullName").split(' ').slice(1).join(' ')}</div>
                  </>
                ) : (
                  form.getValues("fullName") || "YOUR NAME"
                )}
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl space-y-6">
            <Button onClick={downloadCertificate} size="lg" className="w-full" disabled={isDownloading}>
              <Download className="w-4 h-4 mr-2" />
              {isDownloading ? "Generating..." : "Download Certificate"}
            </Button>

            <div className="border-t pt-6">
              <h3 className="font-bold mb-4">Share Your Achievement</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" onClick={() => shareOnSocial('twitter')} size="sm">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={() => shareOnSocial('linkedin')} size="sm">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={() => shareOnSocial('whatsapp')} size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button variant="ghost" onClick={() => setLocation("/")} className="w-full">
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
                    <div className="w-32 h-32 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative cursor-pointer hover:border-primary transition-colors">
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
                          <FormLabel>Email</FormLabel>
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
                            <SelectContent className="max-h-[200px] bg-white border shadow-md">
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
                  className="flex flex-col items-center max-w-2xl mx-auto"
                >
                  <h3 className="text-xl font-bold mb-6">Review Your Pledge</h3>
                  
                  <div className="bg-slate-50 border rounded-lg p-8 w-full space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                        {photoUrl ? (
                          <img src={photoUrl} alt="Your photo" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Upload className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Your Name</p>
                        <p className="text-2xl font-bold">{form.getValues("fullName") || "Not provided"}</p>
                        <p className="text-sm text-muted-foreground mt-2">Goal: {selectedGoal?.title}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    Click "Confirm Pledge" to generate your certificate.
                  </p>
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
