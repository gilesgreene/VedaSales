'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Package, Store, Rocket, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

const steps = [
  {
    id: 1,
    title: "What type of seller are you?",
    description: "This helps us tailor your product recommendations.",
    options: [
      { id: "dropshipper", label: "Dropshipper", icon: <Rocket className="w-6 h-6" /> },
      { id: "etsy", label: "Etsy Seller", icon: <Store className="w-6 h-6" /> },
      { id: "amazon", label: "Amazon FBA", icon: <Package className="w-6 h-6" /> },
      { id: "research", label: "General Research", icon: <Search className="w-6 h-6" /> },
    ]
  },
  {
    id: 2,
    title: "What categories interest you?",
    description: "Select all that apply to your business.",
    multi: true,
    options: [
      { id: "home", label: "Home & Garden" },
      { id: "pets", label: "Pet Supplies" },
      { id: "beauty", label: "Beauty" },
      { id: "fashion", label: "Fashion" },
      { id: "fitness", label: "Fitness" },
      { id: "tech", label: "Tech Accessories" },
      { id: "baby", label: "Baby" },
      { id: "outdoor", label: "Outdoor" },
    ]
  },
  {
    id: 3,
    title: "What's your main goal?",
    description: "How can VedaSales best help you today?",
    options: [
      { id: "find", label: "Find winning products" },
      { id: "validate", label: "Validate an idea" },
      { id: "monitor", label: "Monitor trends" },
    ]
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<{
    sellerType: string;
    categories: string[];
    goal: string;
  }>({
    sellerType: "",
    categories: [],
    goal: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleSelect = (optionId: string) => {
    const step = steps[currentStep];
    if (step.multi) {
      setSelections(prev => ({
        ...prev,
        categories: prev.categories.includes(optionId)
          ? prev.categories.filter(id => id !== optionId)
          : [...prev.categories, optionId]
      }));
    } else {
      if (currentStep === 0) setSelections(prev => ({ ...prev, sellerType: optionId }));
      if (currentStep === 2) setSelections(prev => ({ ...prev, goal: optionId }));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    
    try {
      const { error } = await supabase.from('users').upsert({
        clerk_id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        seller_type: selections.sellerType,
        categories: selections.categories,
        goal: selections.goal,
        plan: 'free'
      });

      if (error) throw error;
      router.push('/dashboard');
    } catch (err) {
      console.error("Error saving onboarding data:", err);
      alert("Failed to save preferences. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const step = steps[currentStep];
  const isSelectionEmpty = currentStep === 1 
    ? selections.categories.length === 0 
    : (currentStep === 0 ? !selections.sellerType : !selections.goal);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {steps.map((s, i) => (
            <div 
              key={s.id} 
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-primary' : 'bg-muted'}`} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{step.title}</h1>
              <p className="text-muted-foreground">{step.description}</p>
            </div>

            <div className={`grid ${step.multi ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
              {step.options.map((option) => {
                const isSelected = step.multi 
                  ? selections.categories.includes(option.id)
                  : (currentStep === 0 ? selections.sellerType === option.id : selections.goal === option.id);
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden group
                      ${isSelected 
                        ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                        : 'border-border hover:border-primary/50 bg-card'}
                    `}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                    {(option as any).icon && (
                      <div className={`mb-4 transition-colors ${isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>
                        {(option as any).icon}
                      </div>
                    )}
                    <span className="font-semibold">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentStep === 0 ? 'opacity-0' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          <button
            onClick={nextStep}
            disabled={isSelectionEmpty || loading}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
          >
            {loading ? "Saving..." : (currentStep === steps.length - 1 ? "Finish Setup" : "Continue")}
            {!loading && currentStep !== steps.length - 1 && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
