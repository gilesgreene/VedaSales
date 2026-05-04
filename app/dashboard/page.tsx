'use client';

import { TrendingUp, Users, Search, RefreshCw, Filter, ArrowUpRight, ArrowDownRight, Minus, ExternalLink, ArrowRight as ArrowRightIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import Link from "next/link";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    trendingCount: 0,
    risingKeywords: 0,
    topCategory: "N/A",
    lastRefresh: "N/A"
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('trend_score', { ascending: false })
        .limit(20);

      if (error) throw error;
      setProducts(data || []);

      // Calculate simple metrics
      if (data && data.length > 0) {
        const categories = data.map(p => p.category);
        const topCat = categories.sort((a, b) =>
          categories.filter(v => v === a).length - categories.filter(v => v === b).length
        ).pop();

        setMetrics({
          trendingCount: data.filter(p => p.trend_score > 70).length,
          risingKeywords: data.filter(p => p.trend_direction === 'rising').length,
          topCategory: topCat || "N/A",
          lastRefresh: data[0]?.last_refreshed ? new Date(data[0].last_refreshed).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"
        });
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6 flex-1">
          <Link href="/dashboard" className="flex items-center shrink-0">
            <img src="/logo-dark.svg" alt="VedaSales" className="h-10 w-auto" />
          </Link>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search trending products..."
              className="w-full bg-secondary/50 border border-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchProducts}
            disabled={loading}
            className="p-2 rounded-full hover:bg-secondary transition-colors relative disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-muted-foreground ${loading ? 'animate-spin' : ''}`} />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
            GG
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Trending Today", value: metrics.trendingCount.toString(), icon: <TrendingUp className="w-4 h-4" />, color: "text-[var(--vs-accent)]" },
            { label: "Rising Keywords", value: metrics.risingKeywords.toString(), icon: <ArrowUpRight className="w-4 h-4" />, color: "text-[var(--vs-blue)]" },
            { label: "Top Category", value: metrics.topCategory, icon: <Users className="w-4 h-4" />, color: "text-[var(--vs-purple)]" },
            { label: "Data Refresh", value: metrics.lastRefresh, icon: <RefreshCw className="w-4 h-4" />, color: "text-[var(--vs-amber)]" },
          ].map((metric, i) => (
            <div key={i} className="vs-metric">
              <div className="flex items-center justify-between mb-1.5">
                <span className="vs-metric-label">{metric.label}</span>
                <div className={`${metric.color}`}>{metric.icon}</div>
              </div>
              <div className="vs-metric-value">{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Dashboard Feed Area */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Trending Products Feed</h2>
            <div className="flex items-center gap-2">
              <button className="vs-btn-ghost px-3 py-1.5 flex items-center gap-2 text-xs">
                <Filter className="w-3 h-3" /> Filter
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="h-64 rounded-2xl bg-card border border-border animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-card/30 rounded-3xl border-2 border-dashed border-border space-y-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold">No products found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or refresh the data.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link 
                  href={`/product/${product.id}`}
                  key={product.id} 
                  className="vs-card flex flex-col group p-0 overflow-hidden"
                >
                  <div className="aspect-square bg-secondary/30 relative flex items-center justify-center p-8">
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/5 to-violet-500/5 flex items-center justify-center">
                      <TrendingUp className="w-12 h-12 text-primary opacity-20" />
                    </div>
                    <div className="absolute top-3 right-3 vs-score-badge flex items-center gap-1">
                      <span>{product.trend_score}</span>
                      <TrendingUp className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{product.category || "General"}</span>
                        {product.trend_direction === 'rising' ? <span className="vs-tag-rising">RISING</span> : product.trend_direction === 'declining' ? <ArrowDownRight className="w-3 h-3 text-[var(--vs-red)]" /> : <Minus className="w-3 h-3 text-[var(--vs-amber)]" />}
                      </div>
                      <h3 className="font-bold leading-tight group-hover:text-primary transition-colors line-clamp-1">{product.keyword}</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {product.reddit_mentions > 0 && <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-secondary border border-border">REDDIT</span>}
                      {product.etsy_listing_count > 0 && <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-secondary border border-border">ETSY</span>}
                    </div>

                    <div className="flex items-baseline justify-between pt-2 mt-auto">
                      <div className="font-mono text-xs text-muted-foreground">
                        {product.price_min ? `$${product.price_min}+` : "Price N/A"}
                      </div>
                      <div className="text-[11px] font-bold text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Details <ArrowRightIcon className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

