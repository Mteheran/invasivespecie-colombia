/**
 * ⚠️ DATOS DE EJEMPLO / REFERENCIALES — NO OFICIALES ⚠️
 *
 * La API de API Colombia expone únicamente:
 *   id, name, scientificName, commonNames, impact, manage, riskLevel, urlImage.
 *
 * El rediseño necesita además: categoría (animal/planta), hábitat, origen, año de
 * introducción, departamentos y cómo llegó cada especie. Como la API no los provee,
 * esta tabla local los aporta a modo de EJEMPLO para poder mostrar el diseño completo.
 *
 * Los valores curados aquí y cualquier valor inferido automáticamente DEBEN validarse
 * con una fuente oficial (Invemar, Instituto Humboldt, MinAmbiente) antes de publicar.
 *
 * La tabla se une por `id` al resultado de la API; para las especies sin entrada
 * curada se infiere `kind` y `habitat` a partir del texto como último recurso.
 */

export type SpeciesKind = 'animal' | 'plant';
export type HabitatKey = 'terrestre' | 'acuatico' | 'marino' | 'andino' | 'semiacuatico';

export interface SpeciesExtra {
  kind: SpeciesKind;
  habitat: string; // etiqueta visible
  habitatKey: HabitatKey;
  origin?: string;
  introducedYear?: string;
  departments?: string;
  arrival?: string; // texto de «Cómo llegó»
  /** true si la información proviene de la tabla curada; false si fue inferida. */
  curated: boolean;
}

/** Entradas curadas de ejemplo, unidas por el `id` real de la API. */
const CURATED: Record<number, Omit<SpeciesExtra, 'curated'>> = {
  1: {
    kind: 'plant',
    habitat: 'Andino',
    habitatKey: 'andino',
    origin: 'Australia',
    introducedYear: 'Siglo XX',
    departments: 'Cundinamarca, Boyacá',
    arrival: 'Introducida para reforestación y ornamentación en zonas de alta montaña, desde donde se dispersó a ecosistemas nativos.',
  },
  7: {
    kind: 'plant',
    habitat: 'Terrestre',
    habitatKey: 'terrestre',
    origin: 'África tropical',
    introducedYear: 'Años 70',
    departments: 'Meta, Casanare, Vichada',
    arrival: 'Sembrada masivamente como pasto de ganadería en la Orinoquía; hoy domina la sabana natural e impide el crecimiento de especies nativas.',
  },
  9: {
    kind: 'plant',
    habitat: 'Acuático',
    habitatKey: 'acuatico',
    origin: 'Cuenca amazónica',
    introducedYear: 'Siglo XX',
    departments: 'Córdoba, Valle del Cauca, Cundinamarca',
    arrival: 'Difundida como planta ornamental de estanques; escapó a ciénagas y embalses donde forma densas coberturas.',
  },
  19: {
    kind: 'plant',
    habitat: 'Terrestre',
    habitatKey: 'terrestre',
    origin: 'África',
    introducedYear: 'Siglo XX',
    departments: 'Meta, Casanare, Arauca',
    arrival: 'Introducida como pasto de corte para ganado en los Llanos; rebrota con fuerza tras las quemas y mantiene la sabana sin regeneración de bosque.',
  },
  39: {
    kind: 'plant',
    habitat: 'Terrestre',
    habitatKey: 'terrestre',
    origin: 'Centroamérica y el Caribe',
    introducedYear: 'Años 80',
    departments: 'Vichada, Meta',
    arrival: 'Plantado en la altillanura para reforestación comercial; se dispersa fuera de las plantaciones y altera el suelo y el régimen de incendios de la sabana.',
  },
  41: {
    kind: 'plant',
    habitat: 'Andino',
    habitatKey: 'andino',
    origin: 'Europa occidental',
    introducedYear: 'Mediados del siglo XX',
    departments: 'Cundinamarca, Boyacá',
    arrival: 'Introducido como cerca viva y para estabilizar taludes; hoy coloniza laderas de páramo y aumenta el riesgo de incendios.',
  },
  45: {
    kind: 'plant',
    habitat: 'Andino',
    habitatKey: 'andino',
    origin: 'África tropical',
    introducedYear: 'Siglo XX',
    departments: 'Cundinamarca, Antioquia',
    arrival: 'Introducida como enredadera ornamental; escapó de jardines y cubre la vegetación nativa en bordes de bosque y zonas urbanas de los Andes.',
  },
  55: {
    kind: 'animal',
    habitat: 'Terrestre',
    habitatKey: 'terrestre',
    origin: 'África oriental',
    introducedYear: 'Años 2000',
    departments: 'Quindío, Valle del Cauca, Amazonas',
    arrival: 'Llegó por comercio de mascotas y usos supuestamente medicinales; se dispersó por zonas húmedas y cultivos.',
  },
  64: {
    kind: 'animal',
    habitat: 'Acuático',
    habitatKey: 'acuatico',
    origin: 'Norteamérica',
    introducedYear: 'Siglo XX',
    departments: 'Valle del Cauca, Cauca',
    arrival: 'Introducida para acuicultura; ejemplares escapados depredan y desplazan anfibios nativos.',
  },
  69: {
    kind: 'animal',
    habitat: 'Acuático',
    habitatKey: 'acuatico',
    origin: 'Norteamérica',
    introducedYear: 'Siglo XX',
    departments: 'Boyacá, Cundinamarca, Nariño',
    arrival: 'Sembrada en lagunas y ríos fríos para pesca deportiva; compite con peces de altura nativos.',
  },
  71: {
    kind: 'animal',
    habitat: 'Semiacuático',
    habitatKey: 'semiacuatico',
    origin: 'África subsahariana',
    introducedYear: 'Años 80',
    departments: 'Antioquia, Bolívar, Córdoba',
    arrival: 'Cuatro ejemplares importados a finales de los años ochenta escaparon de una hacienda privada en Antioquia y se establecieron en el río Magdalena.',
  },
  72: {
    kind: 'animal',
    habitat: 'Marino',
    habitatKey: 'marino',
    origin: 'Indo-Pacífico',
    introducedYear: 'Años 2000',
    departments: 'San Andrés y Providencia, Magdalena, Bolívar',
    arrival: 'Asociado al comercio de acuarios; se estableció en arrecifes del Caribe sin depredadores naturales.',
  },
};

const ANIMAL_HINTS = [
  'pez', 'peces', 'caracol', 'rana', 'sapo', 'tortuga', 'ave', 'aves', 'mamífero',
  'reptil', 'anfibio', 'insecto', 'abeja', 'avispa', 'hormiga', 'mosca', 'molusco',
  'crustáceo', 'cangrejo', 'trucha', 'hipopótamo', 'rata', 'ratón', 'iguana',
  'depreda', 'depredador', 'fauna', 'animal',
];
const PLANT_HINTS = [
  'planta', 'árbol', 'arbol', 'arbusto', 'hierba', 'pasto', 'flor', 'semilla',
  'semillas', 'hojarasca', 'follaje', 'maleza', 'pino', 'acacia', 'retamo',
  'buchón', 'flora', 'germinación', 'plántula', 'plántulas', 'vegetación',
];

function inferKind(text: string): SpeciesKind {
  const t = text.toLowerCase();
  let animal = 0;
  let plant = 0;
  for (const w of ANIMAL_HINTS) if (t.includes(w)) animal++;
  for (const w of PLANT_HINTS) if (t.includes(w)) plant++;
  return animal > plant ? 'animal' : 'plant';
}

function inferHabitat(text: string): { habitat: string; habitatKey: HabitatKey } {
  const t = text.toLowerCase();
  if (/(marino|arrecife|coral|mar caribe|océano|oceano)/.test(t)) return { habitat: 'Marino', habitatKey: 'marino' };
  if (/(acuátic|acuatic|ciénaga|cienaga|humedal|río|rio|laguna|embalse|agua)/.test(t)) return { habitat: 'Acuático', habitatKey: 'acuatico' };
  if (/(páramo|paramo|andin|alta montaña|altiplano|montaña)/.test(t)) return { habitat: 'Andino', habitatKey: 'andino' };
  return { habitat: 'Terrestre', habitatKey: 'terrestre' };
}

/**
 * Devuelve los datos extra de una especie: usa la tabla curada cuando existe,
 * o infiere `kind`/`habitat` del texto como último recurso.
 */
export function getSpeciesExtra(specie: {
  id: number;
  name?: string;
  scientificName?: string;
  impact?: string;
}): SpeciesExtra {
  const curated = CURATED[specie.id];
  if (curated) return { ...curated, curated: true };

  const text = `${specie.name ?? ''} ${specie.scientificName ?? ''} ${specie.impact ?? ''}`;
  const kind = inferKind(text);
  const { habitat, habitatKey } = inferHabitat(text);
  return { kind, habitat, habitatKey, curated: false };
}

/** Nº de departamentos distintos citados en la tabla de ejemplo (dato referencial). */
export function exampleDepartmentCount(): number {
  const set = new Set<string>();
  for (const entry of Object.values(CURATED)) {
    if (!entry.departments) continue;
    for (const dept of entry.departments.split(',')) {
      const clean = dept.trim();
      if (clean) set.add(clean.toLowerCase());
    }
  }
  return set.size;
}

export function kindLabel(kind: SpeciesKind, lang: 'es' | 'en' = 'es'): string {
  if (lang === 'en') return kind === 'animal' ? 'Animal' : 'Plant';
  return kind === 'animal' ? 'Animal' : 'Planta';
}
