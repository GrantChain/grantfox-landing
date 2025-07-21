import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { full_name, email, phone } = await req.json();
  if (!email || !full_name || !phone) {
    return NextResponse.json(
      { error: "Todos los campos son requeridos" },
      { status: 400 }
    );
  }
  const { error } = await supabase
    .from("waitlist")
    .insert([{ full_name, email, phone }]);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

export async function GET() {
  const { data, error } = await supabase
    .from("waitlist")
    .select("full_name, email, phone, created_at")
    .order("id", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
}
