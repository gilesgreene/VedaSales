'use client';

import { useState } from "react";
import { Check, Zap, Rocket, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "For new sellers getting started with product research.",
    icon: <Search className="w-8 h-8 text-muted-foreground" />,
    features: [
      "5 product views / day",
      "Basic trend data",
      "No watchlist",
      "No AI summaries",
      "No keyword explorer"
    ],
    cta: "Start for Free",
    link: "/sign-up",
    popular: false
  },
  {
    name: "Pro",
    price: "29",
    description: "Perfect for active dropshippers and ecommerce brands.",
    icon: <Zap className="w-8 h-8 text-primary" />,
    features: [
      "Unlimited product views",
      "Watchlist with trend alerts",
      "AI-powered product summaries",
      "Full Keyword Explorer access",
      "Prioritized data refresh"
    ],
    cta: "Get Started",
    link: "/sign-up?plan=pro",
    popular: true
  },
  {
    name: "Business",
    price: "79",
    description: "For serious ecommerce businesses and teams.",
    icon: <Rocket className="w-8 h-8 text-violet-400" />,
    features: [
      "Everything in Pro",
      "CSV data export",
      "API access (Beta)",
      "Priority support",
      "Team collaboration (Future)"
    ],
    cta: "Go Business",
    link: "/sign-up?plan=business",
    popular: false
  }
];

function Search({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  );
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Scale Your Product Research</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Choose the plan that fits your business stage. No hidden fees.</p>
          
          <div className="flex items-center justify-center gap-4 pt-8">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')}
              className="relative w-12 h-6 rounded-full bg-secondary border border-border p-1 transition-all"
            >
              <div className={`w-4 h-4 rounded-full bg-primary transition-all ${billingCycle === 'annually' ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'annually' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annually <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full ml-1 uppercase">2 Months Free</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`p-10 rounded-[2.5rem] border-2 transition-all relative flex flex-col ${plan.popular ? 'border-primary shadow-2xl shadow-primary/10 bg-card scale-105 z-10' : 'border-border bg-card/50 hover:border-primary/30'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">{plan.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{plan.description}</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black">${billingCycle === 'annually' ? Math.floor(parseInt(plan.price) * 0.83) : plan.price}</span>
                <span className="text-muted-foreground font-medium">/mo</span>
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className={`mt-0.5 rounded-full p-0.5 ${plan.popular ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href={plan.link}
                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center pt-12">
          <p className="text-sm text-muted-foreground">
            Have a question? <Link href="/contact" className="text-primary font-medium hover:underline">Contact our sales team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
