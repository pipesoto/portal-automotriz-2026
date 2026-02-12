# Portal Automotriz Chile 2026

Web App en **Next.js (App Router)** y **Tailwind CSS** orientada a utilidad para conductores en Chile: SOAP, multas de tránsito, revisión técnica y TAG. Diseñada para **mobile-first** y preparada para **Google AdSense**.

## Características

- **Buscador de multas**: validación de patente chilena (AA-BB-11 o AABB11).
- **Comparador SOAP 2026**: selector por tipo de vehículo (Auto, Moto, Camioneta, Pesados) y tabla de precios nacional (Consorcio, HDI, Sura, SoapBomberos, Falabella).
- **Hoy te toca**: calendario de Revisión Técnica según último dígito de la patente.
- **SEO**: metadata dinámica, JSON-LD FAQ (Ley Jacinta, permiso circulación 2026), enlaces a fuentes oficiales (Registro Civil, MTT, TGR).
- **AdSense**: placeholders en header, entre secciones y banner flotante en móvil.

## Diseño

- Colores: blanco, gris claro (`#f5f5f5`) y azul `#0038a8`.
- Estética limpia y tipo utilidad pública.
- Mobile-first; navegación responsive con menú hamburguesa.

## Requisitos

- Node.js 18+
- npm

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Build para producción

```bash
npm run build
npm start
```

## Estructura principal

- `src/app/` – App Router: `layout.tsx`, `page.tsx`, rutas (comparador-soap, multas-tag, revision-tecnica, guias).
- `src/components/` – Navbar, HeroDashboard, TablaPreciosSOAP, HoyTeToca, AdPlaceholder, Footer, JsonLdFaq.
- `src/lib/patente.ts` – Validación y normalización de patente chilena.

## AdSense

Reemplazar los componentes `AdPlaceholder` por los bloques de Google AdSense cuando la web esté aprobada. Posiciones: `header`, `between`, `floating-mobile`.

## Licencia

Uso informativo. No somos un organismo oficial.
