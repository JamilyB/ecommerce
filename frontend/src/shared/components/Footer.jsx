import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email) {
      setMessage("Digite seu e-mail.");
      return;
    }

    setMessage("Inscrição confirmada!");
    setEmail("");
  };

  const handleNavigation = (page) => {
    console.log(`Navegação para: ${page}`);
  };

  return (
    <footer className="bg-white border-t border-[#E4C7B7]/30 py-12 px-6 md:px-12 mt-auto text-left text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">

        {/* Newsletter */}
        <div className="md:col-span-5 space-y-3">
          <h3 className="font-serif text-lg font-bold text-[#56443F]">
            Receba novidades
          </h3>

          <p className="text-[#A28776] leading-relaxed">
            Inscreva-se para ser notificado sobre as fornadas exclusivas de
            nossas velas e novidades aromáticas.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex border-b border-[#E4C7B7] pb-1"
          >
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Seu e-mail..."
              className="bg-transparent w-full outline-none py-1 text-[#56443F]"
            />

            <button
              type="submit"
              className="text-[#56443F] hover:text-[#8B645A] transition-colors"
              aria-label="Inscrever e-mail"
            >
              <ArrowRight size={14} />
            </button>
          </form>

          {message && (
            <p className="text-[10px] text-[#8B645A] font-semibold">
              {message}
            </p>
          )}
        </div>

        {/* Sobre */}
        <div className="md:col-span-3 space-y-2">
          <h4 className="text-[10px] font-bold uppercase text-[#8B645A]">
            Sobre
          </h4>

          <ul className="space-y-1.5 text-[#A28776] font-semibold">
            <li>
              <button
                onClick={() => handleNavigation("shop")}
                className="hover:text-[#8B645A] transition-colors"
              >
                Ver Coleções
              </button>
            </li>

            <li>
              <button
                onClick={() => handleNavigation("orders")}
                className="hover:text-[#8B645A] transition-colors"
              >
                Meus Pedidos
              </button>
            </li>

            <li>
              <button
                onClick={() => handleNavigation("tracking")}
                className="hover:text-[#8B645A] transition-colors"
              >
                Rastrear Encomenda
              </button>
            </li>

            <li>
              <button
                onClick={() => handleNavigation("returns")}
                className="hover:text-[#8B645A] transition-colors"
              >
                Trocas & Devoluções
              </button>
            </li>
          </ul>
        </div>

        {/* Atendimento */}
        <div className="md:col-span-4 space-y-2 text-[#A28776] font-semibold">
          <h4 className="text-[10px] font-bold uppercase text-[#8B645A]">
            Atendimento
          </h4>

          <p>
            Loja localizada em Mogi das Cruzes, SP
            <br />
            contato@jasminvelas.com.br
          </p>

          <div className="pt-2 text-[9px] text-[#BBAA91] uppercase">
            © {new Date().getFullYear()} JASMIN VELAS. TODOS OS DIREITOS
            RESERVADOS.
          </div>

          <button
            onClick={() => handleNavigation("admin")}
            className="inline-block pt-1 text-[9px] text-[#BBAA91] hover:text-[#8B645A] transition-colors uppercase"
          >
            Painel Administrativo
          </button>
        </div>
      </div>
    </footer>
  );
}