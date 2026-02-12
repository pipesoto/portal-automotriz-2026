/**
 * Genera src/data/plantasPRT.json desde el Excel oficial de prt.cl
 * Uso: npm install && npm run parse-prt
 * Archivo: Tarifas_y_Horarios_Enero_2026.xlsx en la raíz del proyecto
 */

const fs = require("fs");
const path = require("path");

function normalizar(str) {
  if (str == null || typeof str !== "string") return "";
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function findCol(headers, ...opciones) {
  for (const opcion of opciones) {
    const i = headers.findIndex((h) => normalizar(String(h)).includes(opcion));
    if (i >= 0) return i;
  }
  return -1;
}

function run() {
  let XLSX;
  try {
    XLSX = require("xlsx");
  } catch (e) {
    console.error("Ejecuta primero: npm install");
    process.exit(1);
  }

  const root = path.join(__dirname, "..");
  const excelPath = path.join(root, "Tarifas_y_Horarios_Enero_2026.xlsx");
  if (!fs.existsSync(excelPath)) {
    console.error("No se encontró Tarifas_y_Horarios_Enero_2026.xlsx en la raíz del proyecto.");
    process.exit(1);
  }

  const workbook = XLSX.readFile(excelPath);
  const allPlantas = [];
  const regionesSet = new Set();
  const comunasByRegion = {};

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const raw = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
    if (raw.length < 2) continue;

    // Buscar fila de encabezados (prt.cl suele tener título en filas 0-3 y headers en fila 4)
    let headerRowIndex = 0;
    for (let r = 0; r < Math.min(15, raw.length); r++) {
      const row = raw[r].map((h) => String(h ?? "").trim());
      const idxR = row.findIndex((h) => normalizar(h).includes("region") || normalizar(h).includes("región"));
      const idxC = row.findIndex((h) => normalizar(h).includes("comuna"));
      if (idxR >= 0 && idxC >= 0) {
        headerRowIndex = r;
        break;
      }
    }

    const headers = raw[headerRowIndex].map((h) => String(h ?? "").trim().replace(/\r\n/g, " "));
    const idxRegion = findCol(headers, "region", "región", "regiones");
    const idxComuna = findCol(headers, "comuna", "comunas");
    const idxConcesionaria = findCol(headers, "concesiones", "concesionaria", "concesionario", "razon social", "planta", "concesion");
    const idxDireccion = findCol(headers, "direcciones", "direccion", "dirección", "direccion_planta", "domicilio");
    const idxTelefono = findCol(headers, "telefono", "teléfono", "fono", "contacto", "telefono_planta");
    const idxHorario = findCol(headers, "horarios", "horario", "atencion", "atención", "horario_atencion");

    // Columnas de tarifas: Excel prt.cl tiene 3 tipos (Autos/camionetas, Camiones y Buses, Taxis)
    const tarifaMatches = headers
      .map((h, colIdx) => ({ h: String(h || "").trim(), colIdx }))
      .filter(({ h }) => h && (normalizar(h).includes("tarifa") || normalizar(h).includes("precio") || normalizar(h).includes("valor")));
    const firstTarifaIdx = tarifaMatches.length ? Math.min(...tarifaMatches.map((m) => m.colIdx)) : -1;
    const tarifaCols = [];
    if (firstTarifaIdx >= 0) {
      const labels = ["Autos, camionetas", "Camiones y Buses", "Taxis"];
      for (let k = 0; k < 3; k++) {
        tarifaCols.push({
          h: labels[k],
          colIdx: firstTarifaIdx + k,
        });
      }
    }

    for (let i = headerRowIndex + 1; i < raw.length; i++) {
      const row = raw[i];
      const region = idxRegion >= 0 ? String(row[idxRegion] ?? "").trim() : "";
      const comuna = idxComuna >= 0 ? String(row[idxComuna] ?? "").trim() : "";
      const concesionaria = idxConcesionaria >= 0 ? String(row[idxConcesionaria] ?? "").trim() : "";
      const direccion = idxDireccion >= 0 ? String(row[idxDireccion] ?? "").trim() : "";
      let telefono = idxTelefono >= 0 ? String(row[idxTelefono] ?? "").trim() : "";
      const horario = idxHorario >= 0 ? String(row[idxHorario] ?? "").trim() : "";

      const tarifas = {};
      for (const { h, colIdx } of tarifaCols) {
        const val = row[colIdx];
        if (val !== undefined && val !== null && String(val).trim() !== "") {
          tarifas[h] = String(val).trim();
        }
      }

      if (!concesionaria && !direccion && !comuna && !region) continue;

      telefono = telefono || null;
      const id = `prt-${sheetName}-${i}`;
      allPlantas.push({
        id,
        region,
        comuna,
        concesionaria: concesionaria || "Planta de Revisión Técnica",
        direccion: direccion || "Consulte en prt.cl",
        telefono,
        horario: horario || "L-V 8:00-17:00",
        tarifas: Object.keys(tarifas).length ? tarifas : null,
      });

      if (region) {
        regionesSet.add(region);
        if (!comunasByRegion[region]) comunasByRegion[region] = new Set();
        if (comuna) comunasByRegion[region].add(comuna);
      }
    }
  }

  const regiones = Array.from(regionesSet).sort((a, b) => a.localeCompare(b, "es"));
  const comunasByRegionArr = {};
  regiones.forEach((r) => {
    comunasByRegionArr[r] = Array.from(comunasByRegion[r] || []).sort((a, b) => a.localeCompare(b, "es"));
  });

  const out = {
    fuente: "prt.cl - Tarifas_y_Horarios_Enero_2026.xlsx",
    regiones,
    comunasByRegion: comunasByRegionArr,
    plantas: allPlantas,
  };

  const outPath = path.join(root, "src", "data", "plantasPRT.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
  console.log("OK: " + allPlantas.length + " plantas → src/data/plantasPRT.json");
  console.log("Regiones:", regiones.length, "→", regiones.slice(0, 5).join(", ") + (regiones.length > 5 ? "..." : ""));
}

run();
