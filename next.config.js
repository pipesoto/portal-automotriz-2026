/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/comparador-soap", destination: "/#soap", permanent: true },
      { source: "/multas-tag", destination: "/#multas", permanent: true },
      { source: "/revision-tecnica", destination: "/#revision-tecnica", permanent: true },
      { source: "/guias", destination: "/#guias", permanent: true },
    ];
  },
};

module.exports = nextConfig;
