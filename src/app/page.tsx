'use client';

import React, { useState } from 'react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  badge?: string;
}

const SAMPLE_GADGETS: Product[] = [
  {
    id: '1',
    title: 'CyberShield Hardware Token',
    description: 'Hardware FIDO2/WebAuthn authenticator for secure multi-factor logins.',
    price: 49.99,
    stock: 15,
    badge: 'Security Pick',
  },
  {
    id: '2',
    title: 'Encrypted USB Drive 128GB',
    description: 'AES 256-bit hardware-encrypted drive with keypad access control.',
    price: 89.99,
    stock: 8,
    badge: 'Popular',
  },
  {
    id: '3',
    title: 'Signal Shield Faraday Bag',
    description: 'RF blocking pouch for mobile devices, key fobs, and hardware wallets.',
    price: 24.50,
    stock: 22,
  },
  {
    id: '4',
    title: 'Flipper Zero Cyber Tool',
    description: 'Multi-tool device for tech enthusiasts, penetration testing, and radio analysis.',
    price: 169.00,
    stock: 3,
    badge: 'Limited Stock',
  },
];

export default function Storefront() {
  const [cartCount, setCartCount] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    setNotification(`Added "${productName}" to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
              O
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Orbit <span className="text-indigo-400">Gadgets</span>
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6 text-sm text-slate-400 font-medium">
              <a href="#catalog" className="hover:text-white transition">Products</a>
              <a href="#api-status" className="hover:text-white transition">API Status</a>
            </nav>
            <div className="relative">
              <button className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm border border-slate-700 transition">
                <span>🛒 Cart</span>
                {cartCount > 0 && (
                  <span className="bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-block bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 text-xs px-3 py-1 rounded-full mb-4 font-mono">
          NEXT.JS + PRISMA ORM BACKEND
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Tech & Security Hardware Store
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
          Explore curated hardware gadgets backed by clean REST API routes and a PostgreSQL database layer.
        </p>
      </section>

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-xl text-sm font-medium border border-indigo-400 z-50 animate-bounce">
          {notification}
        </div>
      )}

      {/* Product Catalog Grid */}
      <main id="catalog" className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-slate-200 mb-6">Available Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_GADGETS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-indigo-500/50 transition shadow-lg group"
            >
              <div>
                {item.badge && (
                  <span className="bg-indigo-900/50 text-indigo-300 border border-indigo-700/40 text-xs px-2 py-0.5 rounded font-mono">
                    {item.badge}
                  </span>
                )}
                <h3 className="font-semibold text-lg text-white mt-3 group-hover:text-indigo-300 transition">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block font-mono">PRICE</span>
                  <span className="text-xl font-bold text-white">${item.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleAddToCart(item.title)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition active:scale-95 shadow-md shadow-indigo-600/20"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* API Endpoint Verification Banner */}
        <div id="api-status" className="mt-16 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-mono text-indigo-400 uppercase tracking-wider mb-3">
            Backend API Endpoints Loaded
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-slate-950 p-3 rounded border border-slate-800 text-slate-300">
              <span className="text-emerald-400 font-bold">POST</span> /api/auth/register
            </div>
            <div className="bg-slate-950 p-3 rounded border border-slate-800 text-slate-300">
              <span className="text-sky-400 font-bold">GET</span> /api/products
            </div>
            <div className="bg-slate-950 p-3 rounded border border-slate-800 text-slate-300">
              <span className="text-emerald-400 font-bold">POST</span> /api/checkout
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500 font-mono">
        Orbit Gadgets — Next.js & Prisma Architecture
      </footer>
    </div>
  );
}
