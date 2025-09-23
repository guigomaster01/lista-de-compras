// src/pages/About.jsx
export default function About() {
  return (
    <section className="card p-5 space-y-3">
      <h2 className="text-lg font-semibold">Sobre o projeto</h2>
      <p className="text-sm text-gray-700">
        Este app ajuda a planejar compras com preço unitário, quantidade e cálculo automático do total. 
        Funciona no modo <strong>Local</strong> (salvo no dispositivo) ou com <strong>API</strong> (MongoDB/Render).
      </p>
      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
        <li>Frontend: React + Vite + Tailwind</li>
        <li>Roteamento: react-router-dom</li>
        <li>Exportações: XLSX e PDF</li>
        <li>Backend (opcional): FastAPI + MongoDB Atlas</li>
      </ul>
      <p className="text-sm text-gray-700">
        Código organizado em páginas e componentes, com foco em performance mobile e acessibilidade.
      </p>
    </section>
  );
}
