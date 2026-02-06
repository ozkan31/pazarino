import { NextRequest, NextResponse } from "next/server";
import { AppError } from "./errors";
import { writeStructuredLog } from "./logger";
import { recordRequest } from "./metrics";

type Handler = (request: NextRequest, correlationId: string) => Promise<NextResponse>;

export function withApiHandling(handler: Handler) {
  return async function wrapped(request: NextRequest): Promise<NextResponse> {
    const startedAt = performance.now();
    const correlationId =
      request.headers.get("x-correlation-id") ?? crypto.randomUUID();

    try {
      const response = await handler(request, correlationId);
      const latency = Number((performance.now() - startedAt).toFixed(2));
      recordRequest(latency, false);

      response.headers.set("x-correlation-id", correlationId);
      await writeStructuredLog({
        severity: "INFO",
        message: `${request.method} ${request.nextUrl.pathname}`,
        correlationId,
        path: request.nextUrl.pathname,
        metadata: { latencyMs: latency, status: response.status },
      });
      return response;
    } catch (error) {
      const latency = Number((performance.now() - startedAt).toFixed(2));
      recordRequest(latency, true);

      if (error instanceof AppError) {
        await writeStructuredLog({
          severity: "ERROR",
          message: error.message,
          correlationId,
          path: request.nextUrl.pathname,
          taxonomyCode: error.taxonomyCode,
          metadata: { status: error.status, ...error.metadata, latencyMs: latency },
        });

        return NextResponse.json(
          {
            error: {
              message: error.message,
              taxonomyCode: error.taxonomyCode,
              correlationId,
            },
          },
          { status: error.status, headers: { "x-correlation-id": correlationId } },
        );
      }

      await writeStructuredLog({
        severity: "ERROR",
        message: "Unhandled internal error",
        correlationId,
        path: request.nextUrl.pathname,
        taxonomyCode: "INTERNAL_ERROR",
        metadata: { latencyMs: latency },
      });

      return NextResponse.json(
        {
          error: {
            message: "Internal server error",
            taxonomyCode: "INTERNAL_ERROR",
            correlationId,
          },
        },
        { status: 500, headers: { "x-correlation-id": correlationId } },
      );
    }
  };
}
