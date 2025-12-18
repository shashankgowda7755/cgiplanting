import { useState } from "react";
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
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Show success message
    toast({
      title: "Pledge Submitted!",
      description: "Thank you for taking the pledge. Certificate generation coming soon!",
    });
    
    setIsSubmitting(false);
    // Reset for next pledge
    setTimeout(() => {
      setLocation("/");
    }, 1500);
  }

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
                  Ready to make your pledge? Your certificate will be generated after submission.
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
                "Submitting..." 
              ) : step === 3 ? (
                "Submit Pledge" 
              ) : (
                <>Next <ChevronRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
