/**
 * ⚠️ UBICACIONES DE EJEMPLO / REFERENCIALES — NO OFICIALES ⚠️
 *
 * Puntos representativos para ilustrar la distribución en el mapa. NO son un
 * registro oficial de ocurrencias. Validar con Invemar / Instituto Humboldt /
 * MinAmbiente antes de publicar. `specieId` enlaza (cuando se conoce) con el id
 * real de la especie en la API para abrir su ficha.
 */

import type { RiskKey } from '../utils/risk';

export interface Occurrence {
  name: string;
  scientificName: string;
  risk: RiskKey;
  where: string;
  lon: number;
  lat: number;
  note: string;
  /** id real en la API (para enlazar a /especie/:id); si falta, se busca por nombre. */
  specieId?: number;
}

export const OCCURRENCES: Occurrence[] = [
  { name: 'Hipopótamo', scientificName: 'Hippopotamus amphibius', risk: 'high', where: 'Magdalena Medio, Antioquia', lon: -74.55, lat: 6.30, note: 'Población establecida en ciénagas del río Magdalena.', specieId: 71 },
  { name: 'Pez león', scientificName: 'Pterois volitans', risk: 'high', where: 'San Andrés y Providencia', lon: -81.70, lat: 12.55, note: 'Depredador sin control natural en los arrecifes del Caribe.', specieId: 72 },
  { name: 'Pez león', scientificName: 'Pterois volitans', risk: 'high', where: 'Santa Marta, Magdalena', lon: -74.20, lat: 11.24, note: 'Presente en el litoral Caribe continental.', specieId: 72 },
  { name: 'Caracol africano', scientificName: 'Lissachatina fulica', risk: 'high', where: 'Eje cafetero, Quindío', lon: -75.68, lat: 4.53, note: 'Plaga agrícola y riesgo sanitario en zonas húmedas.', specieId: 55 },
  { name: 'Retamo espinoso', scientificName: 'Ulex europaeus', risk: 'medium', where: 'Sabana de Bogotá', lon: -74.08, lat: 4.65, note: 'Desplaza vegetación de páramo y aumenta el riesgo de incendio.', specieId: 41 },
  { name: 'Buchón de agua', scientificName: 'Pontederia crassipes', risk: 'medium', where: 'Ciénaga de Ayapel, Córdoba', lon: -75.14, lat: 8.31, note: 'Cubre espejos de agua y reduce el oxígeno disponible.', specieId: 9 },
  { name: 'Rana toro', scientificName: 'Lithobates catesbeianus', risk: 'medium', where: 'Valle del Cauca', lon: -76.53, lat: 3.44, note: 'Depreda anfibios nativos y transmite hongos patógenos.', specieId: 64 },
  { name: 'Trucha arcoíris', scientificName: 'Oncorhynchus mykiss', risk: 'medium', where: 'Lago de Tota, Boyacá', lon: -72.91, lat: 5.55, note: 'Introducida para pesca; desplaza peces de altura nativos.', specieId: 69 },
  { name: 'Susanita', scientificName: 'Thunbergia alata', risk: 'high', where: 'Cerros Orientales, Bogotá', lon: -74.03, lat: 4.62, note: 'Enredadera que cubre y ahoga la vegetación nativa en los cerros de la sabana.', specieId: 45 },
  { name: 'Susanita', scientificName: 'Thunbergia alata', risk: 'high', where: 'Valle de Aburrá, Medellín', lon: -75.60, lat: 6.22, note: 'Invade bordes de bosque y quebradas en el área metropolitana de Medellín.', specieId: 45 },
  { name: 'Pino pátula', scientificName: 'Pinus patula', risk: 'low', where: 'Antioquia, altiplano', lon: -75.57, lat: 6.25, note: 'Plantaciones que acidifican el suelo en zonas de páramo.' },
  { name: 'Caracol manzana', scientificName: 'Pomacea maculata', risk: 'low', where: 'Amazonas, Leticia', lon: -69.94, lat: -4.21, note: 'Afecta cultivos de arroz y humedales bajos.' },
];
