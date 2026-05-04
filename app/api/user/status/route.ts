import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('seller_type, onboarding_completed:seller_type')
      .eq('clerk_id', userId)
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json({ 
      onboardingComplete: !!data?.seller_type,
      user: data 
    });
  } catch (error: any) {
    console.error("User Status Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
