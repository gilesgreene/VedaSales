import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { auth, currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { seller_type, categories, goal } = body;

    const { data, error } = await supabaseAdmin
      .from('users')
      .upsert({
        clerk_id: userId,
        email: user.primaryEmailAddress?.emailAddress,
        seller_type,
        categories,
        goal,
        plan: 'free'
      }, { onConflict: 'clerk_id' })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, user: data });
  } catch (error: any) {
    console.error("User Setup Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
