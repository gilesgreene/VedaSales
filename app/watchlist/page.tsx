'use client';

import { useState, useEffect } from "react";
import { 
  Bookmark, 
  Search, 
  Trash2, 
  Bell, 
  BellOff, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import { WatchlistItem } from "@/types";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchWatchlist();
    }
  }, [user]);

  const fetchWatchlist = async () => {
    setLoading(true);
    try {
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('clerk_id', user?.id)
        .single();

      if (!userData) return;

      const { data, error } = await supabase
        .from('watchlist')
        .select('*, product:products(*)')
        .eq('user_id', userData.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWatchlist(data || []);
    } catch (err) {
      console.error("Error fetching watchlist:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAlert = async (id: string, current: boolean) => {
    try {
      const { error } = await supabase
        .from('watchlist')
        .update({ alert_enabled: !current })
        .eq('id', id);

      if (error) throw error;
      setWatchlist(prev => prev.map(item => 
        item.id === id ? { ...item, alert_enabled: !current } : item
      ));
    } catch (err) {
      console.error("Error toggling alert:", err);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setWatchlist(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Watchlist</h1>
            <p className="text-muted-foreground mt-1">Monitor your saved products and get trend alerts.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-all">
              Export CSV
            </button>
          </div>
        </div>

        {watchlist.length === 0 ? (
          <div className="p-20 text-center space-y-6 rounded-3xl border-2 border-dashed border-border">
            <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
              <Bookmark className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">No products in watchlist yet</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">Explore trending products and save them here to track their performance over time.</p>
            </div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-all">
              Discover Products <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary/30 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-4">Product / Keyword</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Trend Score</th>
                    <th className="px-6 py-4">Added On</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {watchlist.map((item) => (
                    <tr key={item.id} className="hover:bg-secondary/10 transition-colors group">
                      <td className="px-6 py-4">
                        <Link href={`/product/${item.product_id}`} className="font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                          {item.product?.keyword}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                          {item.product?.category || "General"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-lg">{item.product?.trend_score}</span>
                          {item.product?.trend_direction === 'rising' ? (
                            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => toggleAlert(item.id, item.alert_enabled)}
                            className={`p-2 rounded-lg border transition-all ${item.alert_enabled ? 'bg-primary/10 border-primary text-primary' : 'bg-transparent border-border text-muted-foreground hover:text-foreground'}`}
                            title={item.alert_enabled ? "Alerts enabled" : "Enable alerts"}
                          >
                            {item.alert_enabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                          </button>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-2 rounded-lg border border-border text-muted-foreground hover:text-red-400 hover:border-red-400/50 transition-all"
                            title="Remove from watchlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
