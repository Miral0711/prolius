export interface AiRequest {
  feature: AiFeature;
  payload: Record<string, unknown>;
}

export interface AiResponse {
  result: string;
  feature: AiFeature;
}

export type AiFeature =
  | 'fleet-summary'
  | 'predictive-maintenance'
  | 'alert-prioritization'
  | 'driver-risk-score'
  | 'vehicle-risk-score'
  | 'report-summary'
  | 'fuel-optimization'
  | 'future-cost-prediction'
  | 'route-delay-prediction';
