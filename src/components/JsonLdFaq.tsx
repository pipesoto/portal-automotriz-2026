/**
 * JSON-LD FAQ sobre Ley Jacinta y vencimientos permiso de circulación 2026
 * Mejora SEO y rich snippets en Google
 */
export default function JsonLdFaq() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué es la Ley Jacinta en Chile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La Ley Jacinta es la normativa que regula el SOAP (Seguro Obligatorio de Accidentes Personales) y establece las obligaciones de los conductores en Chile respecto a seguros, revisión técnica y documentación vehicular.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuándo vence el permiso de circulación 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El permiso de circulación 2026 se paga según el último dígito de la patente del vehículo. Cada dígito (0-9) tiene fechas asignadas durante el año. Consulte el calendario de Revisión Técnica para conocer su fecha según su patente.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo consultar multas de tránsito por patente en Chile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Puede consultar multas ingresando su patente en formato chileno (AA-BB-11 o AABB11) en el Portal del Registro Civil o en plataformas autorizadas por el MTT. Este portal le orienta con las herramientas oficiales.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué aseguradoras ofrecen SOAP en Chile 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Entre las aseguradoras que ofrecen SOAP en Chile están Consorcio, HDI, Sura, SoapBomberos y Falabella Seguros. Compare precios según tipo de vehículo: auto, moto, camioneta o pesados.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
