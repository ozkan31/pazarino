import { NextResponse } from "next/server";
import { getActiveTheme, readDb } from "@/lib/db";

export async function GET() {
  return NextResponse.json({ activeTheme: getActiveTheme(), availableThemes: readDb().themes });
}
