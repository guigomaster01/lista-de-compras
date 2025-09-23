// src/App.jsx
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Donate from "./pages/Donate.jsx";

export default function App() {
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-black/5">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link to="/" className="text-lg md:text-xl font-semibold tracking-tight">
            Lista de Compras
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-1 rounded-lg border border-black/10 hover:bg-black/5 ${
                  isActive ? "bg-black/5" : ""
                }`
              }
            >
              Início
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-1 rounded-lg border border-black/10 hover:bg-black/5 ${
                  isActive ? "bg-black/5" : ""
                }`
              }
            >
              Sobre
            </NavLink>
            <NavLink
              to="/donate"
              className={({ isActive }) =>
                `px-3 py-1 rounded-lg border border-black/10 hover:bg-black/5 ${
                  isActive ? "bg-black/5" : ""
                }`
              }
            >
              Doar
            </NavLink>
          </nav>
        </div>
      </header>

      {/* ROTAS */}
      <main className="max-w-3xl mx-auto px-4 py-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
          {/* 404 simples */}
          <Route path="*" element={<div className="card p-6">Página não encontrada.</div>} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="sticky bottom-0 border-t border-black/5 bg-white/80 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between pb-[env(safe-area-inset-bottom)] text-sm text-gray-500">
          <span>© {new Date().getFullYear()} Lista de Compras</span>
          <a
            href="https://lista-de-compras-ten-hazel.vercel.app"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Web
          </a>
        </div>
      </footer>
    </div>
  );
}