import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { searchRedditPosts, searchEtsyListings, searchYouTubeVideos } from "@/lib/api-sources";
import { calculateTrendScore, getTrendDirection } from "@/lib/trends-logic";
import { generateAISummary } from "@/lib/ai-service";

export const dynamic = "force-dynamic";

// This route would be called by Vercel Cron or a manual trigger
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');

  if (!keyword) {
    return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
  }

  try {
    // 1. Fetch data from all sources in parallel
    const [redditPosts, etsyListings, youtubeVideos] = await Promise.all([
      searchRedditPosts(keyword),
      searchEtsyListings(keyword),
      searchYouTubeVideos(keyword)
    ]);

    // 2. Prepare signals for trend score
    // In a real app, you'd calculate growth/velocity. 
    // Here we use absolute numbers as a proxy for the MVP.
    const signals = {
      googleTrendsScore: Math.floor(Math.random() * 60) + 40, // Mocking Google Trends for now
      redditMentionsPerWeek: redditPosts.length * 2,
      youtubeViewsRecent: youtubeVideos.reduce((acc: number, v: any) => acc + parseInt(v.statistics?.viewCount || 0), 0),
      etsyListingGrowth: Math.floor(Math.random() * 30) // Mocking growth
    };

    const newScore = calculateTrendScore(signals);

    // 3. Get existing product to determine direction
    const { data: existingProduct } = await supabaseAdmin
      .from('products')
      .select('trend_score')
      .eq('keyword', keyword)
      .single();

    const direction = getTrendDirection(newScore, existingProduct?.trend_score || 0);

    // 4. Generate AI Summary (only if it doesn't exist or is old)
    const aiSummary = await generateAISummary(keyword, {
      redditMentions: redditPosts.length,
      etsyListings: etsyListings.length,
      youtubeViews: signals.youtubeViewsRecent,
      priceMin: Math.min(...etsyListings.map((l: any) => parseFloat(l.price?.amount || 0))),
      priceMax: Math.max(...etsyListings.map((l: any) => parseFloat(l.price?.amount || 0))),
    });

    // 5. Update Database
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .upsert({
        keyword,
        trend_score: newScore,
        trend_direction: direction,
        reddit_mentions: redditPosts.length,
        etsy_listing_count: etsyListings.length,
        youtube_video_count: youtubeVideos.length,
        price_min: Math.min(...etsyListings.map((l: any) => parseFloat(l.price?.amount || 0))) || 0,
        price_max: Math.max(...etsyListings.map((l: any) => parseFloat(l.price?.amount || 0))) || 0,
        ai_summary: aiSummary,
        last_refreshed: new Date().toISOString()
      }, { onConflict: 'keyword' })
      .select()
      .single();

    if (productError) throw productError;

    // 6. Log to history
    await supabaseAdmin.from('trend_history').insert({
      product_id: product.id,
      score: newScore
    });

    // 7. Store source details
    // (In a real app, you'd batch upsert these)
    
    return NextResponse.json({ success: true, product });

  } catch (error: any) {
    console.error("Refresh Trends Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
