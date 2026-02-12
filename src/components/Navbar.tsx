"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Car, Shield, FileCheck, BookOpen } from "lucide-react";

const navLinks = [
  { href: "/comparador-soap", label: "Comparador SOAP", icon: Shield },
  { href: "/multas-tag", label: "Multas TAG", icon: Car },
  { href: "/revision-tecnica", label: "Revisión Técnica", icon: FileCheck },
  { href: "/guias", label: "Guías", icon: BookOpen },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 glass-nav border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6" aria-label="Principal">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="flex items-center gap-2 text-electric-blue font-bold text-lg tracking-tight"
          >
            <Car className="w-6 h-6" aria-hidden />
            <span className="hidden sm:inline text-white">Portal Automotriz Chile 2026</span>
            <span className="sm:hidden text-white">Portal Automotriz 2026</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
            aria-expanded={open}
            aria-controls="nav-menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <ul
            id="nav-menu"
            className={`absolute top-14 left-0 right-0 glass-nav border-t border-white/10 md:border-0 md:static md:flex md:gap-1 ${
              open ? "block" : "hidden"
            }`}
          >
            {navLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 md:py-2 md:px-3 text-slate-300 hover:text-electric-blue hover:bg-white/5 rounded-xl transition"
                >
                  <Icon className="w-4 h-4" aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
