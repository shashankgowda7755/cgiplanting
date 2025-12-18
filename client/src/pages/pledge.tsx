import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGoals, useCategories, Goal, Category } from "@/lib/goals";
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
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Upload,
  Download,
  Share2,
  Twitter,
  Linkedin,
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
  Globe,
  User,
  Leaf
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  goalId: z.string().min(1, "Please select a goal"),
  story: z.string().optional(),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  photoUrl: z.string().optional(),
});

const GoalIcons: Record<number, React.ElementType> = {
  1: Wallet, 2: Utensils, 3: Heart, 4: GraduationCap, 5: Users, 6: Droplets,
  7: Zap, 8: Briefcase, 9: Factory, 10: Equal, 11: Building2, 12: Recycle,
  13: ThermometerSun, 14: Fish, 15: TreePine, 16: Shield, 17: Handshake,
  101: Recycle, 102: Recycle, 103: Zap, 104: Droplets, 105: User, 106: Utensils,
  201: TreePine, 202: Zap, 203: Building2, 204: Factory, 205: ThermometerSun,
  301: Heart, 302: Heart, 303: User, 304: Heart, 305: Heart,
  401: TreePine, 402: Leaf, 403: Fish, 404: Leaf, 405: Droplets,
  501: Users, 502: Building2, 503: GraduationCap, 504: Utensils, 505: Users
};

const CategoryIcons: Record<string, React.ElementType> = {
  "Globe": Globe, "User": User, "Building2": Building2, "Heart": Heart, "TreePine": TreePine, "Users": Users
};

export default function Pledge() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialGoalId = searchParams.get("goal") || "";
  const initialCategoryId = searchParams.get("category") || "";
  const { toast } = useToast();
  const { data: goals, isLoading: goalsLoading } = useGoals();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const allGoals = goals || [];
  const allCategories = categories || [];

  const [step, setStep] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    initialCategoryId ? parseInt(initialCategoryId) : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  const filteredGoals = selectedCategoryId 
    ? allGoals.filter(g => g.categoryId === selectedCategoryId)
    : allGoals;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    if (initialGoalId && step === 1 && !goalsLoading) {
      const goal = allGoals.find(g => g.goalId.toString() === initialGoalId);
      if (goal?.categoryId) {
        setSelectedCategoryId(goal.categoryId);
        setStep(2);
      }
    }
  }, [initialGoalId, goalsLoading, allGoals]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      goalId: initialGoalId,
      story: "",
      city: "",
      country: "",
      photoUrl: undefined,
    },
  });

  const selectedGoalId = form.watch("goalId");
  const selectedGoal = allGoals.find((g) => g.goalId.toString() === selectedGoalId);

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
        fullName: values.fullName,
        email: values.email,
        goalId: parseInt(values.goalId),
        story: values.story || "",
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
      link.download = `pledge-certificate-${form.getValues("fullName")}.png`;
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
    const text = `I just took the pledge to make a positive impact! Join the movement with Global Pledge Initiative.`;
    const url = "https://global-pledge.replit.app";
    let shareUrl = "";
    switch (platform) {
      case 'twitter': shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`; break;
      case 'linkedin': shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`; break;
      case 'whatsapp': shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`; break;
    }
    if (shareUrl) window.open(shareUrl, '_blank');
  };

  const stepLabels = ["Category", "Goal", "Details", "Preview", "Certificate"];

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 bg-gradient-to-r from-white/40 to-emerald-50/40 backdrop-blur-xl rounded-2xl p-8 border border-white/30 shadow-lg"
      >
        <h1 className="text-5xl font-black font-serif text-slate-900 mb-6">Take the Pledge</h1>
        <div className="flex items-center gap-2 text-sm font-bold flex-wrap">
          {stepLabels.slice(0, Math.max(step, 4)).map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-full transition-all ${step >= i + 1 ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg" : "bg-slate-100 text-slate-600"}`}>
                {i + 1}. {label}
              </span>
              {i < Math.max(step, 4) - 1 && <ChevronRight className="w-4 h-4 text-slate-400" />}
            </div>
          ))}
        </div>
        <div className="h-2 bg-slate-200 mt-6 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-lg shadow-emerald-500/50"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min((step / 5) * 100, 100)}%` }}
          />
        </div>
      </motion.div>

      {step === 5 ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 px-8 py-6 rounded-2xl mb-8 text-center w-full border border-emerald-200 shadow-lg">
            <h2 className="text-3xl font-black mb-3 font-serif">Pledge Verified!</h2>
            <p className="text-lg">Your certificate is ready to download and share with the world.</p>
          </div>

          <div ref={certificateRef} className="relative w-full max-w-2xl aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mb-8" style={{ backgroundColor: '#1a365d' }}>
            <img src="/certificate-template.jpg" alt="Certificate" className="w-full h-full object-cover" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
            {photoUrl && (
              <div style={{ position: 'absolute', top: '35%', left: '38%', transform: 'translate(-50%, -50%)', width: '30%', aspectRatio: '1', borderRadius: '50%', overflow: 'hidden', border: '6px solid white', zIndex: 10 }}>
                <img src={photoUrl} alt="Your photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <div style={{ position: 'absolute', left: '66%', top: '30%', color: 'white', fontWeight: 'bold', fontSize: '56px', textShadow: '4px 4px 8px rgba(0,0,0,0.6)', lineHeight: '1.05', zIndex: 15 }}>
              {form.getValues("fullName")?.split(' ').map((word, i) => <div key={i} style={{ marginTop: i > 0 ? '8px' : 0 }}>{word}</div>)}
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
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <h2 className="text-2xl font-black mb-6 text-slate-900">Choose a Category</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoriesLoading ? (
                      <div className="col-span-full text-center py-8 text-slate-500">Loading categories...</div>
                    ) : (
                      allCategories.map((category) => {
                        const Icon = CategoryIcons[category.icon] || Globe;
                        return (
                          <div
                            key={category.id}
                            onClick={() => { setSelectedCategoryId(category.id); setStep(2); }}
                            className={`cursor-pointer rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${selectedCategoryId === category.id ? "border-emerald-500 shadow-xl" : "border-transparent"}`}
                            style={{ backgroundColor: category.color + "15" }}
                            data-testid={`category-card-${category.id}`}
                          >
                            <div className="rounded-lg p-3 w-fit mb-4" style={{ backgroundColor: category.color }}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-black text-lg text-slate-900 mb-2">{category.name}</h3>
                            <p className="text-sm text-slate-600">{category.description}</p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-slate-900">Choose a Goal</h2>
                    <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-emerald-600">Change Category</Button>
                  </div>
                  <FormField
                    control={form.control}
                    name="goalId"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {goalsLoading ? (
                            <div className="col-span-full text-center py-8 text-slate-500">Loading goals...</div>
                          ) : filteredGoals.length === 0 ? (
                            <div className="col-span-full text-center py-8 text-slate-500">No goals in this category yet</div>
                          ) : (
                            filteredGoals.map((goal) => {
                              const Icon = GoalIcons[goal.goalId] || Globe;
                              return (
                                <div
                                  key={goal.goalId}
                                  onClick={() => { field.onChange(goal.goalId.toString()); setStep(3); }}
                                  className={`cursor-pointer aspect-square rounded-xl p-4 flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-xl relative ${field.value === goal.goalId.toString() ? "ring-4 ring-offset-2 ring-primary scale-105 shadow-xl" : "shadow-sm"}`}
                                  style={{ backgroundColor: goal.color }}
                                  data-testid={`goal-card-${goal.goalId}`}
                                >
                                  <div className="flex justify-between items-start">
                                    <span className="text-white/90 font-bold text-xl font-serif">{goal.goalId > 100 ? "" : goal.goalId}</span>
                                    <Icon className="text-white/40 w-8 h-8" />
                                  </div>
                                  <span className="text-white font-bold text-sm leading-tight">{goal.title}</span>
                                  {field.value === goal.goalId.toString() && (
                                    <div className="absolute top-2 right-2 bg-white rounded-full p-1 text-primary shadow-sm">
                                      <Check className="w-4 h-4" />
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

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

                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name (for Certificate)</FormLabel>
                      <FormControl><Input placeholder="Jane Doe" {...field} data-testid="input-fullName" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
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

                  <FormField control={form.control} name="story" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why is this goal important to you? (Optional)</FormLabel>
                      <FormControl><Textarea placeholder="I believe that..." className="resize-none h-32" {...field} data-testid="textarea-story" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
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
                        <p className="text-2xl font-bold">{form.getValues("fullName") || "Not provided"}</p>
                        <p className="text-sm text-muted-foreground mt-2">Goal: {selectedGoal?.title}</p>
                        {selectedGoal?.impactValue && selectedGoal?.impactMetric && (
                          <p className="text-sm text-emerald-600 mt-1 font-semibold">Impact: {selectedGoal.impactValue} {selectedGoal.impactMetric}</p>
                        )}
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
