import { TaxonomyCode } from "./types";

export class AppError extends Error {
  constructor(
    message: string,
    public readonly taxonomyCode: TaxonomyCode,
    public readonly status = 500,
    public readonly metadata?: Record<string, unknown>,
  ) {
    super(message);
  }
}
