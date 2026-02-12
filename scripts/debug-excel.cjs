/**
 * Muestra la estructura del Excel para ajustar el parser.
 * Ejecutar: node scripts/debug-excel.cjs
 */

const fs = require("fs");
const path = require("path");

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
  console.error("No se encontró Tarifas_y_Horarios_Enero_2026.xlsx en la raíz.");
  process.exit(1);
}

const workbook = XLSX.readFile(excelPath);
const lines = [];

lines.push("=== HOJAS DEL EXCEL ===");
lines.push(workbook.SheetNames.join(", "));
lines.push("");

for (const sheetName of workbook.SheetNames) {
  const sheet = workbook.Sheets[sheetName];
  const raw = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
  lines.push("--- Hoja: " + sheetName + " (filas: " + raw.length + ") ---");
  for (let r = 0; r < Math.min(5, raw.length); r++) {
    const row = raw[r].map((c) => String(c ?? "").trim());
    lines.push("Fila " + r + ": " + JSON.stringify(row));
  }
  lines.push("");
}

const outPath = path.join(root, "excel-estructura.txt");
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("Estructura guardada en: excel-estructura.txt");
console.log(lines.join("\n"));
