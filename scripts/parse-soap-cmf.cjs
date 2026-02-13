/**
 * Genera src/data/preciosSoap.json desde el Excel de precios SOAP de la CMF.
 * Uso: 1) Descargue el Excel desde https://www.cmfchile.cl/portal/principal/613/w3-article-20321.html
 *      2) Guarde el archivo en la raíz como Precios_SOAP_CMF.xlsx
 *      3) npm run parse-soap
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

function parseNum(val) {
  if (val == null || val === "") return null;
  const n = Number(String(val).replace(/[^\d.-]/g, "").trim());
  return isNaN(n) ? null : Math.round(n);
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
  const defaultName = "Precios_SOAP_CMF.xlsx";
  let excelPath = path.join(root, defaultName);
  if (!fs.existsSync(excelPath)) {
    const dir = fs.readdirSync(root);
    const found = dir.find((f) => /soap|precios.*cmf/i.test(f) && f.endsWith(".xlsx"));
    if (found) excelPath = path.join(root, found);
  }
  if (!fs.existsSync(excelPath)) {
    console.error("No se encontró " + defaultName + " en la raíz. Descargue el Excel de precios SOAP desde la CMF.");
    process.exit(1);
  }

  const workbook = XLSX.readFile(excelPath);
  const filas = [];

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const raw = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
    if (raw.length < 2) continue;

    let headerRowIndex = 0;
    for (let r = 0; r < Math.min(10, raw.length); r++) {
      const row = raw[r].map((h) => String(h ?? "").trim());
      const idxA = findCol(row, "aseguradora", "compania", "compañía", "empresa", "nombre", "compan");
      const idxAuto = findCol(row, "auto", "automovil", "liviano", "vehiculo");
      if (idxA >= 0 && (idxAuto >= 0 || row.some((c) => parseNum(c) > 1000 && parseNum(c) < 500000))) {
        headerRowIndex = r;
        break;
      }
    }

    const headers = raw[headerRowIndex].map((h) => String(h ?? "").trim());
    const idxAseguradora = findCol(headers, "aseguradora", "compania", "compañía", "empresa", "nombre");
    const idxAuto = findCol(headers, "auto", "automovil", "liviano", "vehiculo", "particular");
    const idxMoto = findCol(headers, "moto", "motocicleta");
    const idxCamioneta = findCol(headers, "camioneta");
    const idxPesados = findCol(headers, "pesado", "bus", "carga");

    if (idxAseguradora < 0) continue;

    for (let i = headerRowIndex + 1; i < raw.length; i++) {
      const row = raw[i];
      const aseguradora = idxAseguradora >= 0 ? String(row[idxAseguradora] ?? "").trim() : "";
      if (!aseguradora) continue;

      const auto = parseNum(row[idxAuto]);
      const moto = parseNum(row[idxMoto]);
      const camioneta = parseNum(row[idxCamioneta]);
      const pesados = parseNum(row[idxPesados]);
      if (!auto && !moto && !camioneta && !pesados) continue;

      filas.push({
        aseguradora,
        auto: auto ?? 0,
        moto: moto ?? 0,
        camioneta: camioneta ?? 0,
        pesados: pesados ?? 0,
      });
    }
    if (filas.length > 0) break;
  }

  const out = {
    fuente: "CMF Chile - Precios SOAP",
    actualizado: new Date().toISOString().slice(0, 10),
    precios: filas,
  };

  const outPath = path.join(root, "src", "data", "preciosSoap.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
  console.log("OK: " + filas.length + " aseguradoras → src/data/preciosSoap.json");
}

run();
