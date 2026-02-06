import { NextRequest, NextResponse } from "next/server";
import { withApiHandling } from "@/lib/api-handler";
import { readDb, writeDb, generateId } from "@/lib/db";
import { AppError } from "@/lib/errors";

export const runtime = "nodejs";

export const GET = withApiHandling(async (request) => {
  const userId = request.nextUrl.searchParams.get("userId");
  if (!userId) {
    throw new AppError("userId query param gerekli", "VALIDATION_ERROR", 400);
  }

  const db = await readDb();
  const records = db.consents.filter((item) => item.userId === userId);
  return NextResponse.json({ userId, records });
});

export const POST = withApiHandling(async (request: NextRequest) => {
  const body = (await request.json()) as {
    userId?: string;
    essential?: boolean;
    analytics?: boolean;
    marketing?: boolean;
    policyVersion?: string;
  };

  if (!body.userId || !body.policyVersion || typeof body.essential !== "boolean") {
    throw new AppError(
      "userId, essential ve policyVersion alanları zorunlu",
      "VALIDATION_ERROR",
      400,
    );
  }

  const db = await readDb();
  const consent = {
    id: generateId("consent"),
    userId: body.userId,
    essential: body.essential,
    analytics: body.analytics ?? false,
    marketing: body.marketing ?? false,
    policyVersion: body.policyVersion,
    sourceIp: request.headers.get("x-forwarded-for") ?? undefined,
    createdAt: new Date().toISOString(),
  };

  db.consents = [consent, ...db.consents];
  await writeDb(db);

  return NextResponse.json({ success: true, consent }, { status: 201 });
});
