/**
 * Plantas de Revisión Técnica en Chile.
 * Fuentes: MTT, revisionvehicular.cl, revisiontecnica-chile.com
 * Listado completo oficial: https://www.mtt.gob.cl
 */

export interface PlantaRevisionTecnica {
  id: string;
  regionId: string;
  comuna: string;
  nombre: string;
  direccion: string;
  telefono: string | null;
  horario: string;
  operador: string;
}

export interface RegionPRT {
  id: string;
  nombre: string;
}

export const REGIONES_PRT: RegionPRT[] = [
  { id: "rm", nombre: "Región Metropolitana" },
  { id: "valparaiso", nombre: "Región de Valparaíso" },
  { id: "biobio", nombre: "Región del Biobío" },
  { id: "araucania", nombre: "Región de La Araucanía" },
  { id: "loslagos", nombre: "Región de Los Lagos" },
  { id: "antofagasta", nombre: "Región de Antofagasta" },
  { id: "coquimbo", nombre: "Región de Coquimbo" },
  { id: "maule", nombre: "Región del Maule" },
  { id: "ohiggins", nombre: "Región de O'Higgins" },
  { id: "tarapaca", nombre: "Región de Tarapacá" },
  { id: "arica", nombre: "Región de Arica y Parinacota" },
  { id: "atacama", nombre: "Región de Atacama" },
  { id: "nuble", nombre: "Región de Ñuble" },
  { id: "rios", nombre: "Región de Los Ríos" },
  { id: "aysen", nombre: "Región de Aysén" },
  { id: "magallanes", nombre: "Región de Magallanes" },
];

export const PLANTAS_PRT: PlantaRevisionTecnica[] = [
  // Región Metropolitana
  { id: "1", regionId: "rm", comuna: "San Ramón", nombre: "Applus Chile S.A.", direccion: "Av. Américo Vespucio 1460", telefono: null, horario: "L-V 8:00-17:00, S 8:00-17:00", operador: "Applus" },
  { id: "2", regionId: "rm", comuna: "San Joaquín", nombre: "TÜV Rheinland Andino S.A.", direccion: "Av. Presidente Salvador Allende 143", telefono: null, horario: "L-V 8:00-17:30, S 7:30-14:00", operador: "TÜV Rheinland" },
  { id: "3", regionId: "rm", comuna: "San Joaquín", nombre: "Applus Chile S.A.", direccion: "Av. Departamental 390", telefono: null, horario: "L-V 8:00-17:00, S 8:00-17:00", operador: "Applus" },
  { id: "4", regionId: "rm", comuna: "Quilicura", nombre: "TÜV Rheinland Andino S.A.", direccion: "Cañaveral 500", telefono: null, horario: "L-V 7:30-17:00, S 7:30-14:00", operador: "TÜV Rheinland" },
  { id: "5", regionId: "rm", comuna: "Quilicura", nombre: "San Dámaso S.A.", direccion: "Av. Presidente Eduardo Frei Montalva 9500", telefono: null, horario: "L-V 8:00-17:00, S 7:00-16:00", operador: "San Dámaso" },
  { id: "6", regionId: "rm", comuna: "Quilicura", nombre: "Chilena de Revisiones Técnicas Ltda.", direccion: "Senador Jaime Guzmán 96", telefono: null, horario: "L-V 7:00-21:00, S 7:00-16:00", operador: "Chilena de Revisiones" },
  { id: "7", regionId: "rm", comuna: "Quilicura", nombre: "Applus Chile S.A.", direccion: "Galvarino 9430", telefono: null, horario: "L-V 8:00-17:00, S 8:30-16:30", operador: "Applus" },
  { id: "8", regionId: "rm", comuna: "Renca", nombre: "Planta de Revisión Técnica Renca", direccion: "Av. Principal (consulte en MTT)", telefono: null, horario: "L-V 8:00-17:00", operador: "Varios" },
  { id: "9", regionId: "rm", comuna: "Peñalolén", nombre: "Planta de Revisión Técnica Peñalolén", direccion: "Consulte dirección en MTT", telefono: null, horario: "L-V 8:00-17:00", operador: "Varios" },
  { id: "10", regionId: "rm", comuna: "Pudahuel", nombre: "Planta de Revisión Técnica Pudahuel", direccion: "Consulte dirección en MTT", telefono: null, horario: "L-V 8:00-17:00", operador: "Varios" },
  // Valparaíso
  { id: "11", regionId: "valparaiso", comuna: "Valparaíso", nombre: "Planta de Revisión Técnica Valparaíso", direccion: "Consulte dirección en MTT o revisión técnica local", telefono: null, horario: "L-V 8:00-17:00", operador: "Varios" },
  { id: "12", regionId: "valparaiso", comuna: "Viña del Mar", nombre: "Planta de Revisión Técnica Viña del Mar", direccion: "Consulte dirección en MTT", telefono: null, horario: "L-V 8:00-17:00", operador: "Varios" },
  // Biobío
  { id: "13", regionId: "biobio", comuna: "Concepción", nombre: "Planta de Revisión Técnica Concepción", direccion: "Consulte dirección en MTT", telefono: null, horario: "L-V 8:00-17:00", operador: "Varios" },
  // La Araucanía
  { id: "14", regionId: "araucania", comuna: "Temuco", nombre: "Planta de Revisión Técnica Temuco", direccion: "Consulte dirección en MTT", telefono: null, horario: "L-V 8:00-17:00", operador: "Varios" },
  // Antofagasta
  { id: "15", regionId: "antofagasta", comuna: "Antofagasta", nombre: "Planta de Revisión Técnica Antofagasta", direccion: "Consulte dirección en MTT", telefono: null, horario: "L-V 8:00-17:00", operador: "Varios" },
];

export const MTT_URL = "https://www.mtt.gob.cl";
export const MTT_PRT_CONSULTA = "https://www.mtt.gob.cl/consulta-publica-bases-prt";
