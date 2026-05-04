'use client';

import { useState, useEffect, use } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  TrendingUp, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  MessageCircle, 
  ShoppingBag, 
  Play, 
  LineChart,
  ChevronRight,
  Info,
  ExternalLink,
  Zap,
  Shield
} from "lucide-react";
import { 
  LineChart as ReChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Product, TrendHistory } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [history, setHistory] = useState<TrendHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchProductData();
    }
  }, [params.id]);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();

      if (productError) throw productError;
      setProduct(productData);

      const { data: historyData, error: historyError } = await supabase
        .from('trend_history')
        .select('*')
        .eq('product_id', params.id)
        .order('recorded_at', { ascending: true });

      if (historyError) throw historyError;
      setHistory(historyData || []);

    } catch (err) {
      console.error("Error fetching product details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background space-y-4">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button onClick={() => router.back()} className="text-primary hover:underline">Go back</button>
      </div>
    );
  }

  const chartData = history.map(h => ({
    date: new Date(h.recorded_at).toLocaleDateString([], { month: 'short', day: 'numeric' }),
    value: h.score
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="px-6 py-4 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center">
            <img src="/logo-dark.svg" alt="VedaSales" className="h-10 w-auto" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground ml-6 border-l border-border pl-6">
              <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">Product Details</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <Share2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-full transition-colors ${isSaved ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-muted-foreground hover:text-foreground'}`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="vs-score-badge">
                  {product.category || "General"}
                </span>
                <div className={`flex items-center gap-1 font-bold text-sm ${product.trend_direction === 'rising' ? 'text-[var(--vs-accent)]' : 'text-[var(--vs-amber)]'}`}>
                  {product.trend_direction === 'rising' ? <TrendingUp className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                  {product.trend_direction === 'rising' ? 'High Growth' : 'Steady Trend'}
                </div>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight leading-tight">{product.keyword}</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Market analysis and trend intelligence for "{product.keyword}".
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Opportunity Score</div>
              <div className="text-6xl font-black text-primary leading-none">{product.trend_score}</div>
            </div>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Chart Card */}
            <div className="vs-card space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-primary" />
                  Trend History
                </h3>
                <div className="font-mono text-[10px] text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                  <Info className="w-3 h-3" /> Last 90 days
                </div>
              </div>
              <div className="h-[300px] w-full">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <ReChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--vs-border)" />
                      <XAxis dataKey="date" stroke="var(--vs-text-dim)" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="var(--vs-text-dim)" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--vs-surface)', border: '1px solid var(--vs-border)', borderRadius: '12px' }} 
                        itemStyle={{ color: 'var(--vs-accent)' }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="var(--vs-accent)" 
                        strokeWidth={3} 
                        dot={{ fill: 'var(--vs-accent)', strokeWidth: 2, r: 4 }} 
                        activeDot={{ r: 6, strokeWidth: 0 }} 
                      />
                    </ReChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground bg-secondary/10 rounded-xl border border-dashed border-border">
                    No historical data available yet.
                  </div>
                )}
              </div>
            </div>

            {/* Aggregated Sources Feed */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Source Intelligence</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Reddit Mentions", value: product.reddit_mentions.toString(), sub: "Last 30 days", icon: <MessageCircle className="w-5 h-5 text-[var(--vs-amber)]" /> },
                  { label: "Etsy Listings", value: product.etsy_listing_count.toString(), sub: `Range: $${product.price_min}+$`, icon: <ShoppingBag className="w-5 h-5 text-[var(--vs-accent)]" /> },
                  { label: "YouTube Videos", value: product.youtube_video_count.toString(), sub: "Recent reviews", icon: <Play className="w-5 h-5 text-[var(--vs-red)]" /> },
                ].map((stat, i) => (
                  <div key={i} className="vs-metric">
                    <div className="flex items-center gap-2 mb-2">
                      {stat.icon}
                      <span className="vs-metric-label mb-0">{stat.label}</span>
                    </div>
                    <div className="vs-metric-value text-2xl">{stat.value}</div>
                    <div className="font-mono text-[9px] text-muted-foreground mt-1 tracking-tight uppercase">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Summary Card */}
            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Shield className="w-24 h-24 text-primary" />
              </div>
              <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
                <Zap className="w-5 h-5" />
                AI Insights
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground relative z-10">
                {product.ai_summary || "Generating AI summary..."}
              </p>
              <div className="pt-2">
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wider">
                  Claude 3.5 Analysis
                </span>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="vs-card space-y-4">
              <h3 className="text-lg font-bold">Market Context</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-mono text-muted-foreground uppercase text-[10px] tracking-wider">Min Entry Price</span>
                  <span className="font-bold">${product.price_min || "0.00"}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-mono text-muted-foreground uppercase text-[10px] tracking-wider">Max Market Price</span>
                  <span className="font-bold">${product.price_max || "0.00"}</span>
                </div>
              </div>
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className={`w-full mt-4 vs-btn-primary ${isSaved ? 'vs-btn-ghost bg-[var(--vs-surface-2)] text-[var(--vs-text)]' : ''} flex items-center justify-center gap-2`}
              >
                {isSaved ? 'In Watchlist' : 'Save to Watchlist'} <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

