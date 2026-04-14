/**
 * Prompt builders for each AI feature.
 * Kept minimal to reduce token usage.
 */

import type { AiFeature } from './types.js';

type PromptBuilder = (payload: Record<string, unknown>) => string;

const SYSTEM_PROMPT =
  'You are a fleet management AI assistant. Be concise. Respond in plain text, no markdown.';

const builders: Record<AiFeature, PromptBuilder> = {
  'fleet-summary': (p) =>
    `Summarize fleet status in 2-3 sentences. Data: total=${p.total}, active=${p.active}, offRoad=${p.offRoad}, utilization=${p.utilization}, maintenance=${p.maintenance}.`,

  'predictive-maintenance': (p) =>
    `Predict maintenance needs in 2-3 sentences. Vehicle: ${p.vehicleId}, mileage=${p.mileage}km, lastService=${p.lastService}, alerts=${JSON.stringify(p.alerts)}.`,

  'alert-prioritization': (p) =>
    `Rank these alerts by urgency (highest first) and explain briefly: ${JSON.stringify(p.alerts)}.`,

  'driver-risk-score': (p) =>
    `Score driver risk 0-100 and explain in 1-2 sentences. Driver: ${p.driverId}, violations=${p.violations}, fatigue=${p.fatigueEvents}, harshBraking=${p.harshBraking}, speed=${p.speedingEvents}.`,

  'vehicle-risk-score': (p) =>
    `Score vehicle risk 0-100 and explain in 1-2 sentences. Vehicle: ${p.vehicleId}, defects=${p.defects}, mileage=${p.mileage}km, lastInspection=${p.lastInspection}.`,

  'report-summary': (p) =>
    `Summarize this fleet report in 3-4 sentences highlighting key insights: ${JSON.stringify(p.reportData)}.`,

  'fuel-optimization': (p) =>
    `Suggest 2-3 fuel optimization actions. Fleet: vehicles=${p.vehicles}, avgConsumption=${p.avgConsumption}L/100km, idleTime=${p.idleTime}hrs, routes=${p.routes}.`,

  'future-cost-prediction': (p) =>
    `Predict fleet costs for next ${p.period}. Current monthly: fuel=${p.fuelCost}, maintenance=${p.maintenanceCost}, operations=${p.operationsCost}. Trend: ${p.trend}. Give a short estimate.`,

  'route-delay-prediction': (p) =>
    `Predict delay risk for route ${p.routeId} (${p.origin} to ${p.destination}, ${p.distance}km). Traffic=${p.trafficLevel}, weather=${p.weather}, historicalDelay=${p.historicalDelay}min. Give risk level and expected delay.`,
};

export function buildPrompt(
  feature: AiFeature,
  payload: Record<string, unknown>,
): { system: string; user: string } {
  const builder = builders[feature];
  if (!builder) throw new Error(`Unknown AI feature: ${feature}`);
  return { system: SYSTEM_PROMPT, user: builder(payload) };
}
