'use client';

import { useState } from "react";
import { Search, TrendingUp, ArrowUpRight, BarChart3, MessageCircle, ShoppingBag, Play, Shield, Zap, Info } from "lucide-react";
import { 
  LineChart as ReChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const MOCK_TREND_DATA = [
  { date: 'W1', value: 30 },
  { date: 'W2', value: 45 },
  { date: 'W3', value: 35 },
  { date: 'W4', value: 65 },
  { date: 'W5', value: 80 },
  { date: 'W6', value: 95 },
];

export default function KeywordExplorerPage() {
  const [keyword, setKeyword] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword) return;
    setSearching(true);
    // Simulate API call
    setTimeout(() => {
      setResults({
        keyword,
        score: 88,
        google: 95,
        reddit: 120,
        etsy: 450,
        youtube: 8,
        rising: ["ergonomic dog bed", "calming pet furniture", "orthopedic cat sofa"]
      });
      setSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">Keyword Explorer</h1>
          <p className="text-muted-foreground">Type any product or niche to uncover real-time trend data across Reddit, Etsy, and Google.</p>
          
          <form onSubmit={handleSearch} className="relative mt-8 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="e.g. Weighted Blanket, Hydroponic Kit..."
              className="w-full bg-card border-2 border-border rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-primary transition-all shadow-xl shadow-black/5"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button 
              type="submit"
              disabled={searching}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold hover:bg-primary/90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
            >
              {searching ? "Searching..." : "Explore"}
            </button>
          </form>
        </div>

        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Main Stats */}
            <div className="lg:col-span-2 space-y-8">
              <div className="p-8 rounded-3xl bg-card border border-border/50 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    Interest Over Time
                  </h3>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="flex items-center gap-1"><Info className="w-3 h-3" /> Google Trends</span>
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReChart data={MOCK_TREND_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                      <XAxis dataKey="date" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8b5cf6" 
                        strokeWidth={4} 
                        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 8, strokeWidth: 0 }}
                      />
                    </ReChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Google Rank", value: "High", icon: <TrendingUp className="text-blue-400" /> },
                  { label: "Reddit Velocity", value: "89/mo", icon: <MessageCircle className="text-orange-400" /> },
                  { label: "Etsy Listings", value: "450+", icon: <ShoppingBag className="text-emerald-400" /> },
                  { label: "YT Saturation", value: "Low", icon: <Play className="text-red-500" /> },
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-card border border-border/50 text-center space-y-2">
                    <div className="flex justify-center mb-2">{stat.icon}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                    <div className="text-xl font-black tracking-tight">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunity Analysis Sidebar */}
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-violet-600 text-white space-y-4 relative overflow-hidden shadow-2xl shadow-violet-500/20">
                <div className="relative z-10">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Composite Opportunity Score</div>
                  <div className="text-6xl font-black mt-2">88<span className="text-2xl opacity-50">/100</span></div>
                  <p className="text-sm mt-4 leading-relaxed opacity-90">
                    This keyword is showing strong signals across all tracked platforms. We recommend validating specific product variations on Etsy.
                  </p>
                </div>
                <Zap className="absolute -bottom-4 -right-4 w-32 h-32 opacity-20 rotate-12" />
              </div>

              <div className="p-6 rounded-3xl bg-card border border-border/50 space-y-4">
                <h3 className="font-bold flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                  Related Rising Queries
                </h3>
                <div className="space-y-2">
                  {results.rising.map((query: string, i: number) => (
                    <div key={i} className="p-3 rounded-xl bg-secondary/30 text-sm font-medium hover:bg-secondary/50 transition-colors cursor-pointer flex items-center justify-between group">
                      {query}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
