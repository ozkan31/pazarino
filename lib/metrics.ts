type MetricsStore = {
  totalRequests: number;
  totalErrors: number;
  avgLatencyMs: number;
  latenciesMs: number[];
};

const metrics: MetricsStore = {
  totalRequests: 0,
  totalErrors: 0,
  avgLatencyMs: 0,
  latenciesMs: [],
};

export function recordRequest(latencyMs: number, isError: boolean) {
  metrics.totalRequests += 1;
  if (isError) {
    metrics.totalErrors += 1;
  }

  metrics.latenciesMs.push(latencyMs);
  if (metrics.latenciesMs.length > 300) {
    metrics.latenciesMs.shift();
  }

  const total = metrics.latenciesMs.reduce((sum, x) => sum + x, 0);
  metrics.avgLatencyMs = Number((total / metrics.latenciesMs.length).toFixed(2));
}

export function getMetrics() {
  const errorRate =
    metrics.totalRequests === 0
      ? 0
      : Number(((metrics.totalErrors / metrics.totalRequests) * 100).toFixed(2));

  return {
    totalRequests: metrics.totalRequests,
    totalErrors: metrics.totalErrors,
    errorRatePercent: errorRate,
    averageLatencyMs: metrics.avgLatencyMs,
  };
}
