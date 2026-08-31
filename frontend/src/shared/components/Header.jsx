import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingBag,
  User,
  History,
  Settings,
  Flame,
} from "lucide-react";

import CartDrawer from "../../modules/vendas/components/CartDrawer";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    setAccountMenuOpen(false);
  };

  const toggleAccountMenu = () => {
    setAccountMenuOpen((current) => !current);
    setCartOpen(false);
  };

  const toggleCart = () => {
    setCartOpen((current) => !current);
    setAccountMenuOpen(false);
  };

  return (
    <>
      {/* Barra promocional */}
      <div className="bg-[#E4C7B7] text-[#56443F] py-2 px-4 text-center text-[11px] font-bold tracking-wide flex justify-center items-center gap-2">
        <Flame size={12} className="text-[#8B645A]" />
        <span>Velas aromáticas esculpidas</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 bg-[#F1F0E2]/90 backdrop-blur-md z-40 border-b border-[#E4C7B7]/25 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">

          {/* Menu mobile */}
          <button
            className="md:hidden text-[#56443F] p-2 hover:bg-[#E4C7B7]/20 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>

          {/* Navegação desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-wider uppercase text-[#56443F]">
            <button
              onClick={() => handleNavigation("/catalogo")}
              className="hover:text-[#8B645A] transition-colors py-2"
            >
              Coleções de Velas
            </button>
          </nav>

          {/* Logo */}
          <button
            onClick={() => handleNavigation("/catalogo")}
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer text-center"
          >
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#56443F]">
              JASMIN
            </h1>

            <p className="text-[9px] tracking-[0.2em] font-bold uppercase text-[#A28776] -mt-0.5">
              Velas & Aromas
            </p>
          </button>

          {/* Ações */}
          <div className="flex items-center space-x-2 md:space-x-3 relative">

            {/* Cadastro */}
            <button
              onClick={() => handleNavigation("/cadastrar")}
              className="hidden md:block text-xs font-bold text-[#56443F] hover:text-[#8B645A] transition-colors"
            >
              Cadastrar
            </button>

            {/* Conta */}
            <div className="relative">
              <button
                onClick={toggleAccountMenu}
                className="p-2.5 hover:bg-[#E4C7B7]/20 rounded-full text-[#56443F] transition-all flex items-center gap-1 text-xs font-bold"
                title="Minha Conta"
                aria-label="Minha conta"
              >
                <User size={18} />

                <span className="hidden lg:inline text-[11px] tracking-wider uppercase">
                  Minha Conta
                </span>
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#FAF9F5] border border-[#E4C7B7]/40 rounded-xl shadow-lg z-50 p-2 text-left">

                  <div className="px-3 py-2 border-b border-[#E4C7B7]/20">
                    <p className="text-[10px] uppercase tracking-wider text-[#A28776] font-bold">
                      Minha conta
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigation("/pedidos")}
                    className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg hover:bg-[#E4C7B7]/25 text-[#56443F] transition-colors flex items-center gap-2"
                  >
                    <History size={14} />
                    Meus Pedidos
                  </button>

                  <button
                    onClick={() => handleNavigation("/perfil")}
                    className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg hover:bg-[#E4C7B7]/25 text-[#56443F] transition-colors flex items-center gap-2"
                  >
                    <Settings size={14} className="text-[#8B645A]" />
                    Meu Perfil
                  </button>

                </div>
              )}
            </div>

            {/* Sacola */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 hover:bg-[#E4C7B7]/20 rounded-full text-[#56443F] transition-colors"
              aria-label="Sacola"
              title="Sacola"
            >
              <ShoppingBag size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#8B645A] rounded-full" />
            </button>

          </div>
        </div>
      </header>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#F1F0E2] z-50 flex flex-col p-8">

          <div className="flex justify-between items-center mb-12">
            <button
              onClick={() => handleNavigation("/catalogo")}
              className="font-serif text-2xl font-bold text-[#56443F]"
            >
              JASMIN
            </button>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#56443F] p-2 hover:bg-[#E4C7B7]/20 rounded-full"
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-4 text-lg font-serif">

            <button
              onClick={() => handleNavigation("/catalogo")}
              className="text-left py-2.5 border-b border-[#E4C7B7]/20 hover:text-[#8B645A] text-[#56443F]"
            >
              Coleção de Velas
            </button>

            <button
              onClick={() => handleNavigation("/pedidos")}
              className="text-left py-2.5 border-b border-[#E4C7B7]/20 hover:text-[#8B645A] text-[#56443F]"
            >
              Meus Pedidos
            </button>

            <button
              onClick={() => handleNavigation("/perfil")}
              className="text-left py-2.5 border-b border-[#E4C7B7]/20 hover:text-[#8B645A] text-[#56443F]"
            >
              Meu Perfil
            </button>

            <button
              onClick={() => handleNavigation("/cadastrar")}
              className="text-left py-2.5 border-b border-[#E4C7B7]/20 hover:text-[#8B645A] text-[#56443F]"
            >
              Cadastrar
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCartOpen(true);
              }}
              className="text-left py-2.5 border-b border-[#E4C7B7]/20 hover:text-[#8B645A] text-[#56443F]"
            >
              Sacola
            </button>

          </nav>
        </div>
      )}

      {/* Carrinho */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => navigate("/comprar")}
      />
    </>
  );
}
