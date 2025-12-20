import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toPng } from "html-to-image";
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
  ChevronRight,
  ChevronLeft,
  Upload,
  Download,
  Share2,
  Twitter,
  Linkedin,
  TreePine,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  goalId: z.string().min(1, "Please select a goal"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  photoUrl: z.string().optional(),
});

export default function Pledge() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      goalId: "999", // CGI Plantation
      city: "",
      country: "",
      photoUrl: undefined,
    },
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", description: "Please upload an image smaller than 5MB", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPhotoUrl(base64);
        form.setValue("photoUrl", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (step < 4) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const pledgeData = {
        fullName: `${values.firstName} ${values.lastName}`,
        email: values.email,
        goalId: parseInt(values.goalId),
        city: values.city,
        country: values.country,
      };
      await apiRequest("POST", "/api/pledges", pledgeData);
      setStep(5);
    } catch (error) {
      console.error("Pledge submission error:", error);
      toast({ title: "Error", description: "Failed to submit pledge. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  const downloadCertificate = async () => {
    if (isDownloading || !certificateRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(certificateRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `pledge-certificate-${form.getValues("firstName")}-${form.getValues("lastName")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({ title: "Success!", description: "Certificate downloaded successfully!" });
    } catch (err) {
      console.error("Download error:", err);
      toast({ title: "Download failed", description: "Could not generate certificate. Please try again.", variant: "destructive" });
    } finally {
      setIsDownloading(false);
    }
  };

  const shareOnSocial = (platform: string) => {
    const text = `I just planted a tree to make a positive impact! Join the movement.`;
    // const url = "https://global-pledge.replit.app"; // URL removed from message
    let shareUrl = "";
    switch (platform) {
      case 'twitter': shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`; break;
      case 'linkedin': shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://global-pledge.replit.app")}`; break;
      case 'whatsapp': shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`; break;
    }
    if (shareUrl) window.open(shareUrl, '_blank');
  };

  const stepLabels = ["Details", "Preview", "Certificate"];

  // Auto-select CGI Plantation (we'll use a hardcoded goalId for now)
  useEffect(() => {
    if (step === 1) {
      // Skip category and goal selection, go directly to details
      form.setValue("goalId", "999"); // Placeholder for CGI Plantation
      setStep(3); // Start at details step
    }
  }, []);

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 bg-gradient-to-r from-white/40 to-emerald-50/40 backdrop-blur-xl rounded-2xl p-4 md:p-8 border border-white/30 shadow-lg"
      >
        <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6">
          <img src="/communitree_logo.png" alt="Communitree" className="h-8 md:h-16 w-auto object-contain flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-4xl font-black font-serif text-slate-900 leading-tight">CGI Plantation Initiative</h1>
            <p className="text-xs md:text-base text-slate-600 mt-1">Complete your details to receive your certificate</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold flex-wrap">
          {stepLabels.slice(0, Math.max(step - 2, 1)).map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-full transition-all ${step >= i + 3 ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg" : "bg-slate-100 text-slate-600"}`}>
                {i + 1}. {label}
              </span>
              {i < Math.max(step - 2, 1) - 1 && <ChevronRight className="w-4 h-4 text-slate-400" />}
            </div>
          ))}
        </div>
        <div className="h-2 bg-slate-200 mt-6 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-lg shadow-emerald-500/50"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(((step - 2) / 3) * 100, 100)}%` }}
          />
        </div>
      </motion.div>

      {step === 5 ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 px-8 py-6 rounded-2xl mb-8 text-center w-full border border-emerald-200 shadow-lg">
            <h2 className="text-3xl font-black mb-3 font-serif">Plantation Certificate Ready!</h2>
            <p className="text-lg">Your official CGI Plantation certificate is ready to download and share.</p>
          </div>

          <div ref={certificateRef} className="relative w-full max-w-2xl aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mb-8" style={{ backgroundColor: '#1a365d' }}>
            <img src="/certificate-template.jpg" alt="Certificate" className="w-full h-full object-cover" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
            {photoUrl && (
              <div style={{ position: 'absolute', top: '45.1%', left: '44.2%', transform: 'translate(-50%, -50%)', width: '62%', aspectRatio: '1', borderRadius: '50%', overflow: 'hidden', border: '4px solid white', zIndex: 10 }}>
                <img src={photoUrl} alt="Your photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <div style={{ position: 'absolute', left: '65%', top: '23.5%', color: 'white', fontWeight: '900', fontSize: '25px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', zIndex: 15, width: '35%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', lineHeight: '1.2' }}>
              {form.getValues("firstName")}
            </div>
            <div style={{ position: 'absolute', left: '65%', top: '28.5%', color: 'white', fontWeight: '900', fontSize: '25px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', zIndex: 15, width: '35%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', lineHeight: '1.2' }}>
              {form.getValues("lastName")}
            </div>

          </div>

          <div className="w-full max-w-2xl space-y-6">
            <Button onClick={downloadCertificate} size="lg" className="w-full h-14 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold shadow-xl" disabled={isDownloading}>
              <Download className="w-5 h-5 mr-2" />
              {isDownloading ? "Generating..." : "Download Certificate"}
            </Button>
            <div className="border-t border-slate-200 pt-8">
              <h3 className="font-black text-lg mb-6 text-slate-900">Share Your Achievement</h3>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" onClick={() => shareOnSocial('twitter')} size="lg"><Twitter className="w-5 h-5" /></Button>
                <Button variant="outline" onClick={() => shareOnSocial('linkedin')} size="lg"><Linkedin className="w-5 h-5" /></Button>
                <Button variant="outline" onClick={() => shareOnSocial('whatsapp')} size="lg"><Share2 className="w-5 h-5" /></Button>
              </div>
            </div>
            <Button variant="ghost" onClick={() => setLocation("/")} className="w-full h-12 text-emerald-600 font-bold">Return Home</Button>
          </div>
        </motion.div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              {/* Skip step 1 and 2 - Categories and Goals are hidden */}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6 max-w-lg mx-auto">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-32 h-32 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative cursor-pointer hover:border-primary">
                      {photoUrl ? (
                        <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-2">
                          <Upload className="w-8 h-8 mx-auto text-slate-400 mb-1" />
                          <span className="text-xs text-muted-foreground">Upload Photo</span>
                        </div>
                      )}
                      <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handlePhotoUpload} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Required for certificate</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="firstName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name (for Certificate)</FormLabel>
                        <FormControl><Input placeholder="Jane" {...field} data-testid="input-firstName" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="lastName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name (for Certificate)</FormLabel>
                        <FormControl><Input placeholder="Doe" {...field} data-testid="input-lastName" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input placeholder="jane@example.com" {...field} data-testid="input-email" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl><Input placeholder="New York" {...field} data-testid="input-city" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="relative z-50">
                    <FormField control={form.control} name="country" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-country"><SelectValue placeholder="Select a country" /></SelectTrigger>
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
                    )} />
                  </div>


                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col items-center max-w-2xl mx-auto">
                  <h3 className="text-xl font-bold mb-6">Review Your Pledge</h3>
                  <div className="bg-slate-50 border rounded-lg p-8 w-full space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                        {photoUrl ? (
                          <img src={photoUrl} alt="Your photo" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400"><Upload className="w-8 h-8" /></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Your Name</p>
                        <p className="text-2xl font-bold">{form.getValues("firstName")} {form.getValues("lastName") || "Not provided"}</p>
                        <p className="text-sm text-muted-foreground mt-2">Goal: CGI Plantation</p>
                        <p className="text-sm text-emerald-600 mt-1 font-semibold">Plant trees and make a lasting environmental impact</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">Click "Confirm Pledge" to generate your certificate.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between pt-8 border-t gap-4">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)} data-testid="button-back" className="hover:bg-slate-100">
                  <ChevronLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              ) : (
                <div></div>
              )}

              {step > 1 && (
                <Button type="submit" disabled={isSubmitting} data-testid="button-next" className="bg-blue-600 hover:bg-blue-700 text-white">
                  {isSubmitting ? "Generating..." : step === 4 ? "Confirm Pledge" : <>Next <ChevronRight className="w-4 h-4 ml-2" /></>}
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
