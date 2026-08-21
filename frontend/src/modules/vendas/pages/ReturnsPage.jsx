import { useState } from "react";
import { Check, Package, ArrowRight,ChevronLeft,} from "lucide-react";

import { ordersMock } from "../../adm/mocks/ordersMock";

export default function ReturnsPage() {
  const [step, setStep] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [reasons, setReasons] = useState({});
  const [requestSent, setRequestSent] = useState(false);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setSelectedItems([]);
    setReasons({});
    setStep(2);
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((previous) =>
      previous.includes(itemId)
        ? previous.filter((id) => id !== itemId)
        : [...previous, itemId]
    );
  };

  const handleReasonChange = (itemId, reason) => {
    setReasons((previous) => ({
      ...previous,
      [itemId]: reason,
    }));
  };

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      return;
    }

    setRequestSent(true);
    setStep(3);
  };

  if (requestSent) {
    return (
      <div className="animate-fade-in max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 border border-[#E4C7B7]/30 text-center space-y-6">

          <div className="w-14 h-14 bg-[#E4C7B7]/30 rounded-full flex items-center justify-center mx-auto">
            <Check size={26} className="text-[#8B645A]" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-[#56443F]">
              Solicitação de troca enviada!
            </h2>

            <p className="text-xs text-[#A28776] leading-relaxed">
              Sua solicitação foi registrada e está aguardando análise da
              nossa equipe.
            </p>
          </div>

          <div className="bg-[#FAF9F5] rounded-xl p-4 border border-[#E4C7B7]/30">
            <p className="text-[9px] uppercase font-bold text-[#8B645A]">
              Status da solicitação
            </p>

            <p className="mt-2 text-sm font-bold text-[#56443F]">
              Em troca
            </p>
          </div>

          <button
            onClick={() => {
              setRequestSent(false);
              setSelectedOrder(null);
              setSelectedItems([]);
              setReasons({});
              setStep(1);
            }}
            className="w-full bg-[#56443F] hover:bg-[#8B645A] text-white py-3 rounded-lg text-xs font-bold uppercase transition-colors"
          >
            Voltar para meus pedidos
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto px-6 py-16">

      {/* Cabeçalho */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs font-bold tracking-widest text-[#8B645A] uppercase">
          Suporte
        </span>

        <h2 className="font-serif text-3xl font-semibold text-[#56443F]">
          Trocas & Devoluções
        </h2>

        <p className="text-xs text-[#A28776] font-semibold">
          Solicite a troca ou devolução de produtos.
          </p>
      </div>

      {/* Indicador de etapas */}
      <div className="flex justify-center items-center gap-3 text-[10px] font-bold mb-8">

        <span
          className={`px-3 py-1.5 rounded-full ${
            step === 1
              ? "bg-[#56443F] text-white"
              : "bg-[#E4C7B7]/20 text-[#56443F]"
          }`}
        >
          1. Pedido
        </span>

        <span
          className={`px-3 py-1.5 rounded-full ${
            step === 2
              ? "bg-[#56443F] text-white"
              : "bg-[#E4C7B7]/20 text-[#56443F]"
          }`}
        >
          2. Itens
        </span>

      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E4C7B7]/30">

        {/* ETAPA 1 */}
        {step === 1 && (
          <div className="space-y-5">

            <div>
              <h3 className="font-serif text-xl font-bold text-[#56443F]">
                Selecione o pedido
              </h3>

              <p className="text-xs text-[#A28776] mt-1">
                Escolha um pedido entregue para solicitar uma troca.
              </p>
            </div>

            <div className="space-y-3">

            {ordersMock
  .filter((order) => order.status === "delivered")
  .map((order) => (
    <button
      key={order.id}
      onClick={() => handleSelectOrder(order)}
      className="w-full text-left bg-white border border-[#E4C7B7]/30 hover:border-[#8B645A] rounded-xl p-5 transition-all hover:shadow-sm"
    >
      <div className="flex items-center justify-between gap-6">

        <div className="flex-1">

          {/* Código */}
          <div className="flex items-center gap-3">
            <h3 className="font-serif text-base font-bold text-[#56443F]">
              {order.order_number}
            </h3>

            <span className="text-[9px] uppercase font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full">
              Entregue
            </span>
          </div>

          {/* Informações */}
          <div className="flex flex-wrap items-center gap-6 mt-4">

            <div>
              <p className="text-[9px] uppercase tracking-wide font-bold text-[#A28776]">
                Data da compra
              </p>

              <p className="text-xs font-semibold text-[#56443F] mt-1">
                {new Date(order.created_at).toLocaleDateString("pt-BR")}
              </p>
            </div>

            <div className="h-7 w-px bg-[#E4C7B7]/30" />

            <div>
              <p className="text-[9px] uppercase tracking-wide font-bold text-[#A28776]">
                Produtos
              </p>

              <p className="text-xs font-semibold text-[#56443F] mt-1">
                {order.items.length}{" "}
                {order.items.length === 1 ? "item" : "itens"}
              </p>
            </div>

            <div className="h-7 w-px bg-[#E4C7B7]/30" />

            <div>
              <p className="text-[9px] uppercase tracking-wide font-bold text-[#A28776]">
                Total
              </p>

              <p className="text-sm font-bold text-[#8B645A] mt-1">
                R$ {Number(order.total).toFixed(2).replace(".", ",")}
              </p>
            </div>

          </div>

        </div>

        <div className="w-8 h-8 rounded-full bg-[#FAF9F5] flex items-center justify-center flex-shrink-0">
          <ArrowRight
            size={15}
            className="text-[#8B645A]"
          />
        </div>

      </div>
    </button>
  ))}

            </div>

          </div>
        )}

        {/* ETAPA 2 */}
        {step === 2 && selectedOrder && (
          <div className="space-y-6">

            <div className="flex items-center gap-3">

              <button
                onClick={() => setStep(1)}
                className="text-[#8B645A]"
              >
                <ChevronLeft size={18} />
              </button>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#56443F]">
                  Itens para troca
                </h3>

                <p className="text-xs text-[#A28776] mt-1">
                  Pedido {selectedOrder.order_number}
                </p>
              </div>

            </div>

            <div className="space-y-4">

              {selectedOrder.items.map((item) => (
                <div
                  key={item.id}
                  className={`border rounded-xl p-4 transition-colors ${
                    selectedItems.includes(item.id)
                      ? "border-[#8B645A] bg-[#E4C7B7]/10"
                      : "border-[#E4C7B7]/30"
                  }`}
                >

                  <label className="flex gap-3 cursor-pointer">

                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="mt-1 w-4 h-4"
                    />

                    <div className="flex-1">

                      <div className="flex justify-between gap-3">

                        <div>
                          <p className="text-xs font-bold text-[#56443F]">
                            {item.product_name}
                          </p>

                          <p className="text-[10px] text-[#A28776] mt-1">
                            {item.volume} • Quantidade: {item.quantity}
                          </p>
                        </div>

                        <span className="text-xs font-bold text-[#8B645A]">
                          R$ {item.unit_price.toFixed(2).replace(".", ",")}
                        </span>

                      </div>

                    </div>

                  </label>

                  {selectedItems.includes(item.id) && (
                    <div className="mt-4 ml-7">

                      <label className="text-[9px] uppercase font-bold text-[#8B645A]">
                        Motivo da troca
                      </label>

                      <select
                        value={reasons[item.id] || ""}
                        onChange={(e) =>
                          handleReasonChange(
                            item.id,
                            e.target.value
                          )
                        }
                        className="w-full mt-1 bg-white border border-[#E4C7B7]/40 rounded-lg p-3 text-xs text-[#56443F]"
                      >
                        <option value="">
                          Selecione um motivo
                        </option>

                        <option value="Produto danificado">
                          Produto danificado
                        </option>

                        <option value="Produto incorreto">
                          Produto incorreto
                        </option>

                        <option value="Arrependimento da compra">
                          Arrependimento da compra
                        </option>

                        <option value="Outro">
                          Outro
                        </option>
                      </select>

                    </div>
                  )}

                </div>
              ))}

            </div>


            <div className="flex gap-3">

              <button
                onClick={() => setStep(1)}
                className="w-1/2 py-3 bg-white text-[#56443F] border border-[#E4C7B7] rounded-lg text-xs font-bold uppercase"
              >
                Voltar
              </button>

              <button
                onClick={handleSubmit}
                disabled={selectedItems.length === 0}
                className={`w-1/2 py-3 rounded-lg text-xs font-bold uppercase ${
                  selectedItems.length === 0
                    ? "bg-[#E4C7B7]/40 text-[#A28776] cursor-not-allowed"
                    : "bg-[#56443F] hover:bg-[#8B645A] text-white"
                }`}
              >
                Solicitar troca
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}