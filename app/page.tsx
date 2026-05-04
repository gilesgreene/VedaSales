'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Search, Zap, Shield, CheckCircle2, ArrowRight, MessageSquare, Globe, Play } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/60 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center">
          <Link href="/">
            <img src="/logo-dark.svg" alt="Selva" className="h-12 w-auto" />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm font-medium hover:text-primary transition-colors">
            Sign In
          </Link>
          <Link href="/sign-up" className="sl-btn-primary shadow-lg shadow-primary/20">
            Start for Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/20 rounded-full blur-[120px]" />
        </div>

        <motion.div
          className="max-w-5xl mx-auto text-center space-y-8"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase">
            <Zap className="w-3 h-3" />
            AI-Powered Product Discovery
          </motion.div>

          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Find Winning Products <br />
            <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
              Before They Peak
            </span>
          </motion.h1>

          <motion.p variants={fadeIn} className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Selva aggregates data from Reddit, Etsy, YouTube and Google Trends to surface trending ecommerce products in real time.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/sign-up" className="w-full sm:w-auto sl-btn-primary py-4 px-10 text-lg shadow-xl shadow-primary/25 flex items-center justify-center gap-2">
              Start for Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#how-it-works" className="w-full sm:w-auto sl-btn-ghost py-4 px-10 text-lg flex items-center justify-center">
              See How It Works
            </Link>
          </motion.div>

          <motion.div variants={fadeIn} className="pt-12">
            <p className="text-sm font-medium text-muted-foreground mb-6">Trusted by 500+ ecommerce sellers</p>
            <div className="flex flex-wrap justify-center gap-8 grayscale opacity-50">
              {/* Placeholder logos for platforms */}
              <div className="flex items-center gap-2 font-bold text-xl"><MessageSquare className="w-6 h-6 text-orange-400" /> REDDIT</div>
              <div className="flex items-center gap-2 font-bold text-xl"><BarChart3 className="w-6 h-6 text-blue-400" /> GOOGLE</div>
              <div className="flex items-center gap-2 font-bold text-xl"><Play className="w-6 h-6 text-red-500" /> YOUTUBE</div>
              <div className="flex items-center gap-2 font-bold text-xl"><Zap className="w-6 h-6" /> ETSY</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Intelligence at Your Fingertips</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Stop guessing. Start selling with data-backed product insights across the entire web ecosystem.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-Time Trend Intelligence",
                description: "Our algorithm monitors millions of data points to identify products gaining traction in hours, not weeks.",
                icon: <Zap className="w-6 h-6 text-primary" />,
              },
              {
                title: "Multi-Source Data Aggregation",
                description: "Combined insights from Reddit sentiment, Etsy sales, YouTube reviews, and Google Trends search volume.",
                icon: <BarChart3 className="w-6 h-6 text-violet-400" />,
              },
              {
                title: "AI-Powered Product Insights",
                description: "Get concise, actionable summaries for every trending product generated by our advanced AI.",
                icon: <Shield className="w-6 h-6 text-emerald-400" />,
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="sl-card group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The Selva Engine</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Our proprietary intelligence pipeline turns raw web signals into your next winning product.</p>
          </div>

          <div className="space-y-12 relative">
            {/* Vertical Line Connector */}
            <div className="absolute left-[23px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-primary/50 via-violet-500/50 to-primary/50 hidden md:block" />

            {[
              {
                step: "01",
                title: "Deep Signal Harvesting",
                description: "We scan Reddit communities, Etsy rising stars, YouTube reviews, and Google search trends every hour to detect unusual spikes in interest.",
                icon: <Search className="w-6 h-6" />,
                color: "bg-primary/20 text-primary border-primary/20"
              },
              {
                step: "02",
                title: "AI-Driven Validation",
                description: "Our advanced AI analyzes the harvesting results, filtering out noise and bot-driven trends to focus on genuine consumer demand.",
                icon: <Zap className="w-6 h-6" />,
                color: "bg-violet-500/20 text-violet-400 border-violet-500/20"
              },
              {
                step: "03",
                title: "Intelligence Scoring",
                description: "Each product is assigned a Selva Score based on velocity, sentiment, and competition density across all tracked platforms.",
                icon: <BarChart3 className="w-6 h-6" />,
                color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20"
              },
              {
                step: "04",
                title: "Actionable Intelligence",
                description: "You get a curated dashboard of 'Rising' and 'Breakout' products with 3-sentence opportunity summaries to help you move fast.",
                icon: <CheckCircle2 className="w-6 h-6" />,
                color: "bg-blue-500/20 text-blue-400 border-blue-500/20"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="flex flex-col md:flex-row gap-8 items-start relative z-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${item.color} shadow-lg shadow-black/20`}>
                  {item.icon}
                </div>
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-muted-foreground/60 tracking-widest">{item.step}</span>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground">Choose the plan that fits your business scale.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "$0",
                description: "For new sellers getting started.",
                features: ["5 product views / day", "No watchlist", "No AI summaries", "No keyword explorer"],
                cta: "Start for Free",
                pro: false
              },
              {
                name: "Pro",
                price: "$29",
                period: "/mo",
                description: "Perfect for active dropshippers.",
                features: ["Unlimited views", "Watchlist with alerts", "AI Summaries", "Keyword Explorer"],
                cta: "Get Started",
                pro: true
              },
              {
                name: "Business",
                price: "$79",
                period: "/mo",
                description: "For serious ecommerce brands.",
                features: ["Everything in Pro", "CSV data export", "API access", "Priority support"],
                cta: "Go Business",
                pro: false
              }
            ].map((plan, i) => (
              <div
                key={i}
                className={`sl-card flex flex-col relative overflow-hidden ${plan.pro ? 'border-primary shadow-2xl shadow-primary/10' : ''}`}
              >
                {plan.pro && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-8">{plan.description}</p>
                <div className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className={`w-4 h-4 ${plan.pro ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.pro ? 'sl-btn-primary' : 'sl-btn-ghost'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6 flex-1">
            <Link href="/dashboard" className="flex items-center shrink-0">
              <img src="/logo-dark.svg" alt="Selva" className="h-12 w-auto" />
            </Link>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground">Terms of Service</Link>
              <Link href="#" className="hover:text-foreground">Contact</Link>
            </div>
          </div>
          <div className="flex gap-4">
            <Globe className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
            <Play className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
            <Search className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-muted-foreground">
          © 2024 Selva. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

