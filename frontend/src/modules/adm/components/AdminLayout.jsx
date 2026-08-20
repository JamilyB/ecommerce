import React, { useState } from 'react';
import { LayoutDashboard, Package, FolderTree, Boxes, ShoppingCart, Truck, RotateCcw, Ticket, Star, Users, Shield, Settings, Menu, X, ChevronRight, Store,} from 'lucide-react';

const navGroups = [
  {
    label: 'Visão Geral',
    items: [
      { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Catálogo',
    items: [
      { page: 'products', label: 'Produtos', icon: Package },
      { page: 'categories', label: 'Categorias', icon: FolderTree },
      { page: 'inventory', label: 'Estoque', icon: Boxes },
    ],
  },
  {
    label: 'Vendas',
    items: [
      { page: 'orders', label: 'Pedidos', icon: ShoppingCart },
      { page: 'deliveries', label: 'Entregas', icon: Truck },
      { page: 'returns', label: 'Devoluções', icon: RotateCcw },
      { page: 'coupons', label: 'Cupons', icon: Ticket },
    ],
  },
  {
    label: 'Comunidade',
    items: [
      { page: 'customers', label: 'Clientes', icon: Users },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { page: 'settings', label: 'Configurações', icon: Settings },
    ],
  },
];

export default function AdminLayout({ children }) {
  const [currentPage, setCurrentPage] = useState('admins');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page) => {
    setCurrentPage(page);
    setMobileOpen(false);
  };

  const sidebar = (
    <aside className="w-64 bg-[#56443F] text-white flex flex-col h-full shrink-0">

      {/* LOGO */}
      <div className="px-5 py-5 flex items-center gap-2.5 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-[#8B645A] flex items-center justify-center">
          <Store size={18} />
        </div>

        <div>
          <p className="font-serif text-base font-bold leading-none">
            JARMIN
          </p>

          <p className="text-[9px] tracking-[0.15em] uppercase text-[#E4C7B7] mt-0.5">
            Admin Panel
          </p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">

        {navGroups.map((group) => (
          <div key={group.label}>

            <p className="text-[9px] font-bold uppercase tracking-wider text-[#E4C7B7]/50 px-3 mb-2">
              {group.label}
            </p>

            <div className="space-y-0.5">

              {group.items.map((item) => {
                const Icon = item.icon;
                const active = currentPage === item.page;

                return (
                  <button
                    key={item.page}
                    onClick={() => handleNav(item.page)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      active
                        ? 'bg-[#8B645A] text-white shadow-sm'
                        : 'text-[#E4C7B7]/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={16} />

                    <span>{item.label}</span>

                    {active && (
                      <ChevronRight
                        size={14}
                        className="ml-auto"
                      />
                    )}
                  </button>
                );
              })}

            </div>
          </div>
        ))}

      </nav>

      {/* USUÁRIO VISUAL */}
      <div className="px-3 py-4 border-t border-white/10">

        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">

          <div className="w-9 h-9 rounded-full bg-[#8B645A] flex items-center justify-center text-xs font-bold">
            JB
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">
              Jamily Batista
            </p>

            <p className="text-[10px] text-[#E4C7B7]/60">
              Administrador
            </p>
          </div>

        </div>

      </div>

    </aside>
  );

  return (
    <div className="flex h-screen bg-[#F1F0E2] font-['Plus_Jakarta_Sans'] text-[#56443F]">

      {/* SIDEBAR DESKTOP */}
      <div className="hidden md:flex">
        {sidebar}
      </div>

      {/* SIDEBAR MOBILE */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          <div className="relative h-full animate-slide-in">
            {sidebar}
          </div>

        </div>
      )}

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* HEADER */}
        <header className="h-16 bg-white border-b border-[#E4C7B7]/30 flex items-center justify-between px-4 md:px-6 shrink-0">

          <div className="flex items-center gap-3">

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 hover:bg-[#E4C7B7]/20 rounded-lg"
            >
              <Menu size={20} />
            </button>

            <div className="hidden sm:block">

              <p className="text-xs text-[#A28776]">
                Painel Administrativo
              </p>

              <p className="text-sm font-bold">
                JARMIN | VELAS & AROMAS
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <a
              href="/"
              className="text-xs font-semibold text-[#56443F] hover:text-[#8B645A] transition-colors flex items-center gap-1.5"
            >
              <Store size={14} />

              <span className="hidden sm:inline">
                Ver Loja
              </span>
            </a>

            <div className="w-px h-6 bg-[#E4C7B7]/30" />

            <div className="w-8 h-8 rounded-full bg-[#8B645A] flex items-center justify-center text-white text-xs font-bold">
              JB
            </div>

          </div>

        </header>

        {/* CONTEÚDO */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>

      </div>

      {/* BOTÃO FECHAR MOBILE */}
      {mobileOpen && (
        <button
          onClick={() => setMobileOpen(false)}
          className="fixed top-4 right-4 z-[60] md:hidden p-2 bg-white rounded-lg shadow-lg"
        >
          <X size={20} />
        </button>
      )}

    </div>
  );
}