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
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { Certificate } from "@/components/ui/certificate-card";
import { toPng } from "html-to-image";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  goalId: z.string().min(1, "Please select a goal"),
  story: z.string().optional(),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
});

export default function Pledge() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialGoalId = searchParams.get("goal") || "";

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    },
  });

  const selectedGoalId = form.watch("goalId");
  const selectedGoal = SDGs.find((g) => g.id.toString() === selectedGoalId);

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
      const dataUrl = await toPng(certificateRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `pledge-certificate-${selectedGoal?.id}.png`;
      link.href = dataUrl;
      link.click();
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
          <div className="bg-green-50 text-green-700 px-6 py-4 rounded-lg mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p>Your pledge has been officially registered on the Global Pledge Initiative.</p>
          </div>

          <div className="mb-8 w-full max-w-2xl flex justify-center">
             {selectedGoal && (
                <Certificate
                  ref={certificateRef}
                  name={form.getValues("fullName")}
                  goal={selectedGoal}
                  story={form.getValues("story")}
                  date={new Date().toLocaleDateString()}
                  pledgeId="OFFICIAL-VERIFIED-XXXX"
                />
             )}
          </div>

          <div className="flex gap-4">
            <Button onClick={downloadCertificate} size="lg">
              Download Certificate
            </Button>
            <Button variant="outline" size="lg" onClick={() => setLocation("/")}>
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
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {SDGs.map((goal) => (
                    <FormItem key={goal.id} className="space-y-0">
                      <FormControl>
                        <div
                          onClick={() => {
                            form.setValue("goalId", goal.id.toString());
                            setStep(2);
                          }}
                          className={`cursor-pointer aspect-square rounded-lg p-4 flex flex-col justify-between transition-all hover:scale-105 ${
                            selectedGoalId === goal.id.toString() 
                              ? "ring-4 ring-offset-2 ring-primary scale-105" 
                              : ""
                          }`}
                          style={{ backgroundColor: goal.color }}
                        >
                          <span className="text-white/80 font-bold text-xl">{goal.id}</span>
                          <span className="text-white font-bold text-sm leading-tight">{goal.title}</span>
                          {selectedGoalId === goal.id.toString() && (
                            <div className="absolute top-2 right-2 bg-white rounded-full p-1 text-primary">
                              <Check className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  ))}
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
                          <SelectContent>
                            <SelectItem value="USA">United States</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="DE">Germany</SelectItem>
                            <SelectItem value="FR">France</SelectItem>
                            <SelectItem value="JP">Japan</SelectItem>
                            {/* Add more as needed */}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                  {selectedGoal && (
                    <div className="scale-75 md:scale-100 origin-top mb-8">
                       <Certificate
                          name={form.getValues("fullName") || "Your Name"}
                          goal={selectedGoal}
                          story={form.getValues("story")}
                          date={new Date().toLocaleDateString()}
                          pledgeId="PREVIEW-MODE"
                        />
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
