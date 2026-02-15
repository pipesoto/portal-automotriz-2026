/**
 * JSON-LD WebSite para SEO: ayuda a Google a mostrar sitelinks y entender el sitio
 */
export default function JsonLdWebSite() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Portal Automotriz Chile 2026",
    alternateName: "Portal Automotriz Chile",
    url: "https://www.portal-automotriz.cl",
    description:
      "Consulta multas por patente, compara precios SOAP 2026 y revisión técnica Chile. Multas de tránsito, SOAP y calendario de revisión técnica en un solo lugar.",
    inLanguage: "es-CL",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
