import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const INITIAL_KEYWORDS = [
  "Ergonomic Pet Bed", "Modular Desk Organizer", "LED Facial Mask", 
  "Weighted Blanket", "Hydroponic Kit", "Smart Bird Feeder",
  "Portable Power Station", "Flame Humidifier", "Matcha Whisk Set",
  "Air Purifying Plants", "Bamboo Sheets", "Reusable Silicone Bags",
  "Adjustable Dumbbells", "Electric Toothbrush", "Wireless Charging Station",
  "Sunrise Alarm Clock", "Essential Oil Diffuser", "Massage Gun",
  "Cold Brew Maker", "Self-Cleaning Water Bottle"
];

export async function GET() {
  try {
    const results = [];
    
    for (const keyword of INITIAL_KEYWORDS) {
      const { data, error } = await supabaseAdmin
        .from('products')
        .upsert({
          keyword,
          category: "General",
          trend_score: Math.floor(Math.random() * 50) + 30,
          trend_direction: "stable",
          last_refreshed: new Date().toISOString()
        }, { onConflict: 'keyword' })
        .select()
        .single();
      
      if (!error) results.push(data);
    }

    return NextResponse.json({ 
      success: true, 
      message: `Seeded ${results.length} keywords. Run /api/refresh-trends?keyword=... for each to populate real data.`,
      seeded: results
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
