import { useState } from "react";
import {
  MessageSquare,
  X,
  Sparkles,
  Send,
} from "lucide-react";

export default function IAChat({ isOpen, onClose, onOpen }) {
  const [userMessage, setUserMessage] = useState("");

  const suggestions = [
    "Para relaxar",
    "Café da manhã",
    "Presente doce",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">

      {/* Botão flutuante */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="bg-[#56443F] hover:bg-[#8B645A] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 duration-300"
        >
          <MessageSquare
            size={20}
            className="text-[#E4C7B7]"
          />

          <span className="text-xs font-bold uppercase tracking-wider pr-1 hidden sm:inline">
            Iniciar Conversa
          </span>
        </button>
      )}

      {/* Janela do chat */}
      {isOpen && (
        <div className="w-[340px] sm:w-[400px] h-[500px] bg-[#F1F0E2] border border-[#E4C7B7] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">

          {/* Cabeçalho */}
          <div className="bg-white px-5 py-4 border-b border-[#E4C7B7]/40 flex justify-between items-center">

            <div className="flex items-center gap-2.5">

              <div className="bg-[#E4C7B7]/45 p-2 rounded-full text-[#8B645A]">
                <Sparkles size={16} />
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm text-[#56443F]">
                  Consultoria Virtual
                </h4>

                <p className="text-[10px] text-[#A28776] font-semibold">
                  Descubra sua vela ideal
                </p>
              </div>

            </div>

            <button
              onClick={onClose}
              className="text-[#56443F] hover:bg-[#E4C7B7]/20 p-1.5 rounded-full"
            >
              <X size={18} />
            </button>

          </div>

          {/* Área de mensagens */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 text-xs text-left">

            {/* Mensagem inicial */}
            <div className="flex justify-start">

              <div className="max-w-[80%] rounded-2xl rounded-tl-none px-4 py-3 bg-white border text-[#56443F]">

                <p className="leading-relaxed font-semibold">
                  Olá! ✨ Posso ajudar você a encontrar uma vela
                  que combine com o seu momento.
                </p>

              </div>

            </div>

            {/* Aviso de protótipo */}
            <div className="flex justify-start">

              <div className="max-w-[80%] rounded-2xl rounded-tl-none px-4 py-3 bg-white border text-[#56443F]">

                <p className="leading-relaxed font-semibold">
                  A recomendação por IA estará disponível em
                  uma próxima etapa do projeto.
                </p>

              </div>

            </div>

          </div>

          {/* Sugestões */}
          <div className="px-4 py-2 flex gap-1.5 overflow-x-auto bg-white/40 border-t border-[#E4C7B7]/20">

            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="flex-shrink-0 bg-white border border-[#E4C7B7]/50 text-[10px] font-bold px-2.5 py-1 rounded-full text-[#8B645A]"
              >
                {suggestion}
              </button>
            ))}

          </div>

          {/* Campo de mensagem */}
          <form
            onSubmit={(event) => event.preventDefault()}
            className="bg-white p-3 border-t border-[#E4C7B7]/40 flex gap-2"
          >

            <input
              type="text"
              placeholder="Ex: Quero um aroma doce para a sala..."
              value={userMessage}
              onChange={(event) =>
                setUserMessage(event.target.value)
              }
              className="w-full bg-[#FAF9F5] border border-[#E4C7B7]/50 rounded-lg px-3 py-2 text-xs outline-none text-[#56443F]"
            />

            <button
              type="submit"
              className="bg-[#56443F] hover:bg-[#8B645A] text-white p-2.5 rounded-lg transition-colors flex-shrink-0"
            >
              <Send size={14} />
            </button>

          </form>

        </div>
      )}

    </div>
  );
}