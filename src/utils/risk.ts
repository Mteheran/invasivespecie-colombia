export type RiskKey = 'high' | 'medium' | 'low';

/** Mapea el `riskLevel` numérico de la API (0,1,2) a una clave de riesgo. */
export function riskKeyFromLevel(level: number): RiskKey {
  if (level >= 2) return 'high';
  if (level === 1) return 'medium';
  return 'low';
}

/** Token de color del tema (`risk.high|medium|low`) para un nivel de riesgo. */
export function riskColorToken(level: number): string {
  return `risk.${riskKeyFromLevel(level)}`;
}
